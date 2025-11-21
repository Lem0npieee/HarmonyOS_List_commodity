/*
 * AI 对话式商品搜索页面
 * 功能：接受用户自然语言查询，调用 DeepSeek API 将查询解析为结构化筛选条件，
 *       在 AI 回复气泡下展示匹配商品的卡片并支持跳转到详情页。
 */
import router from '@ohos.router';
import http from '@ohos.net.http';
// Note: do not import '@ohos.ace.ets' here; decorators are available globally in ETS pages
import { goodsPool, GoodsListItemType, CategoryType } from '../viewmodel/InitialData';
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from '../common/CommonConstants';
import * as commonConst from '../common/CommonConstants';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  items?: GoodsListItemType[];
}

interface ChatHistoryItem {
  role: string;
  content: string;
}

interface Attributes {
  brand?: string;
  freeShipping?: boolean;
}

interface FilterCondition {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  attributes?: Attributes;
}

interface DeepSeekMessage {
  role: string;
  content: string;
}

interface HttpResponseLike {
  result?: string;
  body?: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature: number;
}

interface DeepSeekMessageContent {
  content?: string;
}

interface DeepSeekChoice {
  message?: DeepSeekMessageContent;
}

interface DeepSeekResponse {
  choices?: DeepSeekChoice[];
}

interface DeepSeekResult {
  reply: string;
  items: number[];
}

interface HttpRequestOptions {
  method: http.RequestMethod;
  header: Record<string, string>;
  extraData: string;
  connectTimeout: number;
  readTimeout: number;
}

@Entry
@Component
export default struct AIChatPage {
  @State private messages: ChatMessage[] = [];
  @State private inputText: string = '';
  @State private chatHistory: ChatHistoryItem[] = [];

  private readonly DEEPSEEK_API_KEY: string = 'sk-0d4c8b12e11143b78fd5a008b8dcae00';
  private readonly DEEPSEEK_URL: string = 'https://api.deepseek.com/v1/chat/completions';

  aboutToAppear() {
    try {
      const params = router.getParams() as Record<string, string> | null;
      if (params && typeof params === 'object' && params['query']) {
        const q = String(params['query']);
        // 预填充输入并自动发送一次搜索
        this.inputText = q;
        // 延迟触发，确保页面渲染后再发送
        setTimeout(() => {
          this.handleSend().catch((err: Error | string) => console.error('自动发送失败:', String(err)));
        }, 300);
      }
    } catch (err) {
      console.error('读取跳转参数失败:', String(err));
    }
  }

  build() {
    Column() {
      // 顶部导航（固定，不随消息滚动）
      Row() {
        Navigation() {
          Column() {
            Row() {
              Text('AI 对话搜索')
                .fontSize(18)
                .fontWeight(FontWeight.Medium)
                .fontColor($r('app.color.deepGray'))
            }
            .height(56)
            .alignItems(VerticalAlign.Center)
            .padding({ left: 16 })
          }
          .width(LAYOUT_WIDTH_OR_HEIGHT)
          .justifyContent(FlexAlign.Center)
        }
        .size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: 56 })
        .title(STORE)
        .titleMode(NavigationTitleMode.Mini)
      }
      .height(56)
      .backgroundColor(Color.White)

      // 可滚动的消息区域，占据中间可伸缩空间
      Scroll() {
        Column() {
          // 聊天消息
          Column() {
            ForEach(this.messages, (msg: ChatMessage, idx?: number) => {
              Column() {
                if (msg.role === 'user') {
                  Row() {
                    Blank()
                    Text(msg.content)
                      .backgroundColor($r('app.color.softAccent'))
                      .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                      .borderRadius(12)
                      .fontColor($r('app.color.deepGray'))
                      .maxLines(10)
                  }
                  .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
                  .justifyContent(FlexAlign.End)
                  .margin({ top: 8, bottom: 8, left: 12, right: 12 })
                } else {
                  // AI 气泡 + 下方商品块
                  Row() {
                    Text(msg.content)
                      .backgroundColor(Color.White)
                      .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                      .borderRadius(12)
                      .fontColor($r('app.color.deepGray'))
                      .maxLines(10)
                    Blank()
                  }
                  .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
                  .justifyContent(FlexAlign.Start)
                  .margin({ top: 8, bottom: 8, left: 12, right: 12 })

                  // 若有商品，则渲染商品卡片网格
                  if (msg.items && msg.items.length > 0) {
                    Grid() {
                      ForEach(msg.items, (item: GoodsListItemType) => {
                        GridItem() {
                          Column() {
                            Image(item.cover)
                              .width('100%')
                              .aspectRatio(1)
                              .borderRadius(8)
                            Text(item.title)
                              .fontSize(commonConst.NORMAL_FONT_SIZE)
                              .fontColor($r('app.color.deepGray'))
                              .maxLines(2)
                              .textOverflow({ overflow: TextOverflow.Ellipsis })
                              .margin({ top: 6 })
                            Text('¥' + item.price.toFixed(2))
                              .fontSize(commonConst.BIGGER_FONT_SIZE)
                              .fontColor($r('app.color.freshRed'))
                              .fontWeight(FontWeight.Medium)
                              .margin({ top: 4 })
                          }
                          .padding(8)
                          .backgroundColor(Color.White)
                          .borderRadius(8)
                          .onClick(() => {
                            router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: item } }).catch((err: Error) => {
                              console.error('跳转失败:', err.message);
                            });
                          })
                        }
                      }, (it: GoodsListItemType) => `${it.id}`)
                    }
                    .columnsTemplate('1fr 1fr')
                    .columnsGap(12)
                    .rowsGap(12)
                    .margin({ left: 12, right: 12, bottom: 12 })
                  }
                }
              }
            })
          }
        }
      }
      .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
      .layoutWeight(1)
      .padding({ bottom: 12 }) // 给底部输入栏留出间距
      .scrollBar(BarState.Off)
      

      // 底部输入栏（始终位于页面底部）
      Row() {
        Search({ value: this.inputText, placeholder: $r('app.string.search_placeholder') })
          .layoutWeight(1)
          .height(48)
          .onChange((v: string) => { this.inputText = v; })
          .border({ width: 1, color: $r('app.color.divider') })
          .backgroundColor(Color.White)

        Button('发送')
          .margin({ left: 8 })
          .height(48)
          .padding({ left: 12, right: 12 })
          .onClick(async () => {
            await this.handleSend();
          })
      }
      .backgroundColor(Color.White)
      .padding({ left: 12, right: 12, top: 8, bottom: 12 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.primaryBgColor'))
  }

  // 发送逻辑：推送用户消息，调用 DeepSeek 解析为结构化筛选条件，筛选商品并显示 AI 回复和商品
  private async handleSend(): Promise<void> {
    const text = this.inputText.trim();
    if (text.length === 0) {
      return;
    }
    // 自杀/危险物品关键词检测：若包含相关词，跳转到关怀页面并终止后续流程
    const dangerKeywords = ['安眠药', '安乐死', '自杀', '自残', '服药', '上吊', '割腕'];
    for (let k of dangerKeywords) {
      if (text.indexOf(k) >= 0) {
        try {
          // 清空输入
          this.inputText = '';
          // 导航到关怀页
          await router.pushUrl({ url: 'pages/CarePage' });
        } catch (navErr) {
          console.error('导航到关怀页失败:', String(navErr));
        }
        return;
      }
    }
    // 推入用户消息
    this.messages = this.messages.concat([{ role: 'user', content: text }]);
    this.chatHistory.push({ role: 'user', content: text });
    this.inputText = '';

    // 显示 AI 正在回复占位消息
    this.messages = this.messages.concat([{ role: 'ai', content: '正在为您检索商品，请稍候...' }]);

    // 调用 DeepSeek（或本地解析）获得筛选条件
    const result = await this.parseUserQueryByDeepSeek(text);
    console.info('AIChat: parsed result:', JSON.stringify(result));

    // 根据 items 查找商品
    const matched = result.items.map(id => goodsPool.find(g => g.id === id)).filter(g => g !== undefined) as GoodsListItemType[];
    console.info('AIChat: matched items count:', matched.length);
    matched.forEach((item, idx) => {
      console.info(`AIChat: matched item ${idx}: title=${String(item.title)}, category=${item.category}, searchIndex=${item.searchIndex}`);
    });

    // 更新最后一条 AI 消息为结果并附带商品
    // 用 DeepSeek 的 reply
    const replyText = result.reply;
    // 移除占位并添加回复
    this.messages.pop();
    this.chatHistory.push({ role: 'assistant', content: replyText });
    this.messages = this.messages.concat([{ role: 'ai', content: replyText, items: matched.slice(0, 6) }]);
  }

  // DeepSeek 调用封装：尝试调用远程 API，失败时回退到本地简单解析
  private async parseUserQueryByDeepSeek(query: string): Promise<DeepSeekResult> {
    const httpRequest = http.createHttp();
    try {
      // 构建商品列表字符串
      const goodsListStr = goodsPool.map(g => `{id:${g.id}, title:'${String(g.title)}', description:'${String(g.description)}', evaluate:'${String(g.evaluate)}', price:${g.price}, category:'${g.category}', subCategory:'${g.subCategory}', keyword:'${g.keyword}', searchIndex:'${g.searchIndex}', isNew:${g.isNew}, isHot:${g.isHot}, isFreeShipping:${g.isFreeShipping}, hasCoupon:${g.hasCoupon}, originalPrice:${g.originalPrice || 'N/A'}, salesCount:${g.salesCount || 0}, rating:${g.rating || 0}, ratingCount:${g.ratingCount || 0}, shopName:'${g.shopName || ''}', specifications:${JSON.stringify(g.specifications || [])}, deliveryInfo:'${g.deliveryInfo || ''}'}`).join('\n');

      const messagesArr: DeepSeekMessage[] = [
          { role: 'system', content: `你是一个专业的电商商品匹配助手，负责根据用户的自然语言查询，从给定的商品列表中精准筛选匹配的商品，并按固定格式返回JSON结果。请严格遵守以下规则执行任务：

    ### 核心规则
    1. **商品字段理解**：你需要基于商品列表中的所有字段进行匹配，字段定义如下：
      - id：商品唯一数字编号（核心标识，输出结果的items数组必须返回该数字ID）；
      - cover/ detailImages：商品图片资源（无需匹配，仅作参考）；
      - title：商品名称（多语言资源标识，如$r('app.string.goods_milk_tea')代表“奶茶”类商品，需解析为实际商品名称）；
      - description：商品广告语/详情描述；
      - evaluate：用户评价摘要；
      - price：商品实际售价（数字，单位：元）；
      - category：商品主分类（枚举值：CategoryType.Featured/Hot/New等）；
      - subCategory：商品子分类（如limited/normal等）；
      - keyword：商品核心关键词（英文/中文组合，如'milk tea limited selected'）；
      - searchIndex：商品搜索索引（包含商品名称、属性、品类的组合文本，如'香港风味丝袖奶茶 奶茶 香港 丝袖 饮料'）；
      - isNew/isHot：是否新品/爆款（布尔值）；
      - isFreeShipping：是否包邮（布尔值）；
      - hasCoupon：是否有优惠券（布尔值）；
      - originalPrice：商品原价（数字）；
      - salesCount：销量（数字）；
      - rating：评分（数字，1-5分）；
      - ratingCount：评价数（数字）；
      - shopName：店铺名称；
      - specifications：商品规格（数组，如['原味', '少糖', '无糖']）；
      - deliveryInfo：配送/售后信息（如'支持7天无理由退换'）。

    2. **匹配优先级规则**：按以下优先级筛选商品，优先级高的字段匹配结果优先：
      ① searchIndex（搜索索引，包含最全面的商品信息，优先匹配）；
      ② title（商品名称）+ keyword（核心关键词）；
      ③ category/subCategory（商品分类）；
      ④ price/originalPrice（价格区间）；
      ⑤ isHot/isNew/isFreeShipping（属性标签）；
      ⑥ specifications（规格）、shopName（店铺)、deliveryInfo（售后）等其他属性。

    3. **用户查询解析规则**：
      - 解析用户查询中的**核心需求**：如商品名称（奶茶/饮料）、分类（爆款/限量）、价格区间（200元以上）、属性（包邮/无糖）、店铺（港式饮品）等；
      - **价格区间解析**：严格识别价格范围，如“800到820之间”解析为priceMin=800, priceMax=820，仅匹配price在此区间内的商品；“200元以上”解析为priceMin=200；“低于500”解析为priceMax=500；必须精确匹配，不得超出范围；
      - 处理**口语化/模糊表述**：如“包邮的奶茶”匹配isFreeShipping=true且searchIndex含“奶茶”的商品；“爆款饮料”匹配isHot=true且searchIndex含“饮料”的商品；“200多的饮品”匹配price在200-300之间且品类为饮品的商品；
      - 忽略无意义表述：如“帮我找”“推荐一下”“谢谢”等口语化冗余内容，仅提取核心查询信息。

    4. **输出格式强制要求（必须严格遵守）**：
      - 必须返回**纯JSON对象**，无任何前置、后置文本，无注释、换行符、空格冗余；
      - JSON仅包含两个字段，字段名不可修改：
        ✅ reply：自然语言回复，需友好说明匹配结果（如“为你找到2款符合要求的港式奶茶，均为包邮爆款～”“未找到匹配的商品哦，你可以尝试调整关键词”）；
        ✅ items：匹配商品的**数字ID数组**，仅包含纯数字编号，无其他字符；若无匹配商品，返回空数组[]；
      - 禁止输出JSON以外的任何内容，包括解释、说明、标点符号、换行等。

    5. **无匹配处理规则**：若没有任何商品符合用户查询条件，reply需提示“未找到匹配的商品，你可以尝试调整关键词或筛选条件”，items返回空数组[]。

    6. **敏感/违法商品处理规则（必须严格执行）**：
      - 若用户查询涉及色情、未成年人相关性内容、强烈暴力或血腥、枪支与弹药、爆炸物、毒品/合成药物、恐怖主义相关、或其他明显违法/有害的商品或行为（包括搜索如何制造/购买/规避法律的请求），请立即并**始终**按下述方式处理：
        1) 无论系统是否能够在商品列表中找到匹配商品，**items字段必须返回空数组[]**；
        2) **reply字段必须返回一个友好但明确的警告语**，例如："抱歉，我无法提供与色情、毒品、枪支或其他违法/有害商品相关的推荐或信息。如需帮助，请避免此类关键词并遵守当地法律。"（禁止在reply中包含购买渠道、制作方法、规避建议或任何可行动的细节）；
        3) 禁止返回任何与该敏感主题相关的商品ID、链接、描述或操作性建议；
      - 请将上述敏感类别视为优先级最高的规则，覆盖前面所有匹配逻辑。

    ### 商品列表匹配补充说明
    - 商品列表中的\`$r('app.string.xxx')\`为多语言资源标识，需解析为实际语义：如$r('app.string.goods_milk_tea')解析为“香港风味丝袖奶茶”，$r('app.string.advertising_language')解析为商品广告语，$r('app.string.evaluate')解析为用户评价；
    - 商品的\`searchIndex\`是最核心的匹配依据，需优先从该字段中匹配用户查询的关键词；
    - 无论商品列表中有多少条商品，仅返回匹配商品的**数字ID**到items数组中，禁止返回ID以外的任何标识。

    以下是商品列表：
    ${goodsListStr}` },
        { role: 'user', content: query }
      ];

      const bodyObj: DeepSeekRequest = {
        model: 'deepseek-chat',
        messages: messagesArr,
        temperature: 0.2
      };
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

      console.info('DeepSeek: sending request to', this.DEEPSEEK_URL);
      console.info('DeepSeek: requestOptions:', JSON.stringify({ method: requestOptions.method, header: requestOptions.header }));
      const response = await httpRequest.request(this.DEEPSEEK_URL, requestOptions);
      try {
        const respObj = response as HttpResponseLike;
        console.info('DeepSeek: raw response object:', JSON.stringify(respObj));
        const respTextForLog = respObj.result || respObj.body || JSON.stringify(response);
        console.info('DeepSeek: respText used for parsing:', respTextForLog);
      } catch (logErr) {
        console.info('DeepSeek: raw response received (toString):', String(response));
      }

      // 解析返回 (DeepSeek 返回结构通常包含 choices[0].message.content)
      try {
        const respObj = response as HttpResponseLike;
        const respText = respObj.result || respObj.body || JSON.stringify(response);
        const result = typeof respText === 'string' ? (JSON.parse(respText) as DeepSeekResponse) : (respText as DeepSeekResponse);
        const content = result?.choices?.[0]?.message?.content;
        if (content) {
          try {
            const parsed = JSON.parse(content) as DeepSeekResult;
            return parsed;
          } catch (e) {
            const jsonMatch = String(content).match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              return JSON.parse(jsonMatch[0]) as DeepSeekResult;
            }
          }
        }
      } catch (err) {
        console.warn('尝试解析 DeepSeek 响应为 JSON 失败，使用回退解析', String(err));
      }
    } catch (err) {
      console.error('DeepSeek API 调用异常：', String(err));
    } finally {
      httpRequest.destroy();
    }

    // 回退解析（简单关键字规则）
    return this.fallbackParseQuery(query);
  }

  // 简单回退解析器，用于在无法访问 DeepSeek 时也能提供基本功能
  private fallbackParseQuery(query: string): DeepSeekResult {
    const q = query.toLowerCase();
    let reply = '根据您的查询，我为您推荐了一些商品。';
    let items: number[] = [];
    if (q.indexOf('iphone') >= 0 || q.indexOf('苹果') >= 0) {
      items = goodsPool.filter(g => g.category === CategoryType.Phone && String(g.searchIndex).toLowerCase().includes('苹果')).map(g => g.id);
      reply = '为您找到了苹果手机相关商品。';
    }
    // 包邮
    if (q.indexOf('包邮') >= 0 || q.indexOf('免运费') >= 0) {
      items = goodsPool.filter(g => g.isFreeShipping).map(g => g.id);
      reply += ' 已筛选包邮商品。';
    }
    // 价格区间
    const maxMatch = q.match(/(?:低于|小于|不超过)\s*(\d{2,})/);
    if (maxMatch) {
      const maxPrice = parseInt(maxMatch[1], 10);
      items = goodsPool.filter(g => g.price <= maxPrice).map(g => g.id);
      reply += ` 价格不超过 ${maxPrice} 元。`;
    } else {
      const numMatch = q.match(/(\d{2,})/);
      if (numMatch && q.indexOf('价格') >= 0) {
        const maxPrice = parseInt(numMatch[1], 10);
        items = goodsPool.filter(g => g.price <= maxPrice).map(g => g.id);
        reply += ` 价格不超过 ${maxPrice} 元。`;
      }
    }
    if (items.length === 0) {
      items = goodsPool.slice(0, 6).map(g => g.id); // 默认前6个
    }
    return { reply, items };
  }

  // 根据 FilterCondition 筛选 goodsPool （保留以备不时之需）
  private filterGoodsByCondition(cond: FilterCondition): GoodsListItemType[] {
    console.info('filterGoodsByCondition called with cond:', JSON.stringify(cond));
    return goodsPool.filter((g: GoodsListItemType) => {
      console.info('checking item title:', String(g.title), 'category:', g.category, 'searchIndex:', g.searchIndex);
      // category
      if (cond.category) {
        console.info('cond.category:', cond.category);
        // 支持把简单字符串映射到 CategoryType
        if (cond.category.toLowerCase() === 'phone' || cond.category.toLowerCase().indexOf('phone') >= 0 || cond.category.toLowerCase().indexOf('手机') >= 0) {
          console.info('category matches phone');
          if (g.category !== CategoryType.Phone) {
            console.info('g.category !== Phone, filtering out');
            return false;
          }
        }
      }
      // priceMax
      if (cond.priceMax !== undefined && cond.priceMax !== null) {
        if (g.price > cond.priceMax) {
          console.info('price > max, filtering out');
          return false;
        }
      }
      // priceMin
      if (cond.priceMin !== undefined && cond.priceMin !== null) {
        if (g.price < cond.priceMin) {
          console.info('price < min, filtering out');
          return false;
        }
      }
      // freeShipping
      if (cond.attributes && cond.attributes.freeShipping !== undefined && cond.attributes.freeShipping !== null) {
        if (cond.attributes.freeShipping && !g.isFreeShipping) {
          console.info('freeShipping not match, filtering out');
          return false;
        }
      }
      // brand: 尝试匹配 title 或 searchIndex
      if (cond.attributes && cond.attributes.brand) {
        const brand = cond.attributes.brand.toLowerCase();
        const title = String(g.title).toLowerCase();
        const search = String(g.searchIndex).toLowerCase();
        console.info('brand:', brand, 'title:', title, 'search:', search);
        if (title.indexOf(brand) < 0 && search.indexOf(brand) < 0) {
          console.info('brand not found, filtering out');
          return false;
        }
      }
      console.info('item passed all filters');
      return true;
    });
  }
}
