if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AIChatPage_Params {
    messages?: ChatMessage[];
    inputText?: string;
    chatHistory?: ChatHistoryItem[];
    AI_API_KEY?: string;
    AI_API_URL?: string;
    AI_MODEL_NAME?: string;
}
import router from "@ohos:router";
import AuthStore from "@bundle:com.example.list_harmony/entry/ets/common/AuthStore";
import http from "@ohos:net.http";
import { goodsPool, CategoryType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { GoodsListItemType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
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
export default class AIChatPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__messages = new ObservedPropertyObjectPU([], this, "messages");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__chatHistory = new ObservedPropertyObjectPU([], this, "chatHistory");
        this.AI_API_KEY = 'sk-NutbXT4WhS16xUbYYn4SpQFdtej7mvzlV28btCf3TaQOldLz';
        this.AI_API_URL = 'https://www.dmxapi.cn/v1/chat/completions';
        this.AI_MODEL_NAME = 'gpt-4o-2024-05-13';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AIChatPage_Params) {
        if (params.messages !== undefined) {
            this.messages = params.messages;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.chatHistory !== undefined) {
            this.chatHistory = params.chatHistory;
        }
        if (params.AI_API_KEY !== undefined) {
            this.AI_API_KEY = params.AI_API_KEY;
        }
        if (params.AI_API_URL !== undefined) {
            this.AI_API_URL = params.AI_API_URL;
        }
        if (params.AI_MODEL_NAME !== undefined) {
            this.AI_MODEL_NAME = params.AI_MODEL_NAME;
        }
    }
    updateStateVars(params: AIChatPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__messages.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__chatHistory.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__messages.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__chatHistory.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __messages: ObservedPropertyObjectPU<ChatMessage[]>;
    get messages() {
        return this.__messages.get();
    }
    set messages(newValue: ChatMessage[]) {
        this.__messages.set(newValue);
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __chatHistory: ObservedPropertyObjectPU<ChatHistoryItem[]>;
    get chatHistory() {
        return this.__chatHistory.get();
    }
    set chatHistory(newValue: ChatHistoryItem[]) {
        this.__chatHistory.set(newValue);
    }
    private readonly AI_API_KEY: string;
    private readonly AI_API_URL: string;
    private readonly AI_MODEL_NAME: string;
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
        }
        catch (err) {
            console.error('读取跳转参数失败:', String(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航（固定，不随消息滚动）
            Row.create();
            // 顶部导航（固定，不随消息滚动）
            Row.height(56);
            // 顶部导航（固定，不随消息滚动）
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AIChatPage", isUserCreateStack: false });
            Navigation.size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: 56 });
            Navigation.title('AI搜索');
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(56);
            Row.alignItems(VerticalAlign.Center);
            Row.padding({ left: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('AI 对话搜索');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Navigation.pop();
        // 顶部导航（固定，不随消息滚动）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 可滚动的消息区域，占据中间可伸缩空间
            Scroll.create();
            // 可滚动的消息区域，占据中间可伸缩空间
            Scroll.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            // 可滚动的消息区域，占据中间可伸缩空间
            Scroll.layoutWeight(1);
            // 可滚动的消息区域，占据中间可伸缩空间
            Scroll.padding({ bottom: 12 });
            // 可滚动的消息区域，占据中间可伸缩空间
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 聊天消息
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx?: number) => {
                const msg = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (msg.role === 'user') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
                                Row.justifyContent(FlexAlign.End);
                                Row.margin({ top: 8, bottom: 8, left: 12, right: 12 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                            }, Blank);
                            Blank.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(msg.content);
                                Text.backgroundColor({ "id": 16777305, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                                Text.borderRadius(12);
                                Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                Text.maxLines(10);
                            }, Text);
                            Text.pop();
                            Row.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // AI 气泡 + 下方商品块
                                Row.create();
                                // AI 气泡 + 下方商品块
                                Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
                                // AI 气泡 + 下方商品块
                                Row.justifyContent(FlexAlign.Start);
                                // AI 气泡 + 下方商品块
                                Row.margin({ top: 8, bottom: 8, left: 12, right: 12 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(msg.content);
                                Text.backgroundColor(Color.White);
                                Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                                Text.borderRadius(12);
                                Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                Text.maxLines(10);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                            }, Blank);
                            Blank.pop();
                            // AI 气泡 + 下方商品块
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 若有商品，则渲染商品卡片网格
                                if (msg.items && msg.items.length > 0) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Grid.create();
                                            Grid.columnsTemplate('1fr 1fr');
                                            Grid.columnsGap(12);
                                            Grid.rowsGap(12);
                                            Grid.margin({ left: 12, right: 12, bottom: 12 });
                                        }, Grid);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            ForEach.create();
                                            const forEachItemGenFunction = _item => {
                                                const item = _item;
                                                {
                                                    const itemCreation2 = (elmtId, isInitialRender) => {
                                                        GridItem.create(() => { }, false);
                                                    };
                                                    const observedDeepRender = () => {
                                                        this.observeComponentCreation2(itemCreation2, GridItem);
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Column.create();
                                                            Column.padding(8);
                                                            Column.backgroundColor(Color.White);
                                                            Column.borderRadius(8);
                                                            Column.onClick(() => {
                                                                try {
                                                                    if (!AuthStore.isLoggedIn()) {
                                                                        router.pushUrl({ url: 'pages/LoginRegisterPage' }).catch((err: Error) => console.error('跳转登录失败:', err.message));
                                                                        return;
                                                                    }
                                                                    router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: item } }).catch((err: Error) => {
                                                                        console.error('跳转失败:', err.message);
                                                                    });
                                                                }
                                                                catch (err) {
                                                                    console.error('跳转商品详情失败:', String(err));
                                                                }
                                                            });
                                                        }, Column);
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Image.create(item.cover);
                                                            Image.width('100%');
                                                            Image.aspectRatio(1);
                                                            Image.borderRadius(8);
                                                        }, Image);
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Text.create(item.title);
                                                            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
                                                            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                                            Text.maxLines(2);
                                                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                                            Text.margin({ top: 6 });
                                                        }, Text);
                                                        Text.pop();
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Text.create('¥' + item.price.toFixed(2));
                                                            Text.fontSize(commonConst.BIGGER_FONT_SIZE);
                                                            Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                                            Text.fontWeight(FontWeight.Medium);
                                                            Text.margin({ top: 4 });
                                                        }, Text);
                                                        Text.pop();
                                                        Column.pop();
                                                        GridItem.pop();
                                                    };
                                                    observedDeepRender();
                                                }
                                            };
                                            this.forEachUpdateFunction(elmtId, msg.items, forEachItemGenFunction, (it: GoodsListItemType) => `${it.id}`, false, false);
                                        }, ForEach);
                                        ForEach.pop();
                                        Grid.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                    });
                                }
                            }, If);
                            If.pop();
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.messages, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 聊天消息
        Column.pop();
        Column.pop();
        // 可滚动的消息区域，占据中间可伸缩空间
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部输入栏（始终位于页面底部）
            Row.create();
            // 底部输入栏（始终位于页面底部）
            Row.backgroundColor(Color.White);
            // 底部输入栏（始终位于页面底部）
            Row.padding({ left: 12, right: 12, top: 8, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({ value: this.inputText, placeholder: { "id": 16777266, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
            Search.layoutWeight(1);
            Search.height(48);
            Search.onChange((v: string) => { this.inputText = v; });
            Search.border({ width: 1, color: { "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
            Search.backgroundColor(Color.White);
        }, Search);
        Search.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.margin({ left: 8 });
            Button.height(48);
            Button.padding({ left: 12, right: 12 });
            Button.onClick(async () => {
                await this.handleSend();
            });
        }, Button);
        Button.pop();
        // 底部输入栏（始终位于页面底部）
        Row.pop();
        Column.pop();
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
                }
                catch (navErr) {
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
        let matched = result.items.map(id => goodsPool.find(g => g.id === id)).filter(g => g !== undefined) as GoodsListItemType[];
        // 优先信任 DeepSeek 返回的 items（AI 选择）：
        // - 若 AI 返回了 items，则直接使用这些商品作为匹配结果（不再用本地价格解析去覆盖或回退），
        //   以保证 AI 基于完整商品列表的判断被保留。
        // - 若 AI 未返回任何 items，则不进行本地回退（按产品需求不要留后路），展示空结果并在界面中展示 AI 的 reply。
        if (matched.length > 0) {
            console.info('AIChat: using AI-selected items count:', matched.length);
            matched.forEach((item, idx) => {
                console.info(`AIChat: matched item ${idx}: title=${String(item.title)}, category=${item.category}, searchIndex=${item.searchIndex}`);
            });
        }
        else {
            console.info('AIChat: AI returned no items; not falling back to local search per configuration.');
        }
        // 更新最后一条 AI 消息为结果并附带商品
        // 用 DeepSeek 的 reply
        const replyText = result.reply;
        // 移除占位并添加回复
        this.messages.pop();
        this.chatHistory.push({ role: 'assistant', content: replyText });
        this.messages = this.messages.concat([{ role: 'ai', content: replyText, items: matched }]);
    }
    // DeepSeek 调用封装：尝试调用远程 API，失败时回退到本地简单解析
    private async parseUserQueryByDeepSeek(query: string): Promise<DeepSeekResult> {
        const httpRequest = http.createHttp();
        try {
            // 构建商品列表字符串
            const goodsListStr = goodsPool.map(g => `{id:${g.id}, title:'${String(g.title)}', description:'${String(g.description)}', evaluate:'${String(g.evaluate)}', price:${g.price}, category:'${g.category}', subCategory:'${g.subCategory}', keyword:'${g.keyword}', searchIndex:'${g.searchIndex}', isNew:${g.isNew}, isHot:${g.isHot}, isFreeShipping:${g.isFreeShipping}, hasCoupon:${g.hasCoupon}, originalPrice:${g.originalPrice || 'N/A'}, salesCount:${g.salesCount || 0}, rating:${g.rating || 0}, ratingCount:${g.ratingCount || 0}, shopName:'${g.shopName || ''}', specifications:${JSON.stringify(g.specifications || [])}, deliveryInfo:'${g.deliveryInfo || ''}'}`).join('\n');
            // 构建包含历史对话的消息数组
            const messagesArr: DeepSeekMessage[] = [
                { role: 'system', content: `你是一个专业的电商商品匹配助手，负责根据用户的自然语言查询，从给定的商品列表中精准筛选匹配的商品，并按固定格式返回JSON结果。请严格遵守以下规则执行任务：

    ### 核心规则
    1. **商品字段理解**：你需要基于商品列表中的所有字段进行匹配，字段定义如下：
      - id：商品唯一数字编号（核心标识，输出结果的items数组必须返回该数字ID）；
      - price：商品实际售价（数字，单位：元，唯一的价格词条）；
      - category：商品主分类（枚举值：CategoryType.Featured/Hot/New等）；
      - subCategory：商品子分类（如limited/normal等）；
      - keyword：商品核心关键词（英文/中文组合，如'milk tea limited selected'）；
      - searchIndex：商品搜索索引（包含商品名称、属性、品类的组合文本，如'香港风味丝袖奶茶 奶茶 香港 丝袖 饮料'）；
      - isNew/isHot：是否新品/爆款（布尔值）；
      - isFreeShipping：是否包邮（布尔值）；
      - hasCoupon：是否有优惠券（布尔值）；
      - salesCount：销量（数字）；
      - rating：评分（数字，1-5分）；
      - ratingCount：评价数（数字）；
      - shopName：店铺名称；
      - specifications：商品规格（数组，如['原味', '少糖', '无糖']）；

    3. **用户查询解析规则**：
      - 解析用户查询中的**核心需求**：如商品名称（奶茶/饮料）、分类（爆款/限量）、价格区间（200元以上）、属性（包邮/无糖）、店铺（港式饮品）等；
      - **价格区间解析（必须严格执行）**：
        • “A到B之间/从A到B” → priceMin=A, priceMax=B；
        • “A以上/不低于A/A起/最低A” → priceMin=A；
        • “低于B/不超过B/B以下/不到B” → priceMax=B；
        • “200多/二百多” → 200-300；“几百”→300-900（可根据常识划 300-900，但若用户给出更明确区间，以明确区间优先）；
        • 当解析出 priceMin/priceMax 时，**仅允许返回价格在该闭区间内的商品**；若找不到满足区间的商品，reply 要提示未找到并返回 items=[]。
      - 处理**口语化/模糊表述**：如“包邮的奶茶”匹配isFreeShipping=true且searchIndex含“奶茶”的商品；“爆款饮料”匹配isHot=true且searchIndex含“饮料”的商品；“200多的饮品”匹配price在200-300之间且品类为饮品的商品；
      - 忽略无意义表述：如“帮我找”“推荐一下”“谢谢”等口语化冗余内容，仅提取核心查询信息。

    3.1 **返回前强制校验（务必执行）**：
      - 如果用户意图中包含价格下限/上限，则在生成 items 前逐条校验：只保留 price 满足 priceMin <= price <= priceMax 的商品；
      - 若没有任何商品满足价格/属性等约束，则返回 reply=“未找到匹配的商品...” 且 items=[]；
      - 禁止返回任何价格超出区间的商品（例如 priceMax=300 时，不得返回 price=320/335 的商品）。
    3. **输出格式强制要求（必须严格遵守）**：
      - 必须返回**纯JSON对象**，无任何前置、后置文本，无注释、换行符、空格冗余；
      - JSON仅包含两个字段，字段名不可修改：
        ✅ reply：自然语言回复，需友好说明匹配结果（如“为你找到2款符合要求的港式奶茶，均为包邮爆款～”“未找到匹配的商品哦，你可以尝试调整关键词”）；
        ✅ items：匹配商品的**数字ID数组**，仅包含纯数字编号，无其他字符；若无匹配商品，返回空数组[]；
      - 禁止输出JSON以外的任何内容，包括解释、说明、标点符号、换行等。

    4. **无匹配处理规则**：若没有任何商品符合用户查询条件，reply需提示“未找到匹配的商品，你可以尝试调整关键词或筛选条件”，items返回空数组[]。

    5. **敏感/违法商品处理规则（必须严格执行）**：
      - 若用户查询涉及色情、未成年人相关性内容、强烈暴力或血腥、枪支与弹药、爆炸物、毒品/合成药物、恐怖主义相关、或其他明显违法/有害的商品或行为（包括搜索如何制造/购买/规避法律的请求），请立即并**始终**按下述方式处理：
        1) 无论系统是否能够在商品列表中找到匹配商品，**items字段必须返回空数组[]**；
        2) **reply字段必须返回一个友好但明确的警告语**，例如："抱歉，我无法提供与色情、毒品、枪支或其他违法/有害商品相关的推荐或信息。如需帮助，请避免此类关键词并遵守当地法律。"（禁止在reply中包含购买渠道、制作方法、规避建议或任何可行动的细节）；
        3) 禁止返回任何与该敏感主题相关的商品ID、链接、描述或操作性建议；
      - 请将上述敏感类别视为优先级最高的规则，覆盖前面所有匹配逻辑。

    ### 商品列表匹配补充说明
    - 商品列表中的\`$r('app.string.xxx')\`为多语言资源标识，需解析为实际语义：如$r('app.string.goods_milk_tea')解析为“香港风味丝袖奶茶”，$r('app.string.advertising_language')解析为商品广告语，$r('app.string.evaluate')解析为用户评价；
    - 无论商品列表中有多少条商品，仅返回匹配商品的**数字ID**到items数组中，禁止返回ID以外的任何标识。

    以下是商品列表：
    ${goodsListStr}` }
            ];
            // 添加历史对话记录（保留上下文）
            this.chatHistory.forEach((historyItem: ChatHistoryItem) => {
                messagesArr.push({ role: historyItem.role, content: historyItem.content });
            });
            const bodyObj: DeepSeekRequest = {
                model: this.AI_MODEL_NAME,
                messages: messagesArr,
                temperature: 0.2
            };
            const body = JSON.stringify(bodyObj);
            const headerObj: Record<string, string> = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.AI_API_KEY}`
            };
            const requestOptions: HttpRequestOptions = {
                method: http.RequestMethod.POST,
                header: headerObj,
                extraData: body,
                connectTimeout: 10000,
                readTimeout: 10000
            };
            console.info('AIService: sending request to', this.AI_API_URL);
            console.info('AIService: requestOptions:', JSON.stringify({ method: requestOptions.method, header: requestOptions.header }));
            const response = await httpRequest.request(this.AI_API_URL, requestOptions);
            try {
                const respObj = response as HttpResponseLike;
                console.info('AIService: raw response object:', JSON.stringify(respObj));
                const respTextForLog = respObj.result || respObj.body || JSON.stringify(response);
                console.info('AIService: respText used for parsing:', respTextForLog);
            }
            catch (logErr) {
                console.info('AIService: raw response received (toString):', String(response));
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
                    }
                    catch (e) {
                        const jsonMatch = String(content).match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            return JSON.parse(jsonMatch[0]) as DeepSeekResult;
                        }
                    }
                }
            }
            catch (err) {
                console.warn('尝试解析 AI 服务响应为 JSON 失败，使用回退解析', String(err));
            }
        }
        catch (err) {
            console.error('AI API 调用异常：', String(err));
        }
        finally {
            httpRequest.destroy();
        }
        // 如果无法从 DeepSeek 获得有效 JSON 响应，则返回空结果并告知服务不可用（不再回退到本地解析）
        return { reply: '对不起，搜索服务暂时无法使用，请稍后再试。', items: [] } as DeepSeekResult;
    }
    // 本地回退解析已移除：当 DeepSeek 无法返回有效结果时，不再进行本地匹配，
    // 而是直接返回空结果并在界面上提示服务不可用。
    private parsePriceUpperBound(query: string): number | null {
        const q = query.toLowerCase();
        const regexes: RegExp[] = [
            /(?:低于|小于|不超过|少于|不到|以下|以内|之内)\s*(\d{2,})/,
            /(\d{2,})\s*(?:元|块|￥|¥)?\s*(?:以下|以内|之内)/
        ];
        for (const reg of regexes) {
            const m = q.match(reg);
            if (m && m[1]) {
                const val = parseInt(m[1], 10);
                if (!Number.isNaN(val)) {
                    return val;
                }
            }
        }
        return null;
    }
    private parsePriceLowerBound(query: string): number | null {
        const q = query.toLowerCase();
        const regexes: RegExp[] = [
            /(?:高于|大于|超过|以上|不低于|起|最低)\s*(\d{2,})/,
            /(\d{2,})\s*(?:元|块|￥|¥)?\s*(?:以上|起|最低|不低于)/
        ];
        for (const reg of regexes) {
            const m = q.match(reg);
            if (m && m[1]) {
                const val = parseInt(m[1], 10);
                if (!Number.isNaN(val)) {
                    return val;
                }
            }
        }
        return null;
    }
    private parseFreeShipping(query: string): boolean {
        const q = query.toLowerCase();
        return q.indexOf('包邮') >= 0 || q.indexOf('免运费') >= 0 || q.indexOf('免邮') >= 0;
    }
    private applyPostFilters(list: GoodsListItemType[], priceLower: number | null, priceUpper: number | null, requireFreeShipping: boolean): GoodsListItemType[] {
        return list.filter((g: GoodsListItemType) => {
            if (priceLower !== null && g.price < priceLower) {
                return false;
            }
            if (priceUpper !== null && g.price > priceUpper) {
                return false;
            }
            if (requireFreeShipping && !g.isFreeShipping) {
                return false;
            }
            return true;
        });
    }
    private filterGoodsPoolFallback(priceLower: number | null, priceUpper: number | null, requireFreeShipping: boolean): GoodsListItemType[] {
        let pool = goodsPool.slice();
        if (priceLower !== null) {
            pool = pool.filter((g: GoodsListItemType) => g.price >= priceLower);
        }
        if (priceUpper !== null) {
            pool = pool.filter((g: GoodsListItemType) => g.price <= priceUpper);
        }
        if (requireFreeShipping) {
            pool = pool.filter((g: GoodsListItemType) => g.isFreeShipping);
        }
        return pool.slice();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AIChatPage";
    }
}
registerNamedRoute(() => new AIChatPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/AIChatPage", pageFullPath: "entry/src/main/ets/pages/AIChatPage", integratedHsp: "false", moduleType: "followWithHap" });
