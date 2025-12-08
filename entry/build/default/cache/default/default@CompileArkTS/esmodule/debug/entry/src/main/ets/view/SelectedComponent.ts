if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SelectedComponent_Params {
    subCategories?: SubCategoryMeta[];
    currentSubCategory?: string;
    searchValue?: string;
    sortOption?: SortOption;
    activeFilters?: FilterId[];
    sortOptionMetasData?: SortOptionMeta[];
    filterOptionMetasData?: FilterOptionMeta[];
    onSearchChange?: (value: string) => void;
    onAISearch?: (value: string) => void;
    onSubCategoryChange?: (id: string) => void;
    onSortChange?: (sort: SortOption) => void;
    onFilterToggle?: (filter: FilterId) => void;
    searchPlaceholder?: Resource;
    subCategoryScroller?: Scroller;
}
import * as commonConst from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import { SortOption, sortOptionMetas, filterOptionMetas } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { SubCategoryMeta, FilterId, SortOptionMeta, FilterOptionMeta } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
export default class SelectedComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.subCategories = [];
        this.__currentSubCategory = new ObservedPropertySimplePU('', this, "currentSubCategory");
        this.__searchValue = new ObservedPropertySimplePU('', this, "searchValue");
        this.__sortOption = new ObservedPropertySimplePU(SortOption.Comprehensive, this, "sortOption");
        this.__activeFilters = new ObservedPropertyObjectPU([], this, "activeFilters");
        this.sortOptionMetasData = sortOptionMetas;
        this.filterOptionMetasData = filterOptionMetas;
        this.onSearchChange = () => { };
        this.onAISearch = () => { };
        this.onSubCategoryChange = () => { };
        this.onSortChange = () => { };
        this.onFilterToggle = () => { };
        this.searchPlaceholder = { "id": 16777266, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
        this.subCategoryScroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SelectedComponent_Params) {
        if (params.subCategories !== undefined) {
            this.subCategories = params.subCategories;
        }
        if (params.currentSubCategory !== undefined) {
            this.currentSubCategory = params.currentSubCategory;
        }
        if (params.searchValue !== undefined) {
            this.searchValue = params.searchValue;
        }
        if (params.sortOption !== undefined) {
            this.sortOption = params.sortOption;
        }
        if (params.activeFilters !== undefined) {
            this.activeFilters = params.activeFilters;
        }
        if (params.sortOptionMetasData !== undefined) {
            this.sortOptionMetasData = params.sortOptionMetasData;
        }
        if (params.filterOptionMetasData !== undefined) {
            this.filterOptionMetasData = params.filterOptionMetasData;
        }
        if (params.onSearchChange !== undefined) {
            this.onSearchChange = params.onSearchChange;
        }
        if (params.onAISearch !== undefined) {
            this.onAISearch = params.onAISearch;
        }
        if (params.onSubCategoryChange !== undefined) {
            this.onSubCategoryChange = params.onSubCategoryChange;
        }
        if (params.onSortChange !== undefined) {
            this.onSortChange = params.onSortChange;
        }
        if (params.onFilterToggle !== undefined) {
            this.onFilterToggle = params.onFilterToggle;
        }
        if (params.searchPlaceholder !== undefined) {
            this.searchPlaceholder = params.searchPlaceholder;
        }
        if (params.subCategoryScroller !== undefined) {
            this.subCategoryScroller = params.subCategoryScroller;
        }
    }
    updateStateVars(params: SelectedComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSubCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__searchValue.purgeDependencyOnElmtId(rmElmtId);
        this.__sortOption.purgeDependencyOnElmtId(rmElmtId);
        this.__activeFilters.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSubCategory.aboutToBeDeleted();
        this.__searchValue.aboutToBeDeleted();
        this.__sortOption.aboutToBeDeleted();
        this.__activeFilters.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private subCategories: SubCategoryMeta[];
    private __currentSubCategory: ObservedPropertySimplePU<string>;
    get currentSubCategory() {
        return this.__currentSubCategory.get();
    }
    set currentSubCategory(newValue: string) {
        this.__currentSubCategory.set(newValue);
    }
    private __searchValue: ObservedPropertySimplePU<string>;
    get searchValue() {
        return this.__searchValue.get();
    }
    set searchValue(newValue: string) {
        this.__searchValue.set(newValue);
    }
    private __sortOption: ObservedPropertySimplePU<SortOption>;
    get sortOption() {
        return this.__sortOption.get();
    }
    set sortOption(newValue: SortOption) {
        this.__sortOption.set(newValue);
    }
    private __activeFilters: ObservedPropertyObjectPU<FilterId[]>;
    get activeFilters() {
        return this.__activeFilters.get();
    }
    set activeFilters(newValue: FilterId[]) {
        this.__activeFilters.set(newValue);
    }
    private sortOptionMetasData: SortOptionMeta[];
    private filterOptionMetasData: FilterOptionMeta[];
    private onSearchChange: (value: string) => void;
    private onAISearch: (value: string) => void;
    private onSubCategoryChange: (id: string) => void;
    private onSortChange: (sort: SortOption) => void;
    private onFilterToggle: (filter: FilterId) => void;
    private readonly searchPlaceholder: Resource;
    private readonly subCategoryScroller: Scroller;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Column.padding({
                left: commonConst.GOODS_LIST_PADDING,
                right: commonConst.GOODS_LIST_PADDING,
                top: commonConst.GOODS_LIST_PADDING,
                bottom: commonConst.GOODS_LIST_PADDING
            });
        }, Column);
        this.renderSearchBar.bind(this)();
        this.renderSortOptions.bind(this)();
        this.renderFilterOptions.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.subCategories.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.renderSubCategories.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color({ "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Divider.height(1);
        }, Divider);
        Column.pop();
    }
    private renderSearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({ value: this.searchValue, placeholder: this.searchPlaceholder });
            Search.searchButton('搜索');
            Search.border({ width: 1, color: { "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
            Search.height(40);
            Search.layoutWeight(1);
            Search.backgroundColor(Color.White);
            Search.onSubmit((value: string) => {
                this.searchValue = value;
                this.onSearchChange(value);
            });
            Search.onChange((value: string) => {
                // 仅更新本地输入值，避免实时触发父组件搜索
                this.searchValue = value;
            });
        }, Search);
        Search.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('AI搜索');
            Button.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Button.margin({ left: 8 });
            Button.height(40);
            Button.padding({ left: 12, right: 12 });
            Button.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.borderRadius(8);
            Button.onClick(() => {
                // 点击 AI 搜索时，调用父组件提供的回调
                this.onAISearch(this.searchValue);
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    private renderSubCategories(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Row.justifyContent(FlexAlign.Start);
            Row.margin({ top: 6, bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('子分类');
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.subCategoryScroller);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const sub = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(sub.title);
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.backgroundColor(this.currentSubCategory === sub.id ? { "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777305, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.fontColor(this.currentSubCategory === sub.id ? Color.White : { "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.borderRadius(16);
                    Text.onClick(() => {
                        this.currentSubCategory = sub.id;
                        this.onSubCategoryChange(sub.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.subCategories, forEachItemGenFunction, (sub: SubCategoryMeta) => sub.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Row.pop();
    }
    private renderSortOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Row.justifyContent(FlexAlign.Start);
            Row.margin({ top: 6, bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777273, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const option = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(option.title);
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.borderRadius(16);
                    Text.backgroundColor(this.sortOption === option.id ? { "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : Color.Transparent);
                    Text.border({
                        width: 1,
                        color: this.sortOption === option.id ? { "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                    });
                    Text.fontColor(this.sortOption === option.id ? Color.White : { "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.onClick(() => {
                        this.sortOption = option.id;
                        this.onSortChange(option.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.sortOptionMetasData, forEachItemGenFunction, (option: SortOptionMeta) => option.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    private renderFilterOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Row.alignItems(VerticalAlign.Top);
            Row.margin({ top: 6, bottom: 6 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filter.title);
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.borderRadius(16);
                    Text.border({
                        width: 1,
                        color: this.activeFilters.indexOf(filter.id) >= 0 ? { "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                    });
                    Text.backgroundColor(this.activeFilters.indexOf(filter.id) >= 0 ? { "id": 16777305, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : Color.Transparent);
                    Text.fontColor(this.activeFilters.indexOf(filter.id) >= 0 ? { "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => {
                        const index: number = this.activeFilters.indexOf(filter.id);
                        if (index >= 0) {
                            this.activeFilters.splice(index, 1);
                        }
                        else {
                            this.activeFilters.push(filter.id);
                        }
                        this.onFilterToggle(filter.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.filterOptionMetasData, forEachItemGenFunction, (filter: FilterOptionMeta) => filter.id, false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
