if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListIndex_Params {
    selectedBottomIndex?: number;
}
import TabBar from "@bundle:com.example.list_harmony/entry/ets/view/TabBarsComponent";
import CartPage from "@bundle:com.example.list_harmony/entry/ets/pages/CartPage";
import ProfilePage from "@bundle:com.example.list_harmony/entry/ets/pages/ProfilePage";
import NotificationComponent from "@bundle:com.example.list_harmony/entry/ets/view/NotificationComponent";
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import AuthStore from "@bundle:com.example.list_harmony/entry/ets/common/AuthStore";
import router from "@ohos:router";
class ListIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedBottomIndex = new ObservedPropertySimplePU(0, this, "selectedBottomIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListIndex_Params) {
        if (params.selectedBottomIndex !== undefined) {
            this.selectedBottomIndex = params.selectedBottomIndex;
        }
    }
    updateStateVars(params: ListIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedBottomIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedBottomIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedBottomIndex: ObservedPropertySimplePU<number>;
    get selectedBottomIndex() {
        return this.__selectedBottomIndex.get();
    }
    set selectedBottomIndex(newValue: number) {
        this.__selectedBottomIndex.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.height(LAYOUT_WIDTH_OR_HEIGHT);
            Stack.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Stack.padding({
                top: AppStorage.get<number>('statusBarHeight')
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ListIndex", isUserCreateStack: false });
            Navigation.size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT });
            Navigation.title(STORE);
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 根据底部选中序号切换主体内容（页面内切换，不 pushUrl）
            if (this.selectedBottomIndex === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TabBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListIndex.ets", line: 34, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "TabBar" });
                    }
                    __Common__.pop();
                });
            }
            else if (this.selectedBottomIndex === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CartPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListIndex.ets", line: 37, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CartPage" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ProfilePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListIndex.ets", line: 40, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ProfilePage" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
            Row.create();
            // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
            Row.height(64);
            // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
            Row.backgroundColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
            Row.border({ width: 1, color: { "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 首页
            Column.create();
            // 首页
            Column.alignItems(HorizontalAlign.Center);
            // 首页
            Column.justifyContent(FlexAlign.Center);
            // 首页
            Column.layoutWeight(1);
            // 首页
            Column.onClick(() => {
                this.selectedBottomIndex = 0;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777349, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('首页');
            Text.fontSize(12);
            Text.fontColor(this.selectedBottomIndex === 0 ? Color.Black : { "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 首页
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 购物车
            Column.create();
            // 购物车
            Column.alignItems(HorizontalAlign.Center);
            // 购物车
            Column.justifyContent(FlexAlign.Center);
            // 购物车
            Column.layoutWeight(1);
            // 购物车
            Column.onClick(() => {
                try {
                    if (AuthStore.isLoggedIn()) {
                        this.selectedBottomIndex = 1;
                    }
                    else {
                        router.pushUrl({ url: 'pages/LoginRegisterPage' });
                    }
                }
                catch (err) {
                    console.error('跳转登录注册页面失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777348, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('购物车');
            Text.fontSize(12);
            Text.fontColor(this.selectedBottomIndex === 1 ? Color.Black : { "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 购物车
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的
            Column.create();
            // 我的
            Column.alignItems(HorizontalAlign.Center);
            // 我的
            Column.justifyContent(FlexAlign.Center);
            // 我的
            Column.layoutWeight(1);
            // 我的
            Column.onClick(() => {
                if (AuthStore.isLoggedIn()) {
                    this.selectedBottomIndex = 2;
                }
                else {
                    try {
                        router.pushUrl({ url: 'pages/LoginRegisterPage' });
                    }
                    catch (err) {
                        console.error('跳转登录注册页面失败:', String(err));
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777352, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的');
            Text.fontSize(12);
            Text.fontColor(this.selectedBottomIndex === 2 ? Color.Black : { "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 我的
        Column.pop();
        // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
        Row.pop();
        Column.pop();
        Navigation.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 全局通知气泡（位于导航之上）
                    NotificationComponent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListIndex.ets", line: 122, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "NotificationComponent" });
        }
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ListIndex";
    }
}
registerNamedRoute(() => new ListIndex(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/ListIndex", pageFullPath: "entry/src/main/ets/pages/ListIndex", integratedHsp: "false", moduleType: "followWithHap" });
