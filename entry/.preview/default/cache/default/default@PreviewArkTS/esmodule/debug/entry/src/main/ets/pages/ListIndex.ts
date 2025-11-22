if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListIndex_Params {
}
import TabBar from "@bundle:com.example.list_harmony/entry/ets/view/TabBarsComponent";
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import router from "@ohos:router";
class ListIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListIndex_Params) {
    }
    updateStateVars(params: ListIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ListIndex.ets(24:5)", "entry");
            Row.height(LAYOUT_WIDTH_OR_HEIGHT);
            Row.backgroundColor({ "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Row.padding({
                top: AppStorage.get<number>('statusBarHeight')
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ListIndex", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/ListIndex.ets(25:7)", "entry");
            Navigation.size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT });
            Navigation.title(STORE);
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ListIndex.ets(26:9)", "entry");
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 主体 TabBar 占据可伸缩空间
                    TabBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListIndex.ets", line: 28, col: 11 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航栏： 首页 | 购物车 | 我的
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ListIndex.ets(32:11)", "entry");
            // 底部导航栏： 首页 | 购物车 | 我的
            Row.height(64);
            // 底部导航栏： 首页 | 购物车 | 我的
            Row.backgroundColor({ "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            // 底部导航栏： 首页 | 购物车 | 我的
            Row.border({ width: 1, color: { "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 首页
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ListIndex.ets(34:13)", "entry");
            // 首页
            Column.alignItems(FlexAlign.Center);
            // 首页
            Column.justifyContent(FlexAlign.Center);
            // 首页
            Column.layoutWeight(1);
            // 首页
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/ListIndex' });
                }
                catch (err) {
                    console.error('导航首页失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777321, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ListIndex.ets(35:15)", "entry");
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create($r('app.string.home'));
            Text.debugLine("entry/src/main/ets/pages/ListIndex.ets(38:15)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 首页
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 购物车
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ListIndex.ets(54:13)", "entry");
            // 购物车
            Column.alignItems(FlexAlign.Center);
            // 购物车
            Column.justifyContent(FlexAlign.Center);
            // 购物车
            Column.layoutWeight(1);
            // 购物车
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/CartPage' });
                }
                catch (err) {
                    console.error('导航购物车失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777319, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ListIndex.ets(55:15)", "entry");
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('购物车');
            Text.debugLine("entry/src/main/ets/pages/ListIndex.ets(58:15)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 购物车
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ListIndex.ets(74:13)", "entry");
            // 我的
            Column.alignItems(FlexAlign.Center);
            // 我的
            Column.justifyContent(FlexAlign.Center);
            // 我的
            Column.layoutWeight(1);
            // 我的
            Column.onClick(() => {
                try {
                    router.pushUrl({ url: 'pages/ProfilePage' });
                }
                catch (err) {
                    console.error('导航我的失败:', String(err));
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777320, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/ListIndex.ets(75:15)", "entry");
            Image.width(28);
            Image.height(28);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的');
            Text.debugLine("entry/src/main/ets/pages/ListIndex.ets(78:15)", "entry");
            Text.fontSize(12);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        // 我的
        Column.pop();
        // 底部导航栏： 首页 | 购物车 | 我的
        Row.pop();
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ListIndex";
    }
}
registerNamedRoute(() => new ListIndex(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/ListIndex", pageFullPath: "entry/src/main/ets/pages/ListIndex", integratedHsp: "false", moduleType: "followWithHap" });
