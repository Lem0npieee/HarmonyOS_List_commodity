if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CartPage_Params {
    cartListener?: () => void;
    items?: CartItem[];
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import CartStore from "@bundle:com.example.list_harmony/entry/ets/common/CartStore";
import type { CartItem } from "@bundle:com.example.list_harmony/entry/ets/common/CartStore";
export default class CartPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.cartListener = undefined;
        this.__items = new ObservedPropertyObjectPU(CartStore.getItems(), this, "items");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CartPage_Params) {
        if (params.cartListener !== undefined) {
            this.cartListener = params.cartListener;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    updateStateVars(params: CartPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__items.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private cartListener: () => void;
    private __items: ObservedPropertyObjectPU<CartItem[]>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: CartItem[]) {
        this.__items.set(newValue);
    }
    onDestroy() {
        CartStore.unsubscribe(this.cartListener);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('购物车');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.padding({ top: 8, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.items.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('购物车为空');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.padding({ left: 16, right: 16 });
                    }, Text);
                    Text.pop();
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
                            const entry = _item;
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
                                        Image.create(entry.product.cover);
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
                                        Text.create(entry.product.title);
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
                                        Text.create('¥' + entry.product.price.toFixed(0));
                                        Text.fontSize(18);
                                        Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                        Text.fontWeight(FontWeight.Bold);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('数量: ' + entry.quantity);
                                        Text.fontSize(12);
                                        Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
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
                        this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, undefined, true, false);
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
}
