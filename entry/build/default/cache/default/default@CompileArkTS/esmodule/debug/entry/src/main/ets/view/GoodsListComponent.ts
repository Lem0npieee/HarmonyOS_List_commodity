if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GoodsList_Params {
    dataSource?: ListDataSource;
    onLoadMore?: () => void;
    isEmpty?: boolean;
    showLoading?: boolean;
    emptyListener?: GoodsListEmptyListener;
}
import router from "@ohos:router";
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import { CategoryType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { GoodsListItemType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { ListDataSource } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/ListDataSource";
import type { EmptyListener } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/ListDataSource";
class GoodsListEmptyListener implements EmptyListener {
    private goodsList: GoodsList;
    constructor(goodsList: GoodsList) {
        this.goodsList = goodsList;
    }
    onEmptyChanged(empty: boolean): void {
        this.goodsList.setEmptyState(empty);
    }
}
export default class GoodsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dataSource = new ListDataSource(CategoryType.Featured);
        this.onLoadMore = undefined;
        this.__isEmpty = new ObservedPropertySimplePU(false, this, "isEmpty");
        this.__showLoading = new ObservedPropertySimplePU(false, this, "showLoading");
        this.emptyListener = new GoodsListEmptyListener(this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GoodsList_Params) {
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
        if (params.onLoadMore !== undefined) {
            this.onLoadMore = params.onLoadMore;
        }
        if (params.isEmpty !== undefined) {
            this.isEmpty = params.isEmpty;
        }
        if (params.showLoading !== undefined) {
            this.showLoading = params.showLoading;
        }
        if (params.emptyListener !== undefined) {
            this.emptyListener = params.emptyListener;
        }
    }
    updateStateVars(params: GoodsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isEmpty.purgeDependencyOnElmtId(rmElmtId);
        this.__showLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isEmpty.aboutToBeDeleted();
        this.__showLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dataSource: ListDataSource;
    private onLoadMore?: () => void;
    private __isEmpty: ObservedPropertySimplePU<boolean>;
    get isEmpty() {
        return this.__isEmpty.get();
    }
    set isEmpty(newValue: boolean) {
        this.__isEmpty.set(newValue);
    }
    private __showLoading: ObservedPropertySimplePU<boolean>;
    get showLoading() {
        return this.__showLoading.get();
    }
    set showLoading(newValue: boolean) {
        this.__showLoading.set(newValue);
    }
    private emptyListener: GoodsListEmptyListener;
    setEmptyState(empty: boolean): void {
        this.isEmpty = empty;
    }
    aboutToAppear() {
        this.dataSource.registerEmptyListener(this.emptyListener);
    }
    aboutToDisappear() {
        this.dataSource.unregisterEmptyListener(this.emptyListener);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEmpty) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.renderEmptyState.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 0 });
                        List.edgeEffect(EdgeEffect.Spring);
                        List.width(commonConst.GOODS_LIST_WIDTH);
                        List.listDirection(Axis.Vertical);
                        List.chainAnimation(false);
                    }, List);
                    {
                        const __lazyForEachItemGenFunction = (_item, index?: number) => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(() => { }, false);
                                    ListItem.margin({ left: 4, right: 4 });
                                    ListItem.onAppear(() => {
                                        if (index !== undefined && this.shouldLoadMore(index)) {
                                            this.triggerLoadMore();
                                        }
                                    });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    this.listRow.bind(this)(item, index ?? 0);
                                    ListItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        const __lazyForEachItemIdFunc = (item: GoodsListItemType) => `${item.id}`;
                        LazyForEach.create("1", this, this.dataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                        LazyForEach.pop();
                    }
                    List.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                        Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                        Text.margin({ top: 8 });
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
        Column.pop();
    }
    private shouldLoadMore(index: number): boolean {
        const remaining: number = this.dataSource.totalCount() - index - 1;
        return remaining <= 6;
    }
    private triggerLoadMore(): void {
        if (this.showLoading) {
            return;
        }
        this.showLoading = true;
        if (this.onLoadMore !== undefined) {
            this.onLoadMore();
        }
        setTimeout(() => {
            this.showLoading = false;
        }, 500);
    }
    private renderEmptyState(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(200);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777324, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Image.width(120);
            Image.height(120);
            Image.margin({ bottom: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    private listRow(item: GoodsListItemType, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.margin({ left: 4, right: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Row.alignItems(VerticalAlign.Center);
            Row.padding({ top: 12, bottom: 12 });
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/GoodsDetailPage',
                    params: { goods: item }
                }).catch((err: Error) => {
                    console.error('跳转失败:', err.message);
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.cover);
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
            Text.create(item.title);
            Text.fontSize(commonConst.NORMAL_FONT_SIZE);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(2);
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.description);
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(2);
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
            Text.margin({ top: 4, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.margin({ bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, tagIndex?: number) => {
                const tag = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(tag);
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
                    Text.borderRadius(12);
                    Text.backgroundColor({ "id": 16777305, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, item.tags, forEachItemGenFunction, (tag: Resource, tagIndex?: number) => `${tagIndex ?? 0}`, true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`¥${item.price.toFixed(0)}`);
            Text.fontSize(commonConst.BIGGER_FONT_SIZE);
            Text.fontColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.evaluate);
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color({ "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Divider.opacity(0.6);
            Divider.margin({ top: 12 });
        }, Divider);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
