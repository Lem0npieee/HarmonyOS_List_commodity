if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PendingReviewPage_Params {
    reviewListener?: () => void;
    pendingItems?: GoodsListItemType[];
    showEditor?: boolean;
    editingGoods?: GoodsListItemType | null;
    currentRating?: number;
    reviewContent?: string;
}
import router from "@ohos:router";
import prompt from "@ohos:prompt";
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import ReviewStore from "@bundle:com.example.list_harmony/entry/ets/common/ReviewStore";
import type { GoodsListItemType } from '../viewmodel/InitialData';
export default class PendingReviewPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.reviewListener = undefined;
        this.__pendingItems = new ObservedPropertyObjectPU(ReviewStore.getPendingReviewItems(), this, "pendingItems");
        this.__showEditor = new ObservedPropertySimplePU(false, this, "showEditor");
        this.__editingGoods = new ObservedPropertyObjectPU(null, this, "editingGoods");
        this.__currentRating = new ObservedPropertySimplePU(5, this, "currentRating");
        this.__reviewContent = new ObservedPropertySimplePU('', this, "reviewContent");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PendingReviewPage_Params) {
        if (params.reviewListener !== undefined) {
            this.reviewListener = params.reviewListener;
        }
        if (params.pendingItems !== undefined) {
            this.pendingItems = params.pendingItems;
        }
        if (params.showEditor !== undefined) {
            this.showEditor = params.showEditor;
        }
        if (params.editingGoods !== undefined) {
            this.editingGoods = params.editingGoods;
        }
        if (params.currentRating !== undefined) {
            this.currentRating = params.currentRating;
        }
        if (params.reviewContent !== undefined) {
            this.reviewContent = params.reviewContent;
        }
    }
    updateStateVars(params: PendingReviewPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pendingItems.purgeDependencyOnElmtId(rmElmtId);
        this.__showEditor.purgeDependencyOnElmtId(rmElmtId);
        this.__editingGoods.purgeDependencyOnElmtId(rmElmtId);
        this.__currentRating.purgeDependencyOnElmtId(rmElmtId);
        this.__reviewContent.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pendingItems.aboutToBeDeleted();
        this.__showEditor.aboutToBeDeleted();
        this.__editingGoods.aboutToBeDeleted();
        this.__currentRating.aboutToBeDeleted();
        this.__reviewContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private reviewListener: () => void;
    private __pendingItems: ObservedPropertyObjectPU<GoodsListItemType[]>;
    get pendingItems() {
        return this.__pendingItems.get();
    }
    set pendingItems(newValue: GoodsListItemType[]) {
        this.__pendingItems.set(newValue);
    }
    private __showEditor: ObservedPropertySimplePU<boolean>;
    get showEditor() {
        return this.__showEditor.get();
    }
    set showEditor(newValue: boolean) {
        this.__showEditor.set(newValue);
    }
    private __editingGoods: ObservedPropertyObjectPU<GoodsListItemType | null>;
    get editingGoods() {
        return this.__editingGoods.get();
    }
    set editingGoods(newValue: GoodsListItemType | null) {
        this.__editingGoods.set(newValue);
    }
    private __currentRating: ObservedPropertySimplePU<number>;
    get currentRating() {
        return this.__currentRating.get();
    }
    set currentRating(newValue: number) {
        this.__currentRating.set(newValue);
    }
    private __reviewContent: ObservedPropertySimplePU<string>;
    get reviewContent() {
        return this.__reviewContent.get();
    }
    set reviewContent(newValue: string) {
        this.__reviewContent.set(newValue);
    }
    onDestroy() {
        ReviewStore.unsubscribe(this.reviewListener);
    }
    private openEditor(product: GoodsListItemType): void {
        this.editingGoods = product;
        this.currentRating = 5;
        this.reviewContent = '';
        this.showEditor = true;
    }
    private closeEditor(): void {
        this.showEditor = false;
        this.editingGoods = null;
        this.reviewContent = '';
    }
    private submitReview(): void {
        if (!this.editingGoods) {
            return;
        }
        const success = ReviewStore.submitReview(this.editingGoods, this.currentRating, this.reviewContent, this.editingGoods.specifications?.[0]);
        if (!success) {
            prompt.showToast({ message: '请填写评价内容', duration: 1500 });
            return;
        }
        this.pendingItems = ReviewStore.getPendingReviewItems();
        prompt.showToast({ message: '评价发布成功', duration: 1500 });
        this.closeEditor();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.backgroundColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            Row.height(56);
            Row.alignItems(VerticalAlign.Center);
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
                                        Text.create('¥' + product.price.toFixed(0));
                                        Text.fontSize(18);
                                        Text.fontColor({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('状态：待评价');
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
                                        Button.onClick(() => this.openEditor(product));
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showEditor && this.editingGoods) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.backgroundColor('rgba(0,0,0,0.45)');
                        Column.onClick(() => this.closeEditor());
                    }, Column);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(20);
                        Column.padding(20);
                        Column.alignSelf(ItemAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('撰写评价');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 12 });
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.editingGoods.cover);
                        Image.width(64);
                        Image.height(64);
                        Image.borderRadius(8);
                        Image.objectFit(ImageFit.Cover);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.editingGoods.title);
                        Text.fontSize(15);
                        Text.fontColor('#333333');
                        Text.maxLines(2);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.editingGoods.specifications && this.editingGoods.specifications.length > 0 ? this.editingGoods.specifications[0] : '默认规格');
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.margin({ top: 16 });
                        Row.alignItems(VerticalAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('评分:');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const star = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(star <= this.currentRating ? { "id": 16777330, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                Image.width(24);
                                Image.height(24);
                                Image.onClick(() => {
                                    this.currentRating = star;
                                });
                            }, Image);
                        };
                        this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextArea.create({ text: this.reviewContent, placeholder: '写下你的真实体验吧~' });
                        TextArea.width('100%');
                        TextArea.height(140);
                        TextArea.maxLength(200);
                        TextArea.padding(12);
                        TextArea.backgroundColor('#F5F5F5');
                        TextArea.borderRadius(8);
                        TextArea.margin({ top: 16 });
                        TextArea.onChange((value: string) => {
                            this.reviewContent = value;
                        });
                    }, TextArea);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 12 });
                        Row.width('100%');
                        Row.margin({ top: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.fontSize(14);
                        Button.fontColor('#666666');
                        Button.backgroundColor('#EDEDED');
                        Button.borderRadius(20);
                        Button.height(40);
                        Button.layoutWeight(1);
                        Button.onClick(() => this.closeEditor());
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('发布评价');
                        Button.fontSize(14);
                        Button.fontColor(Color.White);
                        Button.backgroundColor('#FF6600');
                        Button.borderRadius(20);
                        Button.height(40);
                        Button.layoutWeight(1);
                        Button.onClick(() => this.submitReview());
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PendingReviewPage";
    }
}
registerNamedRoute(() => new PendingReviewPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/PendingReviewPage", pageFullPath: "entry/src/main/ets/pages/PendingReviewPage", integratedHsp: "false", moduleType: "followWithHap" });
