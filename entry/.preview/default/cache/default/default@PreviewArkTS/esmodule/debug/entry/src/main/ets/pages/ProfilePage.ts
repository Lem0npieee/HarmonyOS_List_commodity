if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
}
import { LAYOUT_WIDTH_OR_HEIGHT } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ProfilePage.ets(10:5)", "entry");
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.padding({ top: AppStorage.get<number>('statusBarHeight') });
            Column.backgroundColor({ "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(11:7)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.padding({ top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('这里是我的页面（空）');
            Text.debugLine("entry/src/main/ets/pages/ProfilePage.ets(15:7)", "entry");
            Text.fontSize(14);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.padding({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProfilePage";
    }
}
registerNamedRoute(() => new ProfilePage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/ProfilePage", pageFullPath: "entry/src/main/ets/pages/ProfilePage", integratedHsp: "false", moduleType: "followWithHap" });
