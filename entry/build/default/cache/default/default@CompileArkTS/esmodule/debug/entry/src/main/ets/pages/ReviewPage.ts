if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ReviewPage_Params {
    orderListener?: () => void;
    pendingItems?: GoodsListItemType[];
    dialogController?: CustomDialogController | null;
}
interface ReviewDialog_Params {
    rating?: number;
    content?: string;
    goods?: GoodsListItemType;
    controller?: CustomDialogController;
}
import router from "@ohos:router";
import prompt from "@ohos:prompt";
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import ReviewStore, { ReviewItem } from "@bundle:com.example.list_harmony/entry/ets/common/ReviewStore";
import type { GoodsListItemType } from '../viewmodel/InitialData';
class ReviewDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__rating = new ObservedPropertySimplePU(0, this, "rating");
        this.__content = new ObservedPropertySimplePU('', this, "content");
        this.__goods = new SynchedPropertyObjectOneWayPU(params.goods, this, "goods");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ReviewDialog_Params) {
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.goods === undefined) {
            this.__goods.set({} as GoodsListItemType);
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: ReviewDialog_Params) {
        this.__goods.reset(params.goods);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__rating.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__goods.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__rating.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__goods.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __rating: ObservedPropertySimplePU<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __goods: SynchedPropertySimpleOneWayPU<GoodsListItemType>;
    get goods() {
        return this.__goods.get();
    }
    set goods(newValue: GoodsListItemType) {
        this.__goods.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(320);
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评价商品');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.goods.cover);
            Image.width(60);
            Image.height(60);
            Image.borderRadius(8);
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ left: 12 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.goods.title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width(200);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('¥' + this.goods.price.toFixed(2));
            Text.fontSize(16);
            Text.fontColor('#FF0000');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星星评分
            Row.create({ space: 4 });
            // 星星评分
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const star = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(star <= this.rating ? { "id": 16777330, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(24);
                    Image.onClick(() => {
                        this.rating = star;
                    });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 星星评分
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评价内容
            TextInput.create({ placeholder: '请写下您的评价...' });
            // 评价内容
            TextInput.width('100%');
            // 评价内容
            TextInput.height(80);
            // 评价内容
            TextInput.backgroundColor('#F5F5F5');
            // 评价内容
            TextInput.borderRadius(8);
            // 评价内容
            TextInput.padding(8);
            // 评价内容
            TextInput.onChange((value: string) => {
                this.content = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.margin({ top: 16 });
            Row.justifyContent(FlexAlign.End);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize(14);
            Button.backgroundColor('#F5F5F5');
            Button.borderRadius(16);
            Button.padding({ left: 20, right: 20, top: 8, bottom: 8 });
            Button.onClick(() => {
                this.controller.close();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发布');
            Button.fontSize(14);
            Button.fontColor(Color.White);
            Button.backgroundColor('#FF6600');
            Button.borderRadius(16);
            Button.padding({ left: 20, right: 20, top: 8, bottom: 8 });
            Button.onClick(() => {
                if (this.rating === 0) {
                    prompt.showToast({ message: '请先选择评分', duration: 1500 });
                    return;
                }
                if (this.content.trim() === '') {
                    prompt.showToast({ message: '请填写评价内容', duration: 1500 });
                    return;
                }
                const specValue: string = this.goods.specifications && this.goods.specifications.length > 0 ? this.goods.specifications[0] : '';
                const review: ReviewItem = new ReviewItem(this.goods.id, '当前用户', '普通会员', this.rating, this.content.trim(), specValue);
                ReviewStore.addReview(review);
                OrderStore.markReviewed(this.goods.id);
                prompt.showToast({ message: '评价发布成功', duration: 1500 });
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export default class ReviewPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.orderListener = undefined;
        this.__pendingItems = new ObservedPropertyObjectPU(OrderStore.getPendingReviewItems(), this, "pendingItems");
        this.dialogController = null;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ReviewPage_Params) {
        if (params.orderListener !== undefined) {
            this.orderListener = params.orderListener;
        }
        if (params.pendingItems !== undefined) {
            this.pendingItems = params.pendingItems;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: ReviewPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pendingItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pendingItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private orderListener: () => void;
    private __pendingItems: ObservedPropertyObjectPU<GoodsListItemType[]>;
    get pendingItems() {
        return this.__pendingItems.get();
    }
    set pendingItems(newValue: GoodsListItemType[]) {
        this.__pendingItems.set(newValue);
    }
    private dialogController: CustomDialogController | null;
    onDestroy() {
        OrderStore.unsubscribe(this.orderListener);
    }
    private showReviewDialog(goods: GoodsListItemType): void {
        this.dialogController = new CustomDialogController({
            builder: (): ReviewDialog => ReviewDialog({ goods: goods })
        }, this);
        this.dialogController.open();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.backgroundColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航
            Row.create();
            // 顶部导航
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 顶部导航
            Row.height(56);
            // 顶部导航
            Row.alignItems(VerticalAlign.Center);
            // 顶部导航
            Row.padding({ left: 12, right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125832663, "type": 40000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.Black);
            Image.onClick(() => router.back());
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待评价');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        // 顶部导航
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pendingItems.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(LAYOUT_WIDTH_OR_HEIGHT);
                        Column.height('80%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777324, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Image.width(80);
                        Image.height(80);
                        Image.margin({ bottom: 12 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('当前没有待评价的商品');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 0 });
                        List.edgeEffect(EdgeEffect.Spring);
                        List.width(LAYOUT_WIDTH_OR_HEIGHT);
                        List.listDirection(Axis.Vertical);
                        List.layoutWeight(1);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index?: number) => {
                            const product = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.margin({ left: 4, right: 4 });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create({ space: 8 });
                                        Row.width(LAYOUT_WIDTH_OR_HEIGHT);
                                        Row.alignItems(VerticalAlign.Center);
                                        Row.padding({ top: 12, bottom: 12 });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(product.cover);
                                        Image.width(112);
                                        Image.height(112);
                                        Image.borderRadius(16);
                                        Image.objectFit(ImageFit.Cover);
                                        Image.draggable(false);
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.layoutWeight(1);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(product.title);
                                        Text.fontSize(16);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.maxLines(2);
                                        Text.textAlign(TextAlign.Start);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        Text.width('100%');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('¥' + product.price.toFixed(2));
                                        Text.fontSize(18);
                                        Text.fontColor({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('配送状态：已到货');
                                        Text.fontSize(12);
                                        Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel('评价');
                                        Button.fontSize(13);
                                        Button.fontColor(Color.White);
                                        Button.backgroundColor('#FF6600');
                                        Button.borderRadius(16);
                                        Button.padding({ left: 12, right: 12 });
                                        Button.height(36);
                                        Button.onClick(() => this.showReviewDialog(product));
                                    }, Button);
                                    Button.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.color({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Divider.opacity(0.6);
                                        Divider.margin({ top: 12 });
                                    }, Divider);
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.pendingItems, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ReviewPage";
    }
}
registerNamedRoute(() => new ReviewPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/ReviewPage", pageFullPath: "entry/src/main/ets/pages/ReviewPage", integratedHsp: "false", moduleType: "followWithHap" });
