if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BannerComponent_Params {
    banner?: BannerMeta;
    controller?: SwiperController;
}
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import type { BannerMeta } from '../viewmodel/InitialData';
export default class BannerComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.banner = {
            primary: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: []
        };
        this.controller = new SwiperController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BannerComponent_Params) {
        if (params.banner !== undefined) {
            this.banner = params.banner;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: BannerComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private banner: BannerMeta;
    private controller: SwiperController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.controller);
            Swiper.indicator(true);
            Swiper.autoPlay(true);
            Swiper.interval(4000);
            Swiper.height(180);
            Swiper.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Swiper.margin({ bottom: 12 });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const image = _item;
                this.bannerSlide.bind(this)(image);
            };
            this.forEachUpdateFunction(elmtId, this.banner.images, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    private bannerSlide(image: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(image);
            Image.objectFit(ImageFit.Cover);
            Image.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Image.height(180);
            Image.borderRadius(20);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(24);
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(180);
            Column.justifyContent(FlexAlign.End);
            Column.backgroundColor('#44000000');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.banner.primary);
            Text.fontSize(commonConst.BIGGER_FONT_SIZE);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.banner.secondary);
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            Text.fontColor(Color.White);
            Text.opacity(0.85);
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
