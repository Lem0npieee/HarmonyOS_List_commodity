if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NotificationComponent_Params {
    payload?: NotificationPayload | null;
    visible?: boolean;
    hideTimer?: number | null;
    listener?: (payload: NotificationPayload, duration?: number) => void;
}
import NotificationStore from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import type { NotificationPayload, NotificationPayloadResource } from "@bundle:com.example.list_harmony/entry/ets/common/NotificationStore";
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
export default class NotificationComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__payload = new ObservedPropertyObjectPU(null, this, "payload");
        this.__visible = new ObservedPropertySimplePU(false, this, "visible");
        this.hideTimer = null;
        this.listener = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NotificationComponent_Params) {
        if (params.payload !== undefined) {
            this.payload = params.payload;
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
        this.__payload.purgeDependencyOnElmtId(rmElmtId);
        this.__visible.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__payload.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __payload: ObservedPropertyObjectPU<NotificationPayload | null>;
    get payload() {
        return this.__payload.get();
    }
    set payload(newValue: NotificationPayload | null) {
        this.__payload.set(newValue);
    }
    private __visible: ObservedPropertySimplePU<boolean>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: boolean) {
        this.__visible.set(newValue);
    }
    private hideTimer: number | null;
    private listener: (payload: NotificationPayload, duration?: number) => void;
    onDestroy() {
        NotificationStore.unsubscribe(this.listener);
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    }
    private show(msg: NotificationPayload, duration: number): void {
        this.payload = msg;
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
            Column.debugLine("entry/src/main/ets/view/NotificationComponent.ets(46:5)", "entry");
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.position({ left: 0, top: 0 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.visible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/view/NotificationComponent.ets(48:9)", "entry");
                        Column.padding({ left: 14, right: 14, top: 8, bottom: 8 });
                        Column.backgroundColor('#333333');
                        Column.borderRadius(20);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.margin({ top: 12 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // payload can be a string or { resource, suffix }
                        if (typeof this.payload === 'string') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.payload);
                                    Text.debugLine("entry/src/main/ets/view/NotificationComponent.ets(51:13)", "entry");
                                    Text.fontSize(14);
                                    Text.fontColor(Color.White);
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else if (this.payload && typeof this.payload !== 'string') {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.debugLine("entry/src/main/ets/view/NotificationComponent.ets(56:13)", "entry");
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create((this.payload as NotificationPayloadResource).resource);
                                    Text.debugLine("entry/src/main/ets/view/NotificationComponent.ets(57:15)", "entry");
                                    Text.fontSize(14);
                                    Text.fontColor(Color.White);
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create((this.payload as NotificationPayloadResource).suffix);
                                    Text.debugLine("entry/src/main/ets/view/NotificationComponent.ets(61:15)", "entry");
                                    Text.fontSize(14);
                                    Text.fontColor(Color.White);
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                                Row.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(2, () => {
                            });
                        }
                    }, If);
                    If.pop();
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
