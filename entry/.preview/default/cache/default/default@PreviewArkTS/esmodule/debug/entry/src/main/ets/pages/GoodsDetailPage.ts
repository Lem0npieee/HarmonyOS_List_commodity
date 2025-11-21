if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GoodsDetailPage_Params {
    goods?: GoodsListItemType | null;
    selectedSpec?: number;
    quantity?: number;
    scroller?: Scroller;
}
import router from "@ohos:router";
import type { GoodsListItemType } from '../viewmodel/InitialData';
class GoodsDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__goods = new ObservedPropertyObjectPU(null, this, "goods");
        this.__selectedSpec = new ObservedPropertySimplePU(0, this, "selectedSpec");
        this.__quantity = new ObservedPropertySimplePU(1, this, "quantity");
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
    }
    aboutToBeDeleted() {
        this.__goods.aboutToBeDeleted();
        this.__selectedSpec.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
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
    private scroller: Scroller;
    aboutToAppear() {
        try {
            const params = router.getParams() as Record<string, Object>;
            if (params && params.goods) {
                this.goods = params.goods as GoodsListItemType;
            }
        }
        catch (err) {
            console.error('获取参数失败:', err);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(27:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        // 顶部导航栏
        this.buildNavBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.goods !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create(this.scroller);
                        Scroll.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(32:9)", "entry");
                        Scroll.scrollBar(BarState.Off);
                        Scroll.layoutWeight(1);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(33:11)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(73:5)", "entry");
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832663, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(74:7)", "entry");
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(82:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125833751, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(84:7)", "entry");
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
        }, Image);
        Row.pop();
    }
    buildImageSwiper(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(97:5)", "entry");
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
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(98:7)", "entry");
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
                                Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(105:11)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(123:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 价格区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(125:7)", "entry");
            // 价格区域
            Row.width('100%');
            // 价格区域
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(126:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#FF0000');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.price.toFixed(2));
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(130:9)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(136:11)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(143:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已售 ' + (this.goods?.salesCount ?? 7) + '+');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(145:9)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 价格区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 商品标题（左对齐，自动换行）
            Text.create(this.goods?.title);
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(153:7)", "entry");
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
            Text.margin({ bottom: 8 });
        }, Text);
        // 商品标题（左对齐，自动换行）
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标签（紧跟名称后面）
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(163:7)", "entry");
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
                                Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(166:13)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(186:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(187:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(188:9)", "entry");
            Image.width(16);
            Image.height(16);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('点击成为会员，领券下单更优惠');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(192:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(196:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(197:9)", "entry");
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(203:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('承诺');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(204:9)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.width(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('· 24小时闪电发货  · 使用24小时内可退');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(208:9)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(221:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(222:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('配送');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(223:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.deliveryInfo ?? '不支持7天无理由退换');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(227:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(230:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(231:9)", "entry");
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(237:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('送至');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(238:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('广东 广州 · 免运费');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(242:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(245:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(246:9)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(260:5)", "entry");
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(Color.White);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('麦当劳');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(261:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.width(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(266:7)", "entry");
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
                                Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(269:13)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(284:11)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(293:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(295:7)", "entry");
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
    }
    buildShopInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(308:5)", "entry");
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(Color.White);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(309:7)", "entry");
            Image.width(40);
            Image.height(40);
            Image.borderRadius(20);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(314:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(315:9)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods?.shopName ?? '猫小弟');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(316:11)", "entry");
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
                    Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(322:13)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(329:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('424位');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(334:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('店铺宝贝27项好评');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(340:9)", "entry");
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(347:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关注');
            Button.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(349:7)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(364:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(365:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评价 · 5万+');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(366:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(371:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看全部');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(373:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(376:9)", "entry");
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评价筛选
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(383:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用户评价好 28');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(384:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#F5F5F5');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('速度快 20');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(391:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.backgroundColor('#F5F5F5');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('价格实惠 9');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(398:9)", "entry");
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
            Divider.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(406:7)", "entry");
            Divider.color('#E5E5E5');
            Divider.margin({ top: 8, bottom: 8 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评价示例
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(409:7)", "entry");
            // 评价示例
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(410:9)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(411:11)", "entry");
            Image.width(32);
            Image.height(32);
            Image.borderRadius(16);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(416:11)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('t**k 黄金会员');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(417:13)", "entry");
            Text.fontSize(13);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(421:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const star = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 125831521, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(423:17)", "entry");
                    Image.width(12);
                    Image.height(12);
                    Image.fillColor('#FFB800');
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('[超值3件套]');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(429:15)", "entry");
            Text.fontSize(11);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('价格划算，口感不错，已经买过好几次了。宵夜欢迎，收到货吃，味道确实不错');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(439:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#333333');
            Text.lineHeight(20);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.goods?.cover);
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(445:9)", "entry");
            Image.width(80);
            Image.height(80);
            Image.borderRadius(4);
            Image.margin({ top: 8 });
        }, Image);
        // 评价示例
        Column.pop();
        Column.pop();
    }
    buildDetailImages(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(462:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(Color.White);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(463:7)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('问大家 · 2');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(464:9)", "entry");
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(469:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('查看更多');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(471:9)", "entry");
            Text.fontSize(13);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832664, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(474:9)", "entry");
            Image.width(16);
            Image.height(16);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('店铺推荐');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(482:7)", "entry");
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.margin({ top: 16, bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 推荐商品网格
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(490:7)", "entry");
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
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(492:11)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(493:13)", "entry");
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.goods?.cover);
                            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(494:15)", "entry");
                            Image.width('100%');
                            Image.aspectRatio(1);
                            Image.borderRadius(8);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.goods?.title ?? '商品标题');
                            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(499:15)", "entry");
                            Text.fontSize(12);
                            Text.fontColor('#333333');
                            Text.maxLines(2);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.margin({ top: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('¥' + ((this.goods?.price ?? 0) + item * 10).toFixed(2));
                            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(506:15)", "entry");
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
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5, 6], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 推荐商品网格
        Grid.pop();
        Column.pop();
    }
    buildBottomBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(528:5)", "entry");
            Row.width('100%');
            Row.height(60);
            Row.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Row.backgroundColor(Color.White);
            Row.shadow({ radius: 8, color: '#10000000', offsetY: -2 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 首页
            Column.create({ space: 2 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(530:7)", "entry");
            // 首页
            Column.width(50);
            // 首页
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125831533, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(531:9)", "entry");
            Image.width(22);
            Image.height(22);
            Image.fillColor('#666666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('首页');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(535:9)", "entry");
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 首页
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 收藏
            Column.create({ space: 2 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(543:7)", "entry");
            // 收藏
            Column.width(50);
            // 收藏
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125831520, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(544:9)", "entry");
            Image.width(22);
            Image.height(22);
            Image.fillColor('#666666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('收藏');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(548:9)", "entry");
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 收藏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 客服
            Column.create({ space: 2 });
            Column.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(556:7)", "entry");
            // 客服
            Column.width(50);
            // 客服
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create($r('sys.symbol.person_crop_circle'));
            Image.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(557:9)", "entry");
            Image.width(22);
            Image.height(22);
            Image.fillColor('#666666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('客服');
            Text.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(561:9)", "entry");
            Text.fontSize(10);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 客服
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(568:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进店逛逛
            Button.createWithLabel('进店逛逛');
            Button.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(571:7)", "entry");
            // 进店逛逛
            Button.fontSize(13);
            // 进店逛逛
            Button.fontColor('#FF6600');
            // 进店逛逛
            Button.backgroundColor('#FFE8D6');
            // 进店逛逛
            Button.borderRadius(20);
            // 进店逛逛
            Button.height(40);
            // 进店逛逛
            Button.width(90);
        }, Button);
        // 进店逛逛
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 立即购买
            Button.createWithLabel('立即购买');
            Button.debugLine("entry/src/main/ets/pages/GoodsDetailPage.ets(580:7)", "entry");
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
