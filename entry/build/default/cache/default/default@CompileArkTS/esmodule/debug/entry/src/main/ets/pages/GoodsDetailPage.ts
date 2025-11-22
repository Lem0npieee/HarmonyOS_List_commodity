if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GoodsDetailPage_Params {
    goods?: GoodsListItemType | null;
    selectedSpec?: number;
    quantity?: number;
    showAllReviews?: boolean;
    showAllQA?: boolean;
    displayedReviews?: ReviewItem[];
    displayedQA?: QAItem[];
    recommendedGoods?: GoodsListItemType[];
    isFavorited?: boolean;
    scroller?: Scroller;
}
import router from "@ohos:router";
import { CategoryType, goodsPool } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { GoodsListItemType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import CartStore from "@bundle:com.example.list_harmony/entry/ets/common/CartStore";
import FavoritesStore from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import NotificationStore from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import prompt from "@ohos:prompt";
// 定义接口
interface ReviewItem {
    user: string;
    level: string;
    rating: number;
    content: string;
    spec: string;
}
interface QAItem {
    user: string;
    question: string;
    answer: string;
    answerCount: number;
}
interface ReviewCategory {
    phone: ReviewItem[];
    clothes: ReviewItem[];
    food: ReviewItem[];
    home: ReviewItem[];
}
interface QACategory {
    phone: QAItem[];
    clothes: QAItem[];
    food: QAItem[];
    home: QAItem[];
}
// 评价数据池 - 按类别组织
const REVIEWS_BY_CATEGORY: ReviewCategory = {
    phone: [
        { user: 'a**m', level: '钻石会员', rating: 5, content: '手机性能非常好,拍照效果惊艳,续航给力,值得购买!', spec: '[256GB 蓝色]' },
        { user: 'z**8', level: '黄金会员', rating: 5, content: '系统流畅,屏幕显示细腻,信号稳定,很满意!', spec: '[512GB 黑色]' },
        { user: 'w**3', level: '银牌会员', rating: 4, content: '整体不错,就是价格有点贵,但品质确实好', spec: '[128GB 白色]' },
        { user: 'l**n', level: '钻石会员', rating: 5, content: '5G网速飞快,玩游戏很流畅,散热也做得不错', spec: '[256GB 蓝色]' },
        { user: 'j**7', level: '黄金会员', rating: 5, content: '外观漂亮,手感舒适,拍照功能强大', spec: '[512GB 金色]' },
        { user: 'h**2', level: '银牌会员', rating: 4, content: '音质很好,屏幕亮度高,总体满意', spec: '[256GB 黑色]' },
        { user: 'q**5', level: '钻石会员', rating: 5, content: '电池耐用,充电速度快,用了一周很稳定', spec: '[512GB 蓝色]' },
        { user: 'p**1', level: '黄金会员', rating: 5, content: '摄像头效果好,夜拍也很清晰', spec: '[256GB 白色]' },
        { user: 'r**9', level: '银牌会员', rating: 4, content: '系统更新及时,运行速度快', spec: '[128GB 黑色]' },
        { user: 'm**4', level: '钻石会员', rating: 5, content: '包装精美,发货快,手机质量很好', spec: '[512GB 蓝色]' },
        { user: 's**6', level: '黄金会员', rating: 5, content: '性价比高,功能齐全,推荐购买', spec: '[256GB 金色]' },
        { user: 't**0', level: '银牌会员', rating: 4, content: '用起来很顺手,没有卡顿现象', spec: '[512GB 白色]' }
    ],
    clothes: [
        { user: 'x**y', level: '钻石会员', rating: 5, content: '面料舒适,做工精细,版型很好看,非常满意!', spec: '[L码 蓝色]' },
        { user: 'b**c', level: '黄金会员', rating: 5, content: '颜色正,质量不错,穿着很舒服', spec: '[M码 黑色]' },
        { user: 'n**f', level: '银牌会员', rating: 4, content: '款式好看,就是有点薄,秋天穿刚好', spec: '[XL码 灰色]' },
        { user: 'd**g', level: '钻石会员', rating: 5, content: '尺码标准,颜色漂亮,很有质感', spec: '[L码 白色]' },
        { user: 'e**h', level: '黄金会员', rating: 5, content: '洗过不缩水,不掉色,值得购买', spec: '[M码 蓝色]' },
        { user: 'f**i', level: '银牌会员', rating: 4, content: '性价比高,适合日常穿着', spec: '[XL码 黑色]' },
        { user: 'g**j', level: '钻石会员', rating: 5, content: '包装好,发货快,衣服质量很棒', spec: '[L码 灰色]' },
        { user: 'k**l', level: '黄金会员', rating: 5, content: '面料柔软,穿着不起球,很满意', spec: '[M码 白色]' },
        { user: 'o**p', level: '银牌会员', rating: 4, content: '版型修身,显得很精神', spec: '[XL码 蓝色]' },
        { user: 'u**v', level: '钻石会员', rating: 5, content: '设计时尚,搭配方便,很喜欢', spec: '[L码 黑色]' },
        { user: 'w**x', level: '黄金会员', rating: 5, content: '价格实惠,质量好,会回购', spec: '[M码 灰色]' },
        { user: 'y**z', level: '银牌会员', rating: 4, content: '收到很惊喜,比想象中好', spec: '[XL码 白色]' }
    ],
    food: [
        { user: 't**k', level: '黄金会员', rating: 5, content: '价格划算,口感不错,已经买过好几次了,很新鲜!', spec: '[经典装]' },
        { user: 'c**d', level: '钻石会员', rating: 5, content: '味道很好,分量足,包装精美', spec: '[豪华装]' },
        { user: 'v**w', level: '银牌会员', rating: 4, content: '口味不错,就是有点甜,总体满意', spec: '[礼盒装]' },
        { user: 'i**j', level: '黄金会员', rating: 5, content: '新鲜度高,保质期长,很放心', spec: '[经典装]' },
        { user: 'k**l', level: '钻石会员', rating: 5, content: '孩子很喜欢吃,健康美味', spec: '[豪华装]' },
        { user: 'm**n', level: '银牌会员', rating: 4, content: '性价比高,适合囤货', spec: '[经典装]' },
        { user: 'o**p', level: '黄金会员', rating: 5, content: '包装完整,没有破损,很满意', spec: '[礼盒装]' },
        { user: 'q**r', level: '钻石会员', rating: 5, content: '送人很体面,自己吃也不错', spec: '[豪华装]' },
        { user: 's**t', level: '银牌会员', rating: 4, content: '味道纯正,分量实在', spec: '[经典装]' },
        { user: 'u**v', level: '黄金会员', rating: 5, content: '物流快,东西新鲜,推荐', spec: '[礼盒装]' },
        { user: 'w**x', level: '钻石会员', rating: 5, content: '老顾客了,一如既往的好', spec: '[豪华装]' },
        { user: 'y**z', level: '银牌会员', rating: 4, content: '价格合理,质量放心', spec: '[经典装]' }
    ],
    home: [
        { user: 'g**h', level: '钻石会员', rating: 5, content: '功能强大,使用方便,物有所值,推荐!', spec: '[白色]' },
        { user: 'a**b', level: '黄金会员', rating: 5, content: '质量好,噪音小,效果明显', spec: '[黑色]' },
        { user: 'c**d', level: '银牌会员', rating: 4, content: '性价比不错,功能齐全', spec: '[灰色]' },
        { user: 'e**f', level: '钻石会员', rating: 5, content: '设计人性化,操作简单', spec: '[白色]' },
        { user: 'g**h', level: '黄金会员', rating: 5, content: '省电省心,效果很好', spec: '[黑色]' },
        { user: 'i**j', level: '银牌会员', rating: 4, content: '外观漂亮,做工精细', spec: '[灰色]' },
        { user: 'k**l', level: '钻石会员', rating: 5, content: '智能化程度高,体验很好', spec: '[白色]' },
        { user: 'm**n', level: '黄金会员', rating: 5, content: '品质可靠,值得信赖', spec: '[黑色]' },
        { user: 'o**p', level: '银牌会员', rating: 4, content: '物流快,包装好,满意', spec: '[灰色]' },
        { user: 'q**r', level: '钻石会员', rating: 5, content: '使用效果超出预期', spec: '[白色]' },
        { user: 's**t', level: '黄金会员', rating: 5, content: '性能稳定,推荐购买', spec: '[黑色]' },
        { user: 'u**v', level: '银牌会员', rating: 4, content: '功能实用,价格合理', spec: '[灰色]' }
    ]
};
// 问大家数据池
const QA_BY_CATEGORY: QACategory = {
    phone: [
        { user: 'q**1', question: '这款手机支持5G吗?', answer: '支持的,5G信号很稳定', answerCount: 15 },
        { user: 'a**2', question: '电池能用一天吗?', answer: '正常使用一天没问题,重度使用需要充一次', answerCount: 23 },
        { user: 'w**3', question: '有没有充电器?', answer: '有配充电器和数据线', answerCount: 18 },
        { user: 'e**4', question: '拍照效果怎么样?', answer: '拍照很清晰,夜拍也不错', answerCount: 31 },
        { user: 'r**5', question: '玩游戏会发热吗?', answer: '散热做得不错,长时间玩也不会很烫', answerCount: 27 }
    ],
    clothes: [
        { user: 'q**6', question: '会不会起球?', answer: '穿了一个月没起球,质量很好', answerCount: 20 },
        { user: 'a**7', question: '尺码准吗?', answer: '尺码标准,按平时的买就行', answerCount: 35 },
        { user: 'w**8', question: '面料厚吗?', answer: '厚度适中,春秋穿刚好', answerCount: 16 },
        { user: 'e**9', question: '会不会缩水?', answer: '洗过不缩水,放心购买', answerCount: 22 },
        { user: 'r**0', question: '颜色会掉吗?', answer: '颜色很正,洗了不掉色', answerCount: 19 }
    ],
    food: [
        { user: 'q**a', question: '保质期多久?', answer: '保质期12个月,很新鲜', answerCount: 28 },
        { user: 'a**b', question: '有没有添加剂?', answer: '没有添加剂,很健康', answerCount: 33 },
        { user: 'w**c', question: '适合小孩吃吗?', answer: '很适合,小孩很喜欢', answerCount: 25 },
        { user: 'e**d', question: '包装会破损吗?', answer: '包装很结实,收到完好无损', answerCount: 17 },
        { user: 'r**e', question: '味道甜吗?', answer: '甜度适中,口感很好', answerCount: 29 }
    ],
    home: [
        { user: 'q**f', question: '噪音大吗?', answer: '噪音很小,不影响休息', answerCount: 24 },
        { user: 'a**g', question: '耗电吗?', answer: '很省电,功耗不高', answerCount: 21 },
        { user: 'w**h', question: '好操作吗?', answer: '操作很简单,老人也会用', answerCount: 30 },
        { user: 'e**i', question: '质量怎么样?', answer: '质量很好,做工精细', answerCount: 26 },
        { user: 'r**j', question: '售后好吗?', answer: '售后很负责,有问题马上解决', answerCount: 19 }
    ]
};
class GoodsDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__goods = new ObservedPropertyObjectPU(null, this, "goods");
        this.__selectedSpec = new ObservedPropertySimplePU(0, this, "selectedSpec");
        this.__quantity = new ObservedPropertySimplePU(1, this, "quantity");
        this.__showAllReviews = new ObservedPropertySimplePU(false, this, "showAllReviews");
        this.__showAllQA = new ObservedPropertySimplePU(false, this, "showAllQA");
        this.__displayedReviews = new ObservedPropertyObjectPU([], this, "displayedReviews");
        this.__displayedQA = new ObservedPropertyObjectPU([], this, "displayedQA");
        this.__recommendedGoods = new ObservedPropertyObjectPU([], this, "recommendedGoods");
        this.__isFavorited = new ObservedPropertySimplePU(false, this, "isFavorited");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GoodsDetailPage_Params) {
        if (params.goods !== undefined) {
            this.goods = params.goods;
        }
        if (params.selectedSpec !== undefined) {
            this.selectedSpec = params.selectedSpec;
        }
        if (params.quantity !== undefined) {
            this.quantity = params.quantity;
        }
        if (params.showAllReviews !== undefined) {
            this.showAllReviews = params.showAllReviews;
        }
        if (params.showAllQA !== undefined) {
            this.showAllQA = params.showAllQA;
        }
        if (params.displayedReviews !== undefined) {
            this.displayedReviews = params.displayedReviews;
        }
        if (params.displayedQA !== undefined) {
            this.displayedQA = params.displayedQA;
        }
        if (params.recommendedGoods !== undefined) {
            this.recommendedGoods = params.recommendedGoods;
        }
        if (params.isFavorited !== undefined) {
            this.isFavorited = params.isFavorited;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: GoodsDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__goods.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSpec.purgeDependencyOnElmtId(rmElmtId);
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__showAllReviews.purgeDependencyOnElmtId(rmElmtId);
        this.__showAllQA.purgeDependencyOnElmtId(rmElmtId);
        this.__displayedReviews.purgeDependencyOnElmtId(rmElmtId);
        this.__displayedQA.purgeDependencyOnElmtId(rmElmtId);
        this.__recommendedGoods.purgeDependencyOnElmtId(rmElmtId);
        this.__isFavorited.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__goods.aboutToBeDeleted();
        this.__selectedSpec.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
        this.__showAllReviews.aboutToBeDeleted();
        this.__showAllQA.aboutToBeDeleted();
        this.__displayedReviews.aboutToBeDeleted();
        this.__displayedQA.aboutToBeDeleted();
        this.__recommendedGoods.aboutToBeDeleted();
        this.__isFavorited.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __goods: ObservedPropertyObjectPU<GoodsListItemType | null>;
    get goods() {
        return this.__goods.get();
    }
    set goods(newValue: GoodsListItemType | null) {
        this.__goods.set(newValue);
    }
    private __selectedSpec: ObservedPropertySimplePU<number>;
    get selectedSpec() {
        return this.__selectedSpec.get();
    }
    set selectedSpec(newValue: number) {
        this.__selectedSpec.set(newValue);
    }
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __showAllReviews: ObservedPropertySimplePU<boolean>;
    get showAllReviews() {
        return this.__showAllReviews.get();
    }
    set showAllReviews(newValue: boolean) {
        this.__showAllReviews.set(newValue);
    }
    private __showAllQA: ObservedPropertySimplePU<boolean>;
    get showAllQA() {
        return this.__showAllQA.get();
    }
    set showAllQA(newValue: boolean) {
        this.__showAllQA.set(newValue);
    }
    private __displayedReviews: ObservedPropertyObjectPU<ReviewItem[]>;
    get displayedReviews() {
        return this.__displayedReviews.get();
    }
    set displayedReviews(newValue: ReviewItem[]) {
        this.__displayedReviews.set(newValue);
    }
    private __displayedQA: ObservedPropertyObjectPU<QAItem[]>;
    get displayedQA() {
        return this.__displayedQA.get();
    }
    set displayedQA(newValue: QAItem[]) {
        this.__displayedQA.set(newValue);
    }
    private __recommendedGoods: ObservedPropertyObjectPU<GoodsListItemType[]>;
    get recommendedGoods() {
        return this.__recommendedGoods.get();
    }
    set recommendedGoods(newValue: GoodsListItemType[]) {
        this.__recommendedGoods.set(newValue);
    }
    private __isFavorited: ObservedPropertySimplePU<boolean>;
    get isFavorited() {
        return this.__isFavorited.get();
    }
    set isFavorited(newValue: boolean) {
        this.__isFavorited.set(newValue);
    }
    private scroller: Scroller;
    aboutToAppear() {
        try {
            const params = router.getParams() as Record<string, Object>;
            if (params && params.goods) {
                this.goods = params.goods as GoodsListItemType;
                // 同步收藏状态，确保返回详情页时能正确显示
                try {
                    if (this.goods) {
                        this.isFavorited = FavoritesStore.isFavorited(this.goods.id);
                    }
                }
                catch (e) {
                    console.error('同步收藏状态失败:', String(e));
                }
                // 初始化评价数据
                this.initializeReviews();
                // 初始化问大家数据
                this.initializeQA();
                // 初始化推荐商品
                this.initializeRecommendedGoods();
            }
        }
        catch (err) {
            console.error('获取参数失败:', err);
        }
    }
    // 初始化评价数据
    private initializeReviews() {
        if (!this.goods)
            return;
        const category = this.goods.category;
        let reviewPool: ReviewItem[] = [];
        // 根据分类获取评价池
        switch (category) {
            case CategoryType.Phone:
                reviewPool = REVIEWS_BY_CATEGORY.phone;
                break;
            case CategoryType.Clothes:
                reviewPool = REVIEWS_BY_CATEGORY.clothes;
                break;
            case CategoryType.Food:
                reviewPool = REVIEWS_BY_CATEGORY.food;
                break;
            case CategoryType.Home:
                reviewPool = REVIEWS_BY_CATEGORY.home;
                break;
            default:
                reviewPool = REVIEWS_BY_CATEGORY.food;
        }
        // 随机打乱并取第一条作为默认显示
        const shuffled = this.shuffleArray([...reviewPool]);
        this.displayedReviews = [shuffled[0]];
    }
    // 初始化问大家数据
    private initializeQA() {
        if (!this.goods)
            return;
        const category = this.goods.category;
        let qaPool: QAItem[] = [];
        // 根据分类获取问答池
        switch (category) {
            case CategoryType.Phone:
                qaPool = QA_BY_CATEGORY.phone;
                break;
            case CategoryType.Clothes:
                qaPool = QA_BY_CATEGORY.clothes;
                break;
            case CategoryType.Food:
                qaPool = QA_BY_CATEGORY.food;
                break;
            case CategoryType.Home:
                qaPool = QA_BY_CATEGORY.home;
                break;
            default:
                qaPool = QA_BY_CATEGORY.food;
        }
        // 随机打乱并取第一条作为默认显示
        const shuffled = this.shuffleArray([...qaPool]);
        this.displayedQA = [shuffled[0]];
    }
    // 初始化推荐商品
    private initializeRecommendedGoods() {
        if (!this.goods)
            return;
        // 获取同类商品
        const sameCategory = goodsPool.filter(item => item.category === this.goods?.category &&
            item.title !== this.goods?.title);
        // 随机打乱并取6个
        const shuffled = this.shuffleArray(sameCategory);
        this.recommendedGoods = shuffled.slice(0, 6);
    }
    // 数组随机打乱
    private shuffleArray<T>(array: T[]): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }
        return result;
    }
    // 展开评价
    private expandReviews() {
        if (!this.goods)
            return;
        const category = this.goods.category;
        let reviewPool: ReviewItem[] = [];
        switch (category) {
            case CategoryType.Phone:
                reviewPool = REVIEWS_BY_CATEGORY.phone;
                break;
            case CategoryType.Clothes:
                reviewPool = REVIEWS_BY_CATEGORY.clothes;
                break;
            case CategoryType.Food:
                reviewPool = REVIEWS_BY_CATEGORY.food;
                break;
            case CategoryType.Home:
                reviewPool = REVIEWS_BY_CATEGORY.home;
                break;
            default:
                reviewPool = REVIEWS_BY_CATEGORY.food;
        }
        // 保留第一条,随机显示另外4条
        const firstReview = this.displayedReviews[0];
        const otherReviews: ReviewItem[] = [];
        for (let i = 0; i < reviewPool.length; i++) {
            if (reviewPool[i] !== firstReview) {
                otherReviews.push(reviewPool[i]);
            }
        }
        const shuffled = this.shuffleArray(otherReviews);
        this.displayedReviews = [firstReview, ...shuffled.slice(0, 4)];
        this.showAllReviews = true;
    }
    // 展开问大家
    private expandQA() {
        if (!this.goods)
            return;
        const category = this.goods.category;
        let qaPool: QAItem[] = [];
        switch (category) {
            case CategoryType.Phone:
                qaPool = QA_BY_CATEGORY.phone;
                break;
            case CategoryType.Clothes:
                qaPool = QA_BY_CATEGORY.clothes;
                break;
            case CategoryType.Food:
                qaPool = QA_BY_CATEGORY.food;
                break;
            case CategoryType.Home:
                qaPool = QA_BY_CATEGORY.home;
                break;
            default:
                qaPool = QA_BY_CATEGORY.food;
        }
        // 保留第一条,随机显示另外4条
        const firstQA = this.displayedQA[0];
        const otherQA: QAItem[] = [];
        for (let i = 0; i < qaPool.length; i++) {
            if (qaPool[i] !== firstQA) {
                otherQA.push(qaPool[i]);
            }
        }
        const shuffled = this.shuffleArray(otherQA);
        this.displayedQA = [firstQA, ...shuffled.slice(0, 4)];
        this.showAllQA = true;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏（与 ListIndex 的结构一致，防止 Navigation 占满整个页面）
            Row.create();
            // 顶部导航栏（与 ListIndex 的结构一致，防止 Navigation 占满整个页面）
            Row.height(56);
            // 顶部导航栏（与 ListIndex 的结构一致，防止 Navigation 占满整个页面）
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/GoodsDetailPage", isUserCreateStack: false });
            Navigation.size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT });
            Navigation.title(STORE);
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832663, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125833751, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
        }, Image);
        Row.pop();
        Column.pop();
        Navigation.pop();
        // 顶部导航栏（与 ListIndex 的结构一致，防止 Navigation 占满整个页面）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create(this.scroller);
                        Scroll.scrollBar(BarState.Off);
                        Scroll.layoutWeight(1);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    // 商品图片轮播
                    this.buildImageSwiper.bind(this)();
                    // 商品基本信息
                    this.buildBasicInfo.bind(this)();
                    // 优惠信息
                    this.buildPromotionInfo.bind(this)();
                    // 配送信息
                    this.buildDeliveryInfo.bind(this)();
                    // 规格选择
                    this.buildSpecifications.bind(this)();
                    // 店铺信息
                    this.buildShopInfo.bind(this)();
                    // 评价预览
                    this.buildReviews.bind(this)();
                    // 商品详情图片
                    this.buildDetailImages.bind(this)();
                    Column.pop();
                    Scroll.pop();
                    // 底部操作栏
                    this.buildBottomBar.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildNavBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832663, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125833751, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
        }, Image);
        Row.pop();
    }
    buildImageSwiper(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.width('100%');
            Swiper.height(375);
            Swiper.backgroundColor(Color.White);
            Swiper.indicator(true);
            Swiper.loop(true);
            Swiper.autoPlay(true);
            Swiper.interval(3000);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.goods?.cover);
            Image.width('100%');
            Image.height(375);
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods?.detailImages) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const img = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(img);
                                Image.width('100%');
                                Image.height(375);
                                Image.objectFit(ImageFit.Cover);
                            }, Image);
                        };
                        this.forEachUpdateFunction(elmtId, this.goods.detailImages, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Swiper.pop();
    }
    buildBasicInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 价格区域
            Row.create();
            // 价格区域
            Row.width('100%');
            // 价格区域
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥');
            Text.fontSize(16);
            Text.fontColor('#FF0000');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.price.toFixed(2));
            Text.fontSize(28);
            Text.fontColor('#FF0000');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods?.originalPrice && this.goods.originalPrice > this.goods.price) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('¥' + this.goods.originalPrice.toFixed(2));
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.decoration({ type: TextDecorationType.LineThrough });
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已售 ' + (this.goods?.salesCount ?? 7) + '+');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 价格区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品标题（左对齐，自动换行）
            Text.create(this.goods?.title);
            // 商品标题（左对齐，自动换行）
            Text.fontSize(16);
            // 商品标题（左对齐，自动换行）
            Text.fontColor('#333333');
            // 商品标题（左对齐，自动换行）
            Text.fontWeight(FontWeight.Medium);
            // 商品标题（左对齐，自动换行）
            Text.textAlign(TextAlign.Start);
            // 商品标题（左对齐，自动换行）
            Text.width('100%');
            // 商品标题（左对齐，自动换行）
            Text.lineHeight(24);
            // 商品标题（左对齐，自动换行）
            Text.wordBreak(WordBreak.BREAK_ALL);
            // 商品标题（左对齐，自动换行）
            Text.margin({ bottom: 8 });
        }, Text);
        // 商品标题（左对齐，自动换行）
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标签（紧跟名称后面）
            Row.create({ space: 8 });
            // 标签（紧跟名称后面）
            Row.width('100%');
            // 标签（紧跟名称后面）
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods?.tags) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const tag = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(tag);
                                Text.fontSize(11);
                                Text.fontColor('#FF6B00');
                                Text.padding({ left: 6, right: 6, top: 3, bottom: 3 });
                                Text.border({ width: 1, color: '#FF6B00', radius: 3 });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.goods.tags, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 标签（紧跟名称后面）
        Row.pop();
        Column.pop();
    }
    buildPromotionInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('点击成为会员，领券下单更优惠');
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('承诺');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.width(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('· 24小时闪电发货  · 使用24小时内可退');
            Text.fontSize(12);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    buildDeliveryInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('配送');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.deliveryInfo ?? '不支持7天无理由退换');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('送至');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('广东 广州 · 免运费');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        Column.pop();
    }
    buildSpecifications(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(Color.White);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('麦当劳');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods?.specifications && this.goods.specifications.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const spec = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(spec);
                                Text.fontSize(13);
                                Text.fontColor(this.selectedSpec === index ? '#FF0000' : '#333333');
                                Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                                Text.backgroundColor(this.selectedSpec === index ? '#FFE8E8' : '#F5F5F5');
                                Text.borderRadius(4);
                                Text.border({
                                    width: 1,
                                    color: this.selectedSpec === index ? '#FF0000' : '#E0E0E0'
                                });
                                Text.onClick(() => {
                                    this.selectedSpec = index;
                                });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.goods.specifications, forEachItemGenFunction, (spec: string, index: number) => index.toString(), true, true);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('小薯  无有效期  镇江');
                        Text.fontSize(13);
                        Text.fontColor('#333333');
                        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                        Text.backgroundColor('#F5F5F5');
                        Text.borderRadius(4);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
    }
    buildShopInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(Color.White);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.borderRadius(20);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.shopName ?? '猫小弟');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const star = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125831521, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Image.width(12);
                    Image.height(12);
                    Image.fillColor('#FFB800');
                    Image.margin({ left: 4 });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('4.4');
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('424位');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('店铺宝贝27项好评');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关注');
            Button.fontSize(13);
            Button.fontColor('#FF6600');
            Button.backgroundColor(Color.Transparent);
            Button.border({ width: 1, color: '#FF6600', radius: 16 });
            Button.padding({ left: 16, right: 16, top: 6, bottom: 6 });
        }, Button);
        Button.pop();
        Row.pop();
    }
    buildReviews(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评价 · 5万+');
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.showAllReviews ? '收起' : '查看全部');
            Text.fontSize(13);
            Text.fontColor('#999999');
            Text.onClick(() => {
                if (!this.showAllReviews) {
                    this.expandReviews();
                }
                else {
                    this.showAllReviews = false;
                    this.displayedReviews = [this.displayedReviews[0]];
                }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor(Color.Black);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评价筛选
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户评价好 28');
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#F5F5F5');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('速度快 20');
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#F5F5F5');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('价格实惠 9');
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#F5F5F5');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        // 评价筛选
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#E5E5E5');
            Divider.margin({ top: 8, bottom: 8 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评价列表
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const review = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Image.width(32);
                    Image.height(32);
                    Image.borderRadius(16);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 2 });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.margin({ left: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(review.user + ' ' + review.level);
                    Text.fontSize(13);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const star = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 125831521, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Image.width(12);
                            Image.height(12);
                            Image.fillColor(star <= review.rating ? '#FFB800' : '#E0E0E0');
                        }, Image);
                    };
                    this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(review.spec);
                    Text.fontSize(11);
                    Text.fontColor('#999999');
                    Text.margin({ left: 8 });
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(review.content);
                    Text.fontSize(13);
                    Text.fontColor('#333333');
                    Text.lineHeight(20);
                    Text.margin({ top: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.goods?.cover);
                    Image.width(80);
                    Image.height(80);
                    Image.borderRadius(4);
                    Image.margin({ top: 8 });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < this.displayedReviews.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.color('#F0F0F0');
                                Divider.margin({ top: 12, bottom: 4 });
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.displayedReviews, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 评价列表
        ForEach.pop();
        Column.pop();
    }
    buildDetailImages(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 问大家部分
            Row.create();
            // 问大家部分
            Row.width('100%');
            // 问大家部分
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('问大家 · ' + (this.displayedQA.length > 1 ? this.displayedQA.length : '2'));
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.showAllQA ? '收起' : '查看更多');
            Text.fontSize(13);
            Text.fontColor('#999999');
            Text.onClick(() => {
                if (!this.showAllQA) {
                    this.expandQA();
                }
                else {
                    this.showAllQA = false;
                    this.displayedQA = [this.displayedQA[0]];
                }
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.fillColor(Color.Black);
        }, Image);
        // 问大家部分
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 问大家列表
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const qa = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(24);
                    Image.borderRadius(12);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(qa.user);
                    Text.fontSize(13);
                    Text.fontColor('#333333');
                    Text.margin({ left: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(qa.answerCount + '个回答');
                    Text.fontSize(11);
                    Text.fontColor('#999999');
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('问: ' + qa.question);
                    Text.fontSize(14);
                    Text.fontColor('#333333');
                    Text.fontWeight(FontWeight.Medium);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('答: ' + qa.answer);
                    Text.fontSize(13);
                    Text.fontColor('#666666');
                    Text.lineHeight(20);
                    Text.margin({ top: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < this.displayedQA.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.color('#F0F0F0');
                                Divider.margin({ top: 12, bottom: 12 });
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.displayedQA, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 问大家列表
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#E5E5E5');
            Divider.margin({ top: 16, bottom: 16 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 店铺推荐
            Text.create('店铺推荐');
            // 店铺推荐
            Text.fontSize(16);
            // 店铺推荐
            Text.fontColor('#333333');
            // 店铺推荐
            Text.fontWeight(FontWeight.Medium);
            // 店铺推荐
            Text.width('100%');
            // 店铺推荐
            Text.margin({ bottom: 16 });
        }, Text);
        // 店铺推荐
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 推荐商品网格
            Grid.create();
            // 推荐商品网格
            Grid.columnsTemplate('1fr 1fr');
            // 推荐商品网格
            Grid.columnsGap(12);
            // 推荐商品网格
            Grid.rowsGap(12);
            // 推荐商品网格
            Grid.width('100%');
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.onClick(() => {
                                // 跳转到该商品详情页
                                router.pushUrl({
                                    url: 'pages/GoodsDetailPage',
                                    params: { goods: item }
                                }).catch((err: Error) => {
                                    console.error('跳转失败:', err.message);
                                });
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
                            Text.fontSize(12);
                            Text.fontColor('#333333');
                            Text.maxLines(2);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.margin({ top: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('¥' + item.price.toFixed(2));
                            Text.fontSize(14);
                            Text.fontColor('#FF0000');
                            Text.fontWeight(FontWeight.Bold);
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.recommendedGoods, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 推荐商品网格
        Grid.pop();
        Column.pop();
    }
    buildBottomBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(60);
            Row.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Row.backgroundColor(Color.White);
            Row.shadow({ radius: 8, color: '#10000000', offsetY: -2 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 店铺
            Column.create({ space: 2 });
            // 店铺
            Column.width(50);
            // 店铺
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777314, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(22);
            Image.height(22);
            Image.fillColor(Color.Black);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('店铺');
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 店铺
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 收藏
            Column.create({ space: 2 });
            // 收藏
            Column.width(50);
            // 收藏
            Column.justifyContent(FlexAlign.Center);
            // 收藏
            Column.onClick(() => {
                try {
                    if (!this.goods)
                        return;
                    const added = FavoritesStore.toggle(ObservedObject.GetRawObject(this.goods));
                    this.isFavorited = added;
                    prompt.showToast({ message: added ? '已收藏' : '已取消收藏', duration: 1200 });
                }
                catch (err) {
                    console.error('收藏操作失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isFavorited ? { "id": 16777318, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777317, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(22);
            Image.height(22);
            Image.fillColor(this.isFavorited ? '#FF6600' : Color.Black);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('收藏');
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 收藏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 客服
            Column.create({ space: 2 });
            // 客服
            Column.width(50);
            // 客服
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777316, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(22);
            Image.height(22);
            Image.fillColor(Color.Black);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('客服');
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 客服
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 加入购物车
            Button.createWithLabel('加入购物车');
            // 加入购物车
            Button.fontSize(13);
            // 加入购物车
            Button.fontColor('#FF6600');
            // 加入购物车
            Button.backgroundColor('#FFE8D6');
            // 加入购物车
            Button.borderRadius(20);
            // 加入购物车
            Button.height(40);
            // 加入购物车
            Button.width(90);
            // 加入购物车
            Button.onClick(() => {
                try {
                    if (this.goods) {
                        CartStore.add(ObservedObject.GetRawObject(this.goods));
                        prompt.showToast({ message: '加入购物车成功', duration: 1500 });
                    }
                }
                catch (err) {
                    console.error('加入购物车失败:', String(err));
                }
            });
        }, Button);
        // 加入购物车
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 立即购买
            Button.createWithLabel('立即购买');
            // 立即购买
            Button.fontSize(13);
            // 立即购买
            Button.fontColor(Color.White);
            // 立即购买
            Button.backgroundColor('#FF6600');
            // 立即购买
            Button.borderRadius(20);
            // 立即购买
            Button.height(40);
            // 立即购买
            Button.width(90);
            // 立即购买
            Button.margin({ left: 8 });
            // 立即购买
            Button.onClick(() => {
                try {
                    if (this.goods) {
                        OrderStore.incrementPendingShipCount(1);
                        prompt.showToast({ message: '购买成功', duration: 1500 });
                        // 安排后续的发货和到货通知（示意）
                        const title = this.goods ? this.goods.title : '您购买的商品';
                        setTimeout(() => {
                            try {
                                const msg = `${title} 现已发货`;
                                NotificationStore.show(msg, 5000);
                                prompt.showToast({ message: msg, duration: 3000 });
                            }
                            catch (e) {
                                console.error('发货通知失败:', String(e));
                            }
                        }, 5000);
                        setTimeout(() => {
                            try {
                                const msg2 = `${title} 现已到货，请注意查收`;
                                NotificationStore.show(msg2, 5000);
                                prompt.showToast({ message: msg2, duration: 3000 });
                            }
                            catch (e) {
                                console.error('到货通知失败:', String(e));
                            }
                        }, 10000);
                    }
                }
                catch (err) {
                    console.error('购买失败:', String(err));
                }
            });
        }, Button);
        // 立即购买
        Button.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GoodsDetailPage";
    }
}
registerNamedRoute(() => new GoodsDetailPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/GoodsDetailPage", pageFullPath: "entry/src/main/ets/pages/GoodsDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
