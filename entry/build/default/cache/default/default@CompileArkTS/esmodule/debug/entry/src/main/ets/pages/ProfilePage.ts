if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    touchStartMap?: Map<number, number>;
    favorites?: FavoriteItem[];
    pendingShipCount?: number;
    pendingReceiveCount?: number;
    pendingReviewCount?: number;
    loggedIn?: boolean;
    username?: string;
    pointsBalance?: number;
    orderListener?: () => void;
    favoritesListener?: () => void;
    reviewListener?: () => void;
    authListener?: () => void;
    pointsListener?: () => void;
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import FavoritesStore from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import type { FavoriteItem } from "@bundle:com.example.list_harmony/entry/ets/common/FavoritesStore";
import OrderStore from "@bundle:com.example.list_harmony/entry/ets/common/OrderStore";
import ReviewStore from "@bundle:com.example.list_harmony/entry/ets/common/ReviewStore";
import AuthStore from "@bundle:com.example.list_harmony/entry/ets/common/AuthStore";
import PointsStore from "@bundle:com.example.list_harmony/entry/ets/common/PointsStore";
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
        this.__loggedIn = new ObservedPropertySimplePU(AuthStore.isLoggedIn(), this, "loggedIn");
        this.__username = new ObservedPropertySimplePU(AuthStore.getCurrentUserName() || '未登录', this, "username");
        this.__pointsBalance = new ObservedPropertySimplePU(PointsStore.getPoints(), this, "pointsBalance");
        this.orderListener = undefined;
        this.favoritesListener = undefined;
        this.reviewListener = undefined;
        this.authListener = undefined;
        this.pointsListener = undefined;
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
        if (params.loggedIn !== undefined) {
            this.loggedIn = params.loggedIn;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.pointsBalance !== undefined) {
            this.pointsBalance = params.pointsBalance;
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
        if (params.authListener !== undefined) {
            this.authListener = params.authListener;
        }
        if (params.pointsListener !== undefined) {
            this.pointsListener = params.pointsListener;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__favorites.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingShipCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingReceiveCount.purgeDependencyOnElmtId(rmElmtId);
        this.__pendingReviewCount.purgeDependencyOnElmtId(rmElmtId);
        this.__loggedIn.purgeDependencyOnElmtId(rmElmtId);
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__pointsBalance.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__favorites.aboutToBeDeleted();
        this.__pendingShipCount.aboutToBeDeleted();
        this.__pendingReceiveCount.aboutToBeDeleted();
        this.__pendingReviewCount.aboutToBeDeleted();
        this.__loggedIn.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__pointsBalance.aboutToBeDeleted();
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
    private __loggedIn: ObservedPropertySimplePU<boolean>;
    get loggedIn() {
        return this.__loggedIn.get();
    }
    set loggedIn(newValue: boolean) {
        this.__loggedIn.set(newValue);
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __pointsBalance: ObservedPropertySimplePU<number>;
    get pointsBalance() {
        return this.__pointsBalance.get();
    }
    set pointsBalance(newValue: number) {
        this.__pointsBalance.set(newValue);
    }
    private orderListener: () => void;
    private favoritesListener: () => void;
    private reviewListener: () => void;
    private authListener: () => void;
    private pointsListener: () => void;
    private refreshCounts(): void {
        try {
            this.pendingShipCount = OrderStore.getPendingShipCount();
            this.pendingReceiveCount = OrderStore.getPendingReceiveCount();
            this.pendingReviewCount = ReviewStore.getPendingReviewCount();
        }
        catch (err) {
            console.error('刷新红点计数失败:', String(err));
        }
    }
    aboutToAppear() {
        // 返回“我的”时同步刷新一次红点计数
        OrderStore.syncCountsFromStatuses();
        this.refreshCounts();
    }
    onPageShow() {
        // 防止某些返回路径不触发 aboutToAppear，二次兜底刷新
        OrderStore.syncCountsFromStatuses();
        this.refreshCounts();
    }
    onDestroy() {
        FavoritesStore.unsubscribe(this.favoritesListener);
        OrderStore.unsubscribe(this.orderListener);
        ReviewStore.unsubscribe(this.reviewListener);
        AuthStore.unsubscribe(this.authListener);
        PointsStore.unsubscribe(this.pointsListener);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.layoutWeight(1);
            Column.padding({ top: AppStorage.get<number>('statusBarHeight') });
            Column.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部用户信息卡
            Column.create({ space: 20 });
            // 顶部用户信息卡
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 顶部用户信息卡
            Column.backgroundColor(Color.White);
            // 顶部用户信息卡
            Column.padding({ left: 20, right: 20, top: 20, bottom: 20 });
            // 顶部用户信息卡
            Column.borderRadius(24);
            // 顶部用户信息卡
            Column.margin({ left: 12, right: 12, top: 8 });
            // 顶部用户信息卡
            Column.shadow({ color: '#1F000000', radius: 12, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777325, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(68);
            Image.height(68);
            Image.borderRadius(34);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.username);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loggedIn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('黄金会员');
                        Text.fontSize(12);
                        Text.fontColor('#B35C00');
                        Text.backgroundColor('#FFE4C4');
                        Text.borderRadius(8);
                        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.loggedIn ? '欢迎回来，祝您购物愉快' : '登录后可同步收藏与订单进度');
            Text.fontSize(13);
            Text.fontColor('#5F5F5F');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loggedIn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('退出登录');
                        Button.height(34);
                        Button.backgroundColor('#FF7A00');
                        Button.fontColor(Color.White);
                        Button.padding({ left: 12, right: 12 });
                        Button.borderRadius(16);
                        Button.onClick(() => this.handleLogout());
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('登录/注册');
                        Button.height(34);
                        Button.backgroundColor('#FF7A00');
                        Button.fontColor(Color.White);
                        Button.padding({ left: 12, right: 12 });
                        Button.borderRadius(16);
                        Button.onClick(() => this.gotoLogin());
                    }, Button);
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.renderUserStat.bind(this)('收藏', `${this.favorites.length}`, '#FFF4EC');
        this.renderUserStat.bind(this)('待收货', `${this.pendingReceiveCount}`, '#ECF2FF');
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.renderUserStat.bind(this)('待评价', `${this.pendingReviewCount}`, '#FDF1FF');
        this.renderUserStat.bind(this)('积分', this.pointsBalance.toFixed(1), '#FFF8E1');
        Row.pop();
        Column.pop();
        // 顶部用户信息卡
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.create();
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.width(LAYOUT_WIDTH_OR_HEIGHT);
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.height(100);
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.padding({ left: 8, right: 8 });
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.backgroundColor(Color.White);
            // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
            Row.margin({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777317, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
            Image.create({ "id": 16777316, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777319, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
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
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777318, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pendingReviewCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.pendingReviewCount > 99 ? '99+' : `${this.pendingReviewCount}`);
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
            Text.fontSize(12);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.layoutWeight(1);
            Column.onClick(() => this.gotoPointsMall());
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777358, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(36);
            Image.height(36);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('积分商城');
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
            Text.padding({ left: 16, top: 16, bottom: 8 });
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
                                if (!AuthStore.isLoggedIn()) {
                                    router.pushUrl({ url: 'pages/LoginRegisterPage' });
                                    return;
                                }
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
                            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.maxLines(2);
                            Text.textAlign(TextAlign.Start);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`¥${entry.product.price.toFixed(0)}`);
                            Text.fontSize(18);
                            Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Bold);
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
            this.forEachUpdateFunction(elmtId, this.favorites, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 收藏列表（复用购物车样式）
        List.pop();
        Column.pop();
    }
    private async handleLogout(): Promise<void> {
        try {
            await AuthStore.logout();
            prompt.showToast({ message: '已退出登录', duration: 1200 });
            router.pushUrl({ url: 'pages/LoginRegisterPage' });
        }
        catch (err) {
            console.error('退出登录失败:', String(err));
            prompt.showToast({ message: '退出失败，请稍后重试', duration: 1200 });
        }
    }
    private gotoLogin(): void {
        try {
            router.pushUrl({ url: 'pages/LoginRegisterPage' });
        }
        catch (err) {
            console.error('跳转登录失败:', String(err));
        }
    }
    private renderUserStat(label: string, value: string, bgColor: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.padding({ top: 8, bottom: 8 });
            Column.backgroundColor(bgColor);
            Column.borderRadius(14);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1F1F1F');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#7A7A7A');
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private gotoPointsMall(): void {
        try {
            router.pushUrl({ url: 'pages/PointsMallPage' });
        }
        catch (err) {
            console.error('跳转积分商城失败:', String(err));
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
