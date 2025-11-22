if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    touchStartMap?: Map<number, number>;
    favorites?: FavoriteItem[];
    pendingShipCount?: number;
    pendingReceiveCount?: number;
    orderListener?: () => void;
    favoritesListener?: () => void;
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import FavoritesStore from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import type { FavoriteItem } from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import router from "@ohos:router";
import prompt from "@ohos:prompt";
export default class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.touchStartMap = new Map();
        this.__favorites = new ObservedPropertyObjectPU(FavoritesStore.getItems(), this, "favorites");
        this.__pendingShipCount = new ObservedPropertySimplePU(OrderStore.getPendingShipCount(), this, "pendingShipCount");
        this.__pendingReceiveCount = new ObservedPropertySimplePU(OrderStore.getPendingReceiveCount(), this, "pendingReceiveCount");
        this.orderListener = undefined;
        this.favoritesListener = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
        if (params.touchStartMap !== undefined) {
            this.touchStartMap = params.touchStartMap;
        }
        if (params.favorites !== undefined) {
            this.favorites = params.favorites;
        }
        if (params.pendingShipCount !== undefined) {
            this.pendingShipCount = params.pendingShipCount;
        }
        if (params.pendingReceiveCount !== undefined) {
            this.pendingReceiveCount = params.pendingReceiveCount;
        }
        if (params.orderListener !== undefined) {
            this.orderListener = params.orderListener;
        }
        if (params.favoritesListener !== undefined) {
            this.favoritesListener = params.favoritesListener;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__favorites.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingShipCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingReceiveCount.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__favorites.aboutToBeDeleted();
        this.__pendingShipCount.aboutToBeDeleted();
        this.__pendingReceiveCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private touchStartMap: Map<number, number>;
    private __favorites: ObservedPropertyObjectPU<FavoriteItem[]>;
    get favorites() {
        return this.__favorites.get();
    }
    set favorites(newValue: FavoriteItem[]) {
        this.__favorites.set(newValue);
    }
    private __pendingShipCount: ObservedPropertySimplePU<number>;
    get pendingShipCount() {
        return this.__pendingShipCount.get();
    }
    set pendingShipCount(newValue: number) {
        this.__pendingShipCount.set(newValue);
    }
    private __pendingReceiveCount: ObservedPropertySimplePU<number>;
    get pendingReceiveCount() {
        return this.__pendingReceiveCount.get();
    }
    set pendingReceiveCount(newValue: number) {
        this.__pendingReceiveCount.set(newValue);
    }
    private orderListener: () => void;
    private favoritesListener: () => void;
    onDestroy() {
        FavoritesStore.unsubscribe(this.favoritesListener);
        OrderStore.unsubscribe(this.orderListener);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.padding({ top: AppStorage.get<number>('statusBarHeight') });
            Column.backgroundColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部用户信息卡
            Row.create();
            // 顶部用户信息卡
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 顶部用户信息卡
            Row.height(120);
            // 顶部用户信息卡
            Row.backgroundColor(Color.White);
            // 顶部用户信息卡
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(64);
            Image.height(64);
            Image.borderRadius(32);
            Image.margin({ left: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('tbNick_04ies');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('黄金会员');
            Text.fontSize(12);
            Text.fontColor('#FFB800');
            Text.backgroundColor('#FFF6E0');
            Text.borderRadius(8);
            Text.padding({ left: 6, right: 6 });
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关注店铺');
            Text.fontSize(12);
            Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('地址');
            Text.fontSize(12);
            Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('客服');
            Text.fontSize(12);
            Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        // 顶部用户信息卡
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.create();
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.height(96);
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.padding({ left: 8, right: 8 });
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777323, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待付款');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777322, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 红色数字气泡（仅当数量>0时显示）
            if (this.pendingShipCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingShipCount > 99 ? '99+' : `${this.pendingShipCount}`);
                        Text.fontSize(12);
                        Text.fontColor(Color.White);
                        Text.backgroundColor('#FF3B30');
                        Text.width(this.pendingShipCount > 9 ? 20 : 16);
                        Text.height(16);
                        Text.textAlign(TextAlign.Center);
                        Text.borderRadius(8);
                        Text.position({ left: this.pendingShipCount > 9 ? 22 : 24, top: -6 });
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
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待发货');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777325, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pendingReceiveCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingReceiveCount > 99 ? '99+' : `${this.pendingReceiveCount}`);
                        Text.fontSize(12);
                        Text.fontColor(Color.White);
                        Text.backgroundColor('#FF3B30');
                        Text.width(this.pendingReceiveCount > 9 ? 20 : 16);
                        Text.height(16);
                        Text.textAlign(TextAlign.Center);
                        Text.borderRadius(8);
                        Text.position({ left: this.pendingReceiveCount > 9 ? 22 : 24, top: -6 });
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
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待收货');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777324, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待评价');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777326, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退款/售后');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的收藏 标题
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的收藏');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.padding({ left: 12, top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        // 我的收藏 标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 收藏列表（复用购物车样式）
            List.create({ space: 0 });
            // 收藏列表（复用购物车样式）
            List.edgeEffect(EdgeEffect.Spring);
            // 收藏列表（复用购物车样式）
            List.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 收藏列表（复用购物车样式）
            List.listDirection(Axis.Vertical);
            // 收藏列表（复用购物车样式）
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
                        ListItem.onTouch((event?: TouchEvent) => {
                            try {
                                if (!event)
                                    return;
                                const ttype = (event.type ?? '').toString();
                                if (ttype === 'start' && event.touches && event.touches.length > 0) {
                                    this.touchStartMap.set(entry.product.id, event.touches[0].x ?? 0);
                                }
                                else if (ttype === 'end') {
                                    const startX = this.touchStartMap.get(entry.product.id) ?? 0;
                                    let endX = startX;
                                    if (event.changedTouches && event.changedTouches.length > 0) {
                                        endX = event.changedTouches[0].x ?? startX;
                                    }
                                    // 左滑阈值 40px
                                    if (startX - endX > 40) {
                                        FavoritesStore.remove(entry.product.id);
                                        prompt.showToast({ message: '已取消收藏', duration: 1200 });
                                    }
                                }
                            }
                            catch (err) {
                                console.error('处理滑动删除失败:', String(err));
                            }
                        });
                        ListItem.margin({ left: 4, right: 4 });
                        ListItem.onClick(() => {
                            try {
                                router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: entry.product } });
                            }
                            catch (err) {
                                console.error('跳转收藏商品详情失败:', String(err));
                            }
                        });
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
                            Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.maxLines(2);
                            Text.textAlign(TextAlign.Start);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`¥${entry.product.price.toFixed(0)}`);
                            Text.fontSize(18);
                            Text.fontColor({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        Column.pop();
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
            this.forEachUpdateFunction(elmtId, this.favorites, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 收藏列表（复用购物车样式）
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
