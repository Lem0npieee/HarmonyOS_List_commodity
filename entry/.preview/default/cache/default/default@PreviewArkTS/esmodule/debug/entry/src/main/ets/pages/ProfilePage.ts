if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    touchStartMap?: Map<number, number>;
    favorites?: FavoriteItem[];
    pendingShipCount?: number;
    pendingReceiveCount?: number;
    pendingReviewCount?: number;
    orderListener?: () => void;
    favoritesListener?: () => void;
    reviewListener?: () => void;
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import FavoritesStore from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import type { FavoriteItem } from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import ReviewStore from "@bundle:com.example.list_harmony/entry/ets/common/ReviewStore";
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
        this.__pendingReviewCount = new ObservedPropertySimplePU(ReviewStore.getPendingReviewCount(), this, "pendingReviewCount");
        this.orderListener = undefined;
        this.favoritesListener = undefined;
        this.reviewListener = undefined;
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
        if (params.pendingReviewCount !== undefined) {
            this.pendingReviewCount = params.pendingReviewCount;
        }
        if (params.orderListener !== undefined) {
            this.orderListener = params.orderListener;
        }
        if (params.favoritesListener !== undefined) {
            this.favoritesListener = params.favoritesListener;
        }
        if (params.reviewListener !== undefined) {
            this.reviewListener = params.reviewListener;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__favorites.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingShipCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingReceiveCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingReviewCount.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__favorites.aboutToBeDeleted();
        this.__pendingShipCount.aboutToBeDeleted();
        this.__pendingReceiveCount.aboutToBeDeleted();
        this.__pendingReviewCount.aboutToBeDeleted();
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
    private __pendingReviewCount: ObservedPropertySimplePU<number>;
    get pendingReviewCount() {
        return this.__pendingReviewCount.get();
    }
    set pendingReviewCount(newValue: number) {
        this.__pendingReviewCount.set(newValue);
    }
    private orderListener: () => void;
    private favoritesListener: () => void;
    private reviewListener: () => void;
    onDestroy() {
        FavoritesStore.unsubscribe(this.favoritesListener);
        OrderStore.unsubscribe(this.orderListener);
        ReviewStore.unsubscribe(this.reviewListener);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(57:5)", "entry");
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.padding({ top: AppStorage.get<number>('statusBarHeight') });
            Column.backgroundColor({ "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部用户信息卡
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(59:7)", "entry");
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
            Image.create({ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(60:9)", "entry");
            Image.width(64);
            Image.height(64);
            Image.borderRadius(32);
            Image.margin({ left: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(66:9)", "entry");
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(67:11)", "entry");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('tbNick_04ies');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(68:13)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('黄金会员');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(72:13)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(82:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关注店铺');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(83:13)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('地址');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(86:13)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('客服');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(89:13)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/ProfilePage.ets(96:9)", "entry");
        }, Blank);
        Blank.pop();
        // 顶部用户信息卡
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(104:7)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(105:9)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777328, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(106:11)", "entry");
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待付款');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(109:11)", "entry");
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(115:9)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/ProfilePage.ets(116:11)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777324, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(117:13)", "entry");
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
                        Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(122:15)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(133:11)", "entry");
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(139:9)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/ConfirmReceiptPage' });
                }
                catch (err) {
                    console.error('跳转待收货页面失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/ProfilePage.ets(140:11)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777323, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(141:13)", "entry");
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pendingReceiveCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingReceiveCount > 99 ? '99+' : `${this.pendingReceiveCount}`);
                        Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(145:15)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(156:11)", "entry");
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(169:9)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/PendingReviewPage' });
                }
                catch (err) {
                    console.error('跳转待评价页面失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/ProfilePage.ets(170:11)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777325, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(171:13)", "entry");
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pendingReviewCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingReviewCount > 99 ? '99+' : `${this.pendingReviewCount}`);
                        Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(175:15)", "entry");
                        Text.fontSize(12);
                        Text.fontColor(Color.White);
                        Text.backgroundColor('#FF3B30');
                        Text.width(this.pendingReviewCount > 9 ? 20 : 16);
                        Text.height(16);
                        Text.textAlign(TextAlign.Center);
                        Text.borderRadius(8);
                        Text.position({ left: this.pendingReviewCount > 9 ? 22 : 24, top: -6 });
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
            Text.create('待评价');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(186:11)", "entry");
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(199:9)", "entry");
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777326, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(200:11)", "entry");
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退款/售后');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(203:11)", "entry");
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的收藏 标题
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(215:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的收藏');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(216:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.padding({ left: 12, top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/ProfilePage.ets(220:9)", "entry");
        }, Blank);
        Blank.pop();
        // 我的收藏 标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 收藏列表（复用购物车样式）
            List.create({ space: 0 });
            List.debugLine("entry/src/main/ets/pages/ProfilePage.ets(224:7)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/pages/ProfilePage.ets(226:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(227:13)", "entry");
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 8 });
                            Row.debugLine("entry/src/main/ets/pages/ProfilePage.ets(228:15)", "entry");
                            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
                            Row.alignItems(VerticalAlign.Center);
                            Row.padding({ top: 12, bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(entry.product.cover);
                            Image.debugLine("entry/src/main/ets/pages/ProfilePage.ets(229:17)", "entry");
                            Image.width(112);
                            Image.height(112);
                            Image.borderRadius(16);
                            Image.objectFit(ImageFit.Cover);
                            Image.draggable(false);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(235:17)", "entry");
                            Column.alignItems(HorizontalAlign.Start);
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(entry.product.title);
                            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(236:19)", "entry");
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Medium);
                            Text.fontColor({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.maxLines(2);
                            Text.textAlign(TextAlign.Start);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`¥${entry.product.price.toFixed(0)}`);
                            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(244:19)", "entry");
                            Text.fontSize(18);
                            Text.fontColor({ "id": 16777287, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Divider.create();
                            Divider.debugLine("entry/src/main/ets/pages/ProfilePage.ets(256:15)", "entry");
                            Divider.color({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
