import router from '@ohos.router';
import http from '@ohos.net.http';
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import { GoodsListItemType } from '../viewmodel/InitialData';

// 明确定义页面跳转参数类型，避免使用对象字面量作为类型
export interface CustomerServicePageParams {
  goods?: GoodsListItemType;
}

// 如果商品数据中包含电池字段，使用继承的接口表示可选字段
export interface ProductWithBattery extends GoodsListItemType {
  battery?: string | number;
  batteryCapacity?: string | number;
}

// DeepSeek 请求/响应相关显式类型（与 AIChatPage 保持一致）
interface DeepSeekMessage {
  role: string;
  content: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature: number;
  max_tokens: number;
}

interface DeepSeekChoiceMessage {
  content?: string;
}

interface DeepSeekChoice {
  message?: DeepSeekChoiceMessage;
}

interface DeepSeekResponse {
  choices?: DeepSeekChoice[];
}

interface HttpRequestOptions {
  method: http.RequestMethod;
  header: Record<string, string>;
  extraData: string;
  connectTimeout: number;
  readTimeout: number;
}

interface HttpResponseLike {
  result?: string;
  body?: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

@Entry
@Component
export default struct CustomerServicePage {
  @State private messages: ChatMessage[] = [
    { sender: 'ai', text: '您好，我是智能客服，有什么可以帮您？' }
  ];
  @State private inputText: string = '';
  @State private product: GoodsListItemType | null = null;
  @State private chatHistory: ChatHistoryItem[] = [];

  private scroller: Scroller = new Scroller();

  // DeepSeek 配置（与 `AIChatPage.ets` 保持一致）：必须配置有效的 API KEY，若未配置或调用失败将返回服务不可用提示（无本地回退）
  private readonly DEEPSEEK_API_KEY: string = 'sk-0d4c8b12e11143b78fd5a008b8dcae00';
  private readonly DEEPSEEK_URL: string = 'https://api.deepseek.com/v1/chat/completions';

  private async pushUserMessage(): Promise<void> {
    const text = (this.inputText || '').trim();
    if (!text) return;
    try {
      // 推入用户消息
      this.messages = [...this.messages, { sender: 'user', text }];
      this.chatHistory = [...this.chatHistory, { role: 'user', content: text }];
      this.inputText = '';

      // 推入占位 AI 回复以提示正在处理
      this.messages = [...this.messages, { sender: 'ai', text: '正在为您回复，请稍候...' }];

      // 通过 DeepSeek 获取回复（本页面不提供本地回退，确保与 AIChatPage 的 API 配置一致）
      try {
        const replyText = await this.fetchDeepSeekReply(this.product, text);
        // 替换占位为正式回复
        const msgs = [...this.messages];
        if (msgs.length > 0 && msgs[msgs.length - 1].sender === 'ai' && msgs[msgs.length - 1].text === '正在为您回复，请稍候...') {
          msgs[msgs.length - 1] = { sender: 'ai', text: replyText };
        } else {
          msgs.push({ sender: 'ai', text: replyText });
        }
        this.messages = msgs;
        this.chatHistory = [...this.chatHistory, { role: 'assistant', content: replyText }];
      } catch (apiErr) {
        console.error('DeepSeek 调用失败（无回退）：', String(apiErr));
        const msgs = [...this.messages];
        const failText = '亲～抱歉，当前客服服务暂不可用，请稍后重试哒～';
        if (msgs.length > 0 && msgs[msgs.length - 1].sender === 'ai' && msgs[msgs.length - 1].text === '正在为您回复，请稍候...') {
          msgs[msgs.length - 1] = { sender: 'ai', text: failText };
        } else {
          msgs.push({ sender: 'ai', text: failText });
        }
        this.messages = msgs;
        this.chatHistory = [...this.chatHistory, { role: 'assistant', content: failText }];
      }
    } catch (e) {
      console.error('发送消息失败:', String(e));
    }
  }

  // 调用 DeepSeek 获取客服风格的回复（期望返回一段自然语言文本）
  private async fetchDeepSeekReply(product: GoodsListItemType | null, userText: string): Promise<string> {
    const httpRequest = http.createHttp();
    try {
      const prodName = product ? String(product.title) : '该商品';
        const systemPrompt = `你现在是专业电商平台商品咨询客服，需严格遵循以下要求：\n口头禅固定：开头必说 “亲～”，句中穿插 “呀”“呢”“哦”，结尾带 “哒”“哟”“呀”（如 “这就为你解答哒～”“有其他疑问随时问哟！”）；\n用户会传入「商品信息 + 具体咨询问题」（如商品参数、使用方法、材质、适配场景等），你需先精准提取商品关键信息（名称、规格、型号等），再针对问题给出准确、易懂的回答；\n回应逻辑：热情开场→复述商品 + 明确问题→用口语化语言答疑（避免专业术语，复杂内容分点说更清晰）→主动追问是否有其他需求；\n答疑原则：\n参数类问题（如尺寸、重量、配置）：直接给出准确答案，必要时补充实用提示；\n使用类问题（如怎么用、适配什么）：步骤清晰、简单易懂，避免冗长；\n对比类问题（如和 XX 款区别）：突出核心差异，帮用户快速 get 重点；\n不确定的信息：不瞎编！回应 “亲～你咨询的这个细节小女子帮你核实一下哟，10 分钟内给你准确答复哒～可以先说说其他想了解的吗？”；\n语气亲切、耐心，像和朋友聊天一样，不让用户觉得生硬。\n示例输入（商品信息 + 问题）：“华为 Mate 60 Pro（12+512G，黑色），请问这款手机支持 5G 吗？电池容量是多少呀？”示例回应:"亲～你问的是华为 Mate 60 Pro（12+512G，黑色）的 5G 支持和电池容量对吧？这就为你解答哒～这款手机是支持 5G 网络的哟，日常上网、看视频都超流畅呢！电池容量是 5000mAh，正常使用一天下来完全没问题，重度使用也能坚持大半天哦～还有其他想了解的吗？比如充电速度、相机配置这些，随时问我呀！"\n回复必须完整不截断；如内容较多请分点列出并控制在 180 字以内，确保一句话不要戛然而止。\n用户传入商品信息 + 咨询问题后，直接生成符合要求的客服回复，无需额外说明！\n同时从哪一个商品详情页点进去，就要附上该商品的信息`;
      const p = product as ProductWithBattery | null;
      const productInfo = p ? JSON.stringify({ id: p.id, title: p.title, price: p.price, searchIndex: p.searchIndex, description: p.description, specifications: p.specifications || [], battery: p.battery ?? p.batteryCapacity }) : '无商品信息';

      const messages: DeepSeekMessage[] = [{ role: 'system', content: systemPrompt }];

      // 仅带入最近 6 条历史对话，避免超长导致被截断
      const historyForContext = this.chatHistory.slice(-6);
      historyForContext.forEach((h: ChatHistoryItem) => {
        messages.push({ role: h.role, content: h.content });
      });

      // 当前用户问题
      messages.push({ role: 'user', content: `商品信息: ${productInfo}\n用户问题: ${userText}` });

      // 提高回复长度上限，避免长答案被截断
      const bodyObj: DeepSeekRequest = { model: 'deepseek-chat', messages: messages, temperature: 0.2, max_tokens: 3000 };
      const body = JSON.stringify(bodyObj);
      const headerObj: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.DEEPSEEK_API_KEY}`
      };

      const requestOptions: HttpRequestOptions = {
        method: http.RequestMethod.POST,
        header: headerObj,
        extraData: body,
        connectTimeout: 10000,
        readTimeout: 10000
      };

      const response = await httpRequest.request(this.DEEPSEEK_URL, requestOptions);
      // DeepSeek 返回结构通常包含 choices[0].message.content
      try {
        const respObj = response as HttpResponseLike;
        const respText = respObj.result || respObj.body || JSON.stringify(response);
        const parsed = typeof respText === 'string' ? (JSON.parse(respText) as DeepSeekResponse) : (respText as DeepSeekResponse);
        const content = parsed?.choices?.[0]?.message?.content;
        if (content) {
          if (typeof content === 'string') return content;
          return String(content);
        }
      } catch (e) {
        console.warn('解析 DeepSeek 响应失败，使用回退文本', String(e));
      }
    } catch (err) {
      console.error('DeepSeek API 调用异常：', String(err));
      throw new Error(String(err));
    } finally {
      httpRequest.destroy();
    }

    // 出现异常或未解析到内容时，抛出以便上层回退
    throw new Error('DeepSeek 未返回有效内容');
  }

  aboutToAppear() {
    try {
      const params = router.getParams() as CustomerServicePageParams | null;
      if (params && params.goods) {
        this.product = params.goods as GoodsListItemType;
      }
    } catch (e) {
      console.error('读取跳转参数失败:', String(e));
    }
  }

  // 生成基于 prompt 的客服回复（保守策略：不凭空编造）
  private generateReply(product: GoodsListItemType | null, userText: string): string {
    const prodName = product ? String(product.title) : '该商品';
    // 口头禅与格式
    const opening = `亲～你问的是${prodName}的${userText.replace(/\s+/g, '')}对吧？这就为你解答哒～`;

    // 简单关键词判断
    const txt = userText.toLowerCase();
    const parts: string[] = [];

    // 参数类：尝试从 product 中取值
    if (/电池|电池容量|mAh/.test(txt)) {
      // 尝试从 product 中寻找相关字段（如果数据结构中存在 battery/batteryCapacity）
      const p = product as ProductWithBattery | null;
      const battery = p ? (p.battery ?? p.batteryCapacity) : undefined;
      if (battery) {
        parts.push(`这款${prodName}的电池容量是 ${String(battery)}，正常使用大概率能满足一整天的需求哟～`);
      } else {
        return `${opening}亲～你咨询的这个细节小女子帮你核实一下哟，10 分钟内给你准确答复哒～可以先说说其他想了解的吗？`;
      }
    }

    // 网络/5G 支持
    if (/5g/.test(txt) || /5 G/.test(userText) || /支持5g/.test(userText)) {
      const searchIndex = product ? String(product.searchIndex || '') : '';
      if (searchIndex.match(/5g/i) || String(prodName).match(/5g/i)) {
        parts.push('这款是支持 5G 网络的哟，日常上网、看视频都很流畅呢～');
      } else {
        parts.push('关于 5G 支持，亲～我这边没有确切字段显示，先为你核实一下哟，确认后再回复你哒～');
      }
    }

    // 使用类问题
    if (/怎么用|使用|如何使用|如何安装/.test(txt)) {
      parts.push('使用方法简单：1）先按说明书安装或取出商品；2）按开关/按键启动；3）根据场景选择模式即可；如需更详细的步骤可以把具体场景告诉我，我再分步说明哟～');
    }

    // 对比类（包含“和”字）
    if (/和.+区别|比.+哪个好|vs/.test(userText)) {
      // 无法凭空比较具体型号，询问对方型号
      parts.push('若要给出准确对比，亲～请再告诉我你想对比的另一个型号或商品名称哟，这样我能帮你抓住核心差异并快速定位重点哒～');
    }

    // 如果没有任何 parts，则采取保守回复（核实）
    if (parts.length === 0) {
      return `${opening}亲～你咨询的这个细节小女子帮你核实一下哟，10 分钟内给你准确答复哒～可以先说说其他想了解的吗？`;
    }

    // 合并回答并加上主动追问
    const body = parts.join('\n');
    const follow = '还有其他想了解的吗？比如充电速度、相机配置这些，随时问我呀！';
    return `${opening}${body} ${follow}`;
  }

  build() {
    Column() {
      // 顶部导航（与商品详情一致样式，标题为 AI客服）
      Row() {
        Navigation() {
          Column() {
            Row() {
              Image($r('sys.symbol.chevron_left'))
                .width(24)
                .height(24)
                .fillColor(Color.Black)
                .onClick(() => { router.back(); })

              Blank()

              Image($r('sys.symbol.ellipsis_circle'))
                .width(24)
                .height(24)
                .fillColor(Color.Black)
            }
            .width('100%')
            .height(56)
            .padding({ left: 16, right: 16 })
          }
          .width(LAYOUT_WIDTH_OR_HEIGHT)
          .justifyContent(FlexAlign.Center)
        }
        .size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT })
        .title('AI客服')
        .titleMode(NavigationTitleMode.Mini)
      }
      .height(56)
      .backgroundColor(Color.White)

      // 聊天列表
      Scroll(this.scroller) {
        Column({ space: 8 }) {
          ForEach(this.messages, (msg: ChatMessage, idx?: number) => {
            Row() {
              if (msg.sender === 'ai') {
                // AI 在左：头像 + 气泡
                Image($r('app.media.robottouxiang'))
                  .width(36)
                  .height(36)
                  .borderRadius(18)
                  .margin({ left: 12 })
                  .alignSelf(ItemAlign.Start)

                Column() {
                  Text(msg.text)
                    .fontSize(14)
                    .fontColor($r('app.color.deepGray'))
                    .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                    .backgroundColor('#F0F0F0')
                    .borderRadius(8)
                    .maxLines(10)
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 8 })
                .width('70%')

                Blank()
              } else {
                Blank()

                Column() {
                  Text(msg.text)
                    .fontSize(14)
                    .fontColor(Color.White)
                    .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                    .backgroundColor('#FF6600')
                    .borderRadius(8)
                    .maxLines(10)
                }
                .alignItems(HorizontalAlign.End)
                .margin({ right: 8 })
                .width('70%')

                Image($r('app.media.usertouxiang'))
                  .width(36)
                  .height(36)
                  .borderRadius(18)
                  .margin({ right: 12 })
                  .alignSelf(ItemAlign.Start)
              }
            }
            .width(LAYOUT_WIDTH_OR_HEIGHT)
            .alignItems(VerticalAlign.Top)
          })
        }
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .padding({ top: 12, bottom: 12 })
      }
      .layoutWeight(1)

      // 输入栏
      Row() {
        Search({ value: this.inputText, placeholder: '请在此输入您的问题' })
          .layoutWeight(1)
          .height(48)
          .onChange((v: string) => { this.inputText = v; })
          .border({ width: 1, color: $r('app.color.divider') })
          .backgroundColor(Color.White)

        Button('发送')
          .fontSize(14)
          .fontColor(Color.White)
          .backgroundColor('#FF6600')
          .borderRadius(18)
          .padding({ left: 12, right: 12 })
          .onClick(() => { this.pushUserMessage(); })
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .height(56)
      .padding({ left: 12, right: 12, bottom: 12 })
      .backgroundColor(Color.White)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .height('100%')
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
