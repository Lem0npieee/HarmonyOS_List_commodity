if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NotificationComponent_Params {
    text?: string;
    visible?: boolean;
    hideTimer?: number | null;
    listener?: (msg: string, duration?: number) => void;
}
import NotificationStore from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export default class NotificationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__text = new ObservedPropertySimplePU('', this, "text");
        this.__visible = new ObservedPropertySimplePU(false, this, "visible");
        this.hideTimer = null;
        this.listener = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NotificationComponent_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.hideTimer !== undefined) {
            this.hideTimer = params.hideTimer;
        }
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
    }
    updateStateVars(params: NotificationComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __text: ObservedPropertySimplePU<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __visible: ObservedPropertySimplePU<boolean>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private hideTimer: number | null;
    private listener: (msg: string, duration?: number) => void;
    onDestroy() {
        NotificationStore.unsubscribe(this.listener);
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    }
    private show(msg: string, duration: number): void {
        this.text = msg;
        this.visible = true;
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
        this.hideTimer = setTimeout(() => {
            this.visible = false;
            this.hideTimer = null;
        }, duration);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.position({ left: 0, top: 0 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.visible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Center);
                        Column.margin({ top: 12 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.text);
                        Text.fontSize(14);
                        Text.fontColor(Color.White);
                        Text.backgroundColor('#333333');
                        Text.padding({ left: 14, right: 14, top: 8, bottom: 8 });
                        Text.borderRadius(20);
                        Text.maxLines(2);
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    Column.pop();
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
