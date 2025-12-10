if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PointsMallPage_Params {
    points?: number;
    username?: string;
    pointsListener?: () => void;
    authListener?: () => void;
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import PointsStore from "@bundle:com.example.list_harmony/entry/ets/common/PointsStore";
import AuthStore from "@bundle:com.example.list_harmony/entry/ets/common/AuthStore";
import { pointsGoodsPool } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/PointsGoodsData";
import type { PointsGoodsItem } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/PointsGoodsData";
import router from "@ohos:router";
export default class PointsMallPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__points = new ObservedPropertySimplePU(PointsStore.getPoints(), this, "points");
        this.__username = new ObservedPropertySimplePU(AuthStore.getCurrentUserName() || '未登录', this, "username");
        this.pointsListener = undefined;
        this.authListener = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PointsMallPage_Params) {
        if (params.points !== undefined) {
            this.points = params.points;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.pointsListener !== undefined) {
            this.pointsListener = params.pointsListener;
        }
        if (params.authListener !== undefined) {
            this.authListener = params.authListener;
        }
    }
    updateStateVars(params: PointsMallPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__points.purgeDependencyOnElmtId(rmElmtId);
        this.__username.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__points.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __points: ObservedPropertySimplePU<number>;
    get points() {
        return this.__points.get();
    }
    set points(newValue: number) {
        this.__points.set(newValue);
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private pointsListener?: () => void;
    private authListener?: () => void;
    aboutToAppear() {
        this.pointsListener = () => {
            this.points = PointsStore.getPoints();
        };
        this.authListener = () => {
            const name: string = AuthStore.getCurrentUserName();
            this.username = name && name.length > 0 ? name : '未登录';
        };
        PointsStore.subscribe(this.pointsListener!);
        AuthStore.subscribe(this.authListener!);
    }
    aboutToDisappear() {
        if (this.pointsListener) {
            PointsStore.unsubscribe(this.pointsListener);
            this.pointsListener = undefined;
        }
        if (this.authListener) {
            AuthStore.unsubscribe(this.authListener);
            this.authListener = undefined;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(LAYOUT_WIDTH_OR_HEIGHT);
            List.edgeEffect(EdgeEffect.Spring);
            List.listDirection(Axis.Vertical);
            List.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            List.padding({ bottom: 16, top: AppStorage.get<number>('statusBarHeight') });
        }, List);
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
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.buildHeader.bind(this)();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const item = _item;
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
                        ListItem.margin({ bottom: 12 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.renderGoodsCard.bind(this)(item);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, pointsGoodsPool, forEachItemGenFunction, (item: PointsGoodsItem) => `${item.id}`, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    private buildHeader(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
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
            if (AuthStore.isLoggedIn()) {
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
            Text.create(AuthStore.isLoggedIn() ? '欢迎回来，祝您购物愉快' : '登录后可同步收藏与订单进度');
            Text.fontSize(13);
            Text.fontColor('#5F5F5F');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.points.toFixed(1));
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF7A00');
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('积分');
            Text.fontSize(13);
            Text.fontColor('#999999');
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    private renderGoodsCard(item: PointsGoodsItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 16, right: 16, top: 16, bottom: 16 });
            Column.backgroundColor(Color.White);
            Column.borderRadius(20);
            Column.margin({ left: 16, right: 16 });
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: item } });
                }
                catch (err) {
                    console.error('跳转积分商品详情失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 14 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.cover);
            Image.width(96);
            Image.height(96);
            Image.borderRadius(16);
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.description);
            Text.fontSize(13);
            Text.fontColor('#6B6B6B');
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${item.redeemPoints.toFixed(0)} 积分`);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF7A00');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PointsMallPage";
    }
}
registerNamedRoute(() => new PointsMallPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/PointsMallPage", pageFullPath: "entry/src/main/ets/pages/PointsMallPage", integratedHsp: "false", moduleType: "followWithHap" });
