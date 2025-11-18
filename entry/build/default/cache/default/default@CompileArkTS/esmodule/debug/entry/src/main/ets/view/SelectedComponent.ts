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
        this.currentSubCategory = '';
        this.searchValue = '';
        this.sortOption = SortOption.Comprehensive;
        this.activeFilters = [];
        this.sortOptionMetasData = sortOptionMetas;
        this.filterOptionMetasData = filterOptionMetas;
        this.onSearchChange = () => { };
        this.onSubCategoryChange = () => { };
        this.onSortChange = () => { };
        this.onFilterToggle = () => { };
        this.searchPlaceholder = { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
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
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private subCategories: SubCategoryMeta[];
    private currentSubCategory: string;
    private searchValue: string;
    private sortOption: SortOption;
    private activeFilters: FilterId[];
    private sortOptionMetasData: SortOptionMeta[];
    private filterOptionMetasData: FilterOptionMeta[];
    private onSearchChange: (value: string) => void;
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
        this.renderSubCategories.bind(this)();
        this.renderSortOptions.bind(this)();
        this.renderFilterOptions.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Divider.height(1);
        }, Divider);
        Column.pop();
    }
    private renderSearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Search.create({ value: this.searchValue, placeholder: this.searchPlaceholder });
            Search.searchButton('Go');
            Search.border({ width: 1, color: { "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } });
            Search.height(40);
            Search.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
            Search.backgroundColor(Color.White);
            Search.onSubmit((value: string) => {
                this.onSearchChange(value);
            });
            Search.onChange((value: string) => {
                this.onSearchChange(value);
            });
        }, Search);
        Search.pop();
    }
    private renderSubCategories(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.subCategoryScroller);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width(commonConst.LAYOUT_WIDTH_OR_HEIGHT);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const sub = _item;
                this.categoryChip.bind(this)(sub);
            };
            this.forEachUpdateFunction(elmtId, this.subCategories, forEachItemGenFunction, (sub: SubCategoryMeta) => sub.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    private categoryChip(sub: SubCategoryMeta, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(sub.title);
            Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.backgroundColor(this.isSubCategoryActive(sub.id) ? { "id": 16777282, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontColor(this.isSubCategoryActive(sub.id) ? Color.White : { "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.borderRadius(16);
            Text.onClick(() => {
                this.onSubCategoryChange(sub.id);
            });
        }, Text);
        Text.pop();
    }
    private renderSortOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.margin({ top: 6, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const option = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(option.title);
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.borderRadius(16);
                    Text.backgroundColor(this.isSortOptionActive(option.id) ? { "id": 16777282, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : Color.Transparent);
                    Text.border({
                        width: 1,
                        color: this.isSortOptionActive(option.id) ? { "id": 16777282, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                    });
                    Text.fontColor(this.isSortOptionActive(option.id) ? Color.White : { "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.onClick(() => {
                        this.onSortChange(option.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.sortOptionMetasData, forEachItemGenFunction, (option: SortOptionMeta) => option.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    private renderFilterOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
            Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.margin({ top: 12, bottom: 4 });
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
                        color: this.isFilterActive(filter.id) ? { "id": 16777282, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }
                    });
                    Text.backgroundColor(this.isFilterActive(filter.id) ? { "id": 16777289, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : Color.Transparent);
                    Text.fontColor(this.isFilterActive(filter.id) ? { "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } : { "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE);
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => {
                        this.onFilterToggle(filter.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.filterOptionMetasData, forEachItemGenFunction, (filter: FilterOptionMeta) => filter.id, false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
    private isSubCategoryActive(id: string): boolean {
        return this.currentSubCategory === id;
    }
    private isSortOptionActive(option: SortOption): boolean {
        return this.sortOption === option;
    }
    private isFilterActive(filter: FilterId): boolean {
        return this.activeFilters.indexOf(filter) >= 0;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
