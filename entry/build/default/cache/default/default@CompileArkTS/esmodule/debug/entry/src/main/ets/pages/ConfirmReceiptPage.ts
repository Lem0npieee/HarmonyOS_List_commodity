if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConfirmReceiptPage_Params {
    orderListener?: () => void;
    pendingItems?: GoodsListItemType[];
}
import router from "@ohos:router";
import prompt from "@ohos:prompt";
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import type { GoodsListItemType } from '../viewmodel/InitialData';
export default class ConfirmReceiptPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.orderListener = undefined;
        this.__pendingItems = new ObservedPropertyObjectPU(OrderStore.getPendingReceiveItems(), this, "pendingItems");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConfirmReceiptPage_Params) {
        if (params.orderListener !== undefined) {
            this.orderListener = params.orderListener;
        }
        if (params.pendingItems !== undefined) {
            this.pendingItems = params.pendingItems;
        }
    }
    updateStateVars(params: ConfirmReceiptPage_Params) {
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
    onDestroy() {
        OrderStore.unsubscribe(this.orderListener);
    }
    private confirmReceipt(goodsId: number): void {
        try {
            OrderStore.confirmReceived(goodsId);
            this.pendingItems = OrderStore.getPendingReceiveItems();
            prompt.showToast({ message: '确认收货成功', duration: 1500 });
        }
        catch (err) {
            console.error('确认收货失败:', String(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
            Text.create('确认收货');
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
                        Image.create({ "id": 16777319, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Image.width(80);
                        Image.height(80);
                        Image.margin({ bottom: 12 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('当前没有待收货的商品');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
                                        Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.maxLines(2);
                                        Text.textAlign(TextAlign.Start);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        Text.width('100%');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('¥' + product.price.toFixed(0));
                                        Text.fontSize(18);
                                        Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('配送状态：已到货');
                                        Text.fontSize(12);
                                        Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel('确认收货');
                                        Button.fontSize(13);
                                        Button.fontColor(Color.White);
                                        Button.backgroundColor('#FF6600');
                                        Button.borderRadius(16);
                                        Button.padding({ left: 12, right: 12 });
                                        Button.height(36);
                                        Button.onClick(() => this.confirmReceipt(product.id));
                                    }, Button);
                                    Button.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.color({ "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
        return "ConfirmReceiptPage";
    }
}
registerNamedRoute(() => new ConfirmReceiptPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/ConfirmReceiptPage", pageFullPath: "entry/src/main/ets/pages/ConfirmReceiptPage", integratedHsp: "false", moduleType: "followWithHap" });
