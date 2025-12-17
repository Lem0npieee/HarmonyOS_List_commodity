if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CartPage_Params {
    cartListener?: () => void;
    items?: CartItem[];
    multiSelectMode?: boolean;
    selectedIds?: number[];
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import CartStore from "@bundle:com.example.list_harmony/entry/ets/common/CartStore";
import type { CartItem } from "@bundle:com.example.list_harmony/entry/ets/common/CartStore";
import type { GoodsListItemType } from '../viewmodel/InitialData';
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import PointsStore from "@bundle:com.example.list_harmony/entry/ets/common/PointsStore";
import NotificationStore from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import type { NotificationPayload } from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import prompt from "@ohos:prompt";
import type { PointsGoodsItem } from '../viewmodel/PointsGoodsData';
import router from "@ohos:router";
interface PointsInfo {
    pointsMode: boolean;
    cost: number;
}
export default class CartPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.cartListener = undefined;
        this.__items = new ObservedPropertyObjectPU(CartStore.getItems(), this, "items");
        this.__multiSelectMode = new ObservedPropertySimplePU(true, this, "multiSelectMode");
        this.__selectedIds = new ObservedPropertyObjectPU([], this, "selectedIds");
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
        if (params.multiSelectMode !== undefined) {
            this.multiSelectMode = params.multiSelectMode;
        }
        if (params.selectedIds !== undefined) {
            this.selectedIds = params.selectedIds;
        }
    }
    updateStateVars(params: CartPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__items.purgeDependencyOnElmtId(rmElmtId);
        this.__multiSelectMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIds.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        this.__multiSelectMode.aboutToBeDeleted();
        this.__selectedIds.aboutToBeDeleted();
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
    private __multiSelectMode: ObservedPropertySimplePU<boolean>; // 始终处于多选模式
    get multiSelectMode() {
        return this.__multiSelectMode.get();
    }
    set multiSelectMode(newValue: boolean) {
        this.__multiSelectMode.set(newValue);
    }
    private __selectedIds: ObservedPropertyObjectPU<number[]>;
    get selectedIds() {
        return this.__selectedIds.get();
    }
    set selectedIds(newValue: number[]) {
        this.__selectedIds.set(newValue);
    }
    onDestroy() {
        CartStore.unsubscribe(this.cartListener);
    }
    private toggleSelection(id: number): void {
        const exists: boolean = this.selectedIds.indexOf(id) >= 0;
        this.selectedIds = exists ? this.selectedIds.filter((v: number) => v !== id) : [...this.selectedIds, id];
    }
    private clearSelections(): void {
        this.selectedIds = [];
    }
    private isSelected(id: number): boolean {
        return this.selectedIds.indexOf(id) >= 0;
    }
    private getRedeemPointsInfo(product: GoodsListItemType): PointsInfo {
        const candidate = product as PointsGoodsItem;
        const cost: number = typeof candidate?.redeemPoints === 'number' ? Math.max(0, candidate.redeemPoints) : 0;
        return { pointsMode: cost > 0, cost } as PointsInfo;
    }
    private handleDeleteSelected(): void {
        if (!this.multiSelectMode || this.selectedIds.length === 0) {
            return;
        }
        CartStore.removeByIds(this.selectedIds);
        this.clearSelections();
        this.items = CartStore.getItems();
        prompt.showToast({ message: '已删除选中商品', duration: 1500 });
    }
    private async handlePurchaseSelected(): Promise<void> {
        if (!this.multiSelectMode || this.selectedIds.length === 0) {
            return;
        }
        const selectedItems: CartItem[] = this.items.filter((item: CartItem) => this.selectedIds.indexOf(item.product.id) >= 0);
        if (selectedItems.length === 0) {
            return;
        }
        const processedIds: number[] = [];
        for (const entry of selectedItems) {
            const product: GoodsListItemType = entry.product;
            const pointsInfo = this.getRedeemPointsInfo(product);
            const pointsMode: boolean = pointsInfo.pointsMode;
            const cost: number = pointsInfo.cost;
            if (pointsMode) {
                const ok: boolean = await PointsStore.spendPoints(cost);
                if (!ok) {
                    prompt.showToast({ message: '积分不足，跳过: ' + product.title, duration: 1500 });
                    continue;
                }
            }
            OrderStore.addOrderPendingShip(product.id);
            if (!pointsMode) {
                const earnedPoints: number = Math.round((product.price / 10) * 10) / 10;
                if (earnedPoints > 0) {
                    await PointsStore.addPoints(earnedPoints);
                }
            }
            this.scheduleOrderLifecycle(product.id, product.title);
            processedIds.push(product.id);
        }
        if (processedIds.length > 0) {
            CartStore.removeByIds(processedIds);
            prompt.showToast({ message: '购买成功，已下单', duration: 1500 });
        }
        this.clearSelections();
        this.items = CartStore.getItems();
    }
    private scheduleOrderLifecycle(goodsId: number, goodsTitle?: Resource): void {
        setTimeout(() => {
            try {
                if (goodsTitle) {
                    const payload: NotificationPayload = { resource: goodsTitle, suffix: ' 现已发货' } as NotificationPayload;
                    NotificationStore.show(payload, 5000);
                }
                else {
                    NotificationStore.show('商品已发货', 5000);
                }
                OrderStore.markShipped(goodsId);
                prompt.showToast({ message: '您购买的商品已发货', duration: 2000 });
            }
            catch (e) {
                console.error('发货通知失败:', String(e));
            }
        }, 3000);
        setTimeout(() => {
            try {
                if (goodsTitle) {
                    const payload2: NotificationPayload = { resource: goodsTitle, suffix: ' 现已到货，请注意查收' } as NotificationPayload;
                    NotificationStore.show(payload2, 5000);
                }
                else {
                    NotificationStore.show('商品已到货', 5000);
                }
                OrderStore.markArrived(goodsId);
                prompt.showToast({ message: '您购买的商品已到货，请注意查收', duration: 2000 });
            }
            catch (e) {
                console.error('到货通知失败:', String(e));
            }
        }, 8000);
    }
    private openDetail(product: GoodsListItemType): void {
        try {
            router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: product } });
        }
        catch (err) {
            console.error('跳转商品详情失败:', String(err));
        }
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
            Row.create();
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('购物车');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
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
                                        Row.onClick(() => this.openDetail(entry.product));
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create({ name: 'select-' + entry.product.id });
                                        Checkbox.size({ width: 24, height: 24 });
                                        Checkbox.select(this.isSelected(entry.product.id));
                                        Checkbox.onChange(() => this.toggleSelection(entry.product.id));
                                        Checkbox.margin({ right: 8 });
                                    }, Checkbox);
                                    Checkbox.pop();
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.items.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 12 });
                        Row.padding({ left: 16, right: 16, top: 8, bottom: 12 });
                        Row.width(LAYOUT_WIDTH_OR_HEIGHT);
                        Row.backgroundColor(Color.White);
                        Row.shadow({ radius: 8, color: '#10000000', offsetY: -2 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('删除');
                        Button.fontSize(14);
                        Button.fontColor(Color.White);
                        Button.backgroundColor('#FF3B30');
                        Button.borderRadius(18);
                        Button.height(40);
                        Button.layoutWeight(1);
                        Button.onClick(() => this.handleDeleteSelected());
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('购买');
                        Button.fontSize(14);
                        Button.fontColor(Color.White);
                        Button.backgroundColor('#FF6600');
                        Button.borderRadius(18);
                        Button.height(40);
                        Button.layoutWeight(1);
                        Button.onClick(async () => await this.handlePurchaseSelected());
                    }, Button);
                    Button.pop();
                    Row.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
}
