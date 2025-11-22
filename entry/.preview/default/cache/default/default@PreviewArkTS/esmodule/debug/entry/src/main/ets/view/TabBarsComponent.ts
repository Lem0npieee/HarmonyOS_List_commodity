if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    currentOffsetY?: number;
    canTriggerRefresh?: boolean;
    isRefreshing?: boolean;
    dataSourceCache?: Map<CategoryType, ListDataSource>;
    tabsIndex?: number;
    refreshStatus?: boolean;
    refreshText?: Resource;
    tabStates?: TabUIState[];
}
import { tabBarMeta, SortOption, CategoryType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { TabMeta, FilterId } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { LAYOUT_WIDTH_OR_HEIGHT, NORMAL_FONT_SIZE, BIGGER_FONT_SIZE, MAX_LINES_TEXT, MAX_OFFSET_Y, REFRESH_TIME } from "@bundle:com.example.list_harmony/entry/ets/common/CommonConstants";
import GoodsList from "@bundle:com.example.list_harmony/entry/ets/view/GoodsListComponent";
import PutDownRefresh from "@bundle:com.example.list_harmony/entry/ets/view/PutDownRefreshLayout";
import SelectedComponent from "@bundle:com.example.list_harmony/entry/ets/view/SelectedComponent";
import router from "@ohos:router";
import BannerComponent from "@bundle:com.example.list_harmony/entry/ets/view/BannerComponent";
import { ListDataSource } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/ListDataSource";
import type { ListQueryState } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/ListDataSource";
interface TabUIState {
    search: string;
    subCategory: string;
    sort: SortOption;
    filters: FilterId[];
}
export default class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.currentOffsetY = 0;
        this.canTriggerRefresh = false;
        this.isRefreshing = false;
        this.dataSourceCache = new Map();
        this.__tabsIndex = new ObservedPropertySimplePU(0, this, "tabsIndex");
        this.__refreshStatus = new ObservedPropertySimplePU(false, this, "refreshStatus");
        this.__refreshText = new ObservedPropertyObjectPU({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, this, "refreshText");
        this.__tabStates = new ObservedPropertyObjectPU([], this, "tabStates");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.currentOffsetY !== undefined) {
            this.currentOffsetY = params.currentOffsetY;
        }
        if (params.canTriggerRefresh !== undefined) {
            this.canTriggerRefresh = params.canTriggerRefresh;
        }
        if (params.isRefreshing !== undefined) {
            this.isRefreshing = params.isRefreshing;
        }
        if (params.dataSourceCache !== undefined) {
            this.dataSourceCache = params.dataSourceCache;
        }
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
        if (params.refreshStatus !== undefined) {
            this.refreshStatus = params.refreshStatus;
        }
        if (params.refreshText !== undefined) {
            this.refreshText = params.refreshText;
        }
        if (params.tabStates !== undefined) {
            this.tabStates = params.tabStates;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabsIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshText.purgeDependencyOnElmtId(rmElmtId);
        this.__tabStates.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        this.__refreshStatus.aboutToBeDeleted();
        this.__refreshText.aboutToBeDeleted();
        this.__tabStates.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private currentOffsetY: number;
    private canTriggerRefresh: boolean;
    private isRefreshing: boolean;
    private readonly dataSourceCache: Map<CategoryType, ListDataSource>;
    private __tabsIndex: ObservedPropertySimplePU<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    private __refreshStatus: ObservedPropertySimplePU<boolean>;
    get refreshStatus() {
        return this.__refreshStatus.get();
    }
    set refreshStatus(newValue: boolean) {
        this.__refreshStatus.set(newValue);
    }
    private __refreshText: ObservedPropertyObjectPU<Resource>;
    get refreshText() {
        return this.__refreshText.get();
    }
    set refreshText(newValue: Resource) {
        this.__refreshText.set(newValue);
    }
    private __tabStates: ObservedPropertyObjectPU<TabUIState[]>;
    get tabStates() {
        return this.__tabStates.get();
    }
    set tabStates(newValue: TabUIState[]) {
        this.__tabStates.set(newValue);
    }
    aboutToAppear() {
        if (this.tabStates.length === 0) {
            this.tabStates = tabBarMeta.map((tab: TabMeta) => this.buildInitialState(tab));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(64:3)", "entry");
            Tabs.onChange((index: number) => {
                this.tabsIndex = index;
            });
            Tabs.vertical(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const tab = _item;
                this.renderTab.bind(this)(tab, index ?? 0);
            };
            this.forEachUpdateFunction(elmtId, tabBarMeta, forEachItemGenFunction, (tab: TabMeta) => tab.id, true, false);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
    }
    private renderTab(tab: TabMeta, tabIndex: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(76:4)", "entry");
                    Scroll.scrollBar(BarState.Off);
                    Scroll.edgeEffect(EdgeEffect.Spring);
                    Scroll.width(LAYOUT_WIDTH_OR_HEIGHT);
                    Scroll.height(LAYOUT_WIDTH_OR_HEIGHT);
                    Scroll.onTouch((event?: TouchEvent) => {
                        this.putDownRefresh(event, tabIndex);
                    });
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(77:5)", "entry");
                    Column.width(LAYOUT_WIDTH_OR_HEIGHT);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.refreshStatus && this.tabsIndex === tabIndex) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new PutDownRefresh(this, { refreshText: this.__refreshText }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 79, col: 7 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                refreshText: this.refreshText
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "PutDownRefresh" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (tab.id === CategoryType.Featured) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BannerComponent(this, { banner: tab.banner }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 82, col: 7 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                banner: tab.banner
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "BannerComponent" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.renderSelectedSection.bind(this)(tab, tabIndex);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new GoodsList(this, {
                                dataSource: this.getDataSourceByIndex(tabIndex),
                                onLoadMore: () => this.handleLoadMore(tab.id)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 85, col: 6 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    dataSource: this.getDataSourceByIndex(tabIndex),
                                    onLoadMore: () => this.handleLoadMore(tab.id)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "GoodsList" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777280, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(89:6)", "entry");
                    Text.fontSize(NORMAL_FONT_SIZE);
                    Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
                    Text.margin({ top: 12, bottom: 12 });
                }, Text);
                Text.pop();
                Column.pop();
                Scroll.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.tabLabelBuilder.call(this, tab, tabIndex);
                } });
            TabContent.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(75:3)", "entry");
        }, TabContent);
        TabContent.pop();
    }
    private tabLabelBuilder(tab: TabMeta, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(109:3)", "entry");
            Column.width(LAYOUT_WIDTH_OR_HEIGHT);
            Column.height(LAYOUT_WIDTH_OR_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(tab.title);
            Text.debugLine("entry/src/main/ets/view/TabBarsComponent.ets(110:4)", "entry");
            Text.fontSize(this.tabsIndex === index ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE);
            Text.fontColor(this.tabsIndex === index ? Color.Black : { "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" });
            Text.maxLines(MAX_LINES_TEXT);
            Text.minFontSize(NORMAL_FONT_SIZE);
            Text.maxFontSize(BIGGER_FONT_SIZE);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private renderSelectedSection(tab: TabMeta, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.tabStates[index] !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.renderSelectedSectionBody.bind(this)(tab, this.tabStates[index], index);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    private renderSelectedSectionBody(tab: TabMeta, state: TabUIState, index: number, parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SelectedComponent(this, {
                        subCategories: tab.subCategories,
                        currentSubCategory: state.subCategory,
                        searchValue: state.search,
                        sortOption: state.sort,
                        activeFilters: state.filters,
                        onSearchChange: (value: string) => this.handleSearchChange(index, value),
                        onAISearch: (value: string) => {
                            // 点击 AI 搜索按钮，跳转到 AI 对话页面并传入当前搜索内容
                            router.pushUrl({ url: 'pages/AIChatPage', params: { query: value } }).catch((err: Error) => {
                                console.error('跳转到 AI 页面失败:', err.message);
                            });
                        },
                        onSubCategoryChange: (subId: string) => this.handleSubCategoryChange(index, subId),
                        onSortChange: (sort: SortOption) => this.handleSortChange(index, sort),
                        onFilterToggle: (filter: FilterId) => this.handleFilterToggle(index, filter)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBarsComponent.ets", line: 131, col: 3 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            subCategories: tab.subCategories,
                            currentSubCategory: state.subCategory,
                            searchValue: state.search,
                            sortOption: state.sort,
                            activeFilters: state.filters,
                            onSearchChange: (value: string) => this.handleSearchChange(index, value),
                            onAISearch: (value: string) => {
                                // 点击 AI 搜索按钮，跳转到 AI 对话页面并传入当前搜索内容
                                router.pushUrl({ url: 'pages/AIChatPage', params: { query: value } }).catch((err: Error) => {
                                    console.error('跳转到 AI 页面失败:', err.message);
                                });
                            },
                            onSubCategoryChange: (subId: string) => this.handleSubCategoryChange(index, subId),
                            onSortChange: (sort: SortOption) => this.handleSortChange(index, sort),
                            onFilterToggle: (filter: FilterId) => this.handleFilterToggle(index, filter)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SelectedComponent" });
        }
    }
    private async handleSearchChange(index: number, value: string): Promise<void> {
        // 点击搜索后先打点，便于诊断
        console.info('handleSearchChange called with:', value);
        // 在点击搜索按钮后处理危险关键词（例如自杀/安眠药）并进行关怀页面跳转
        const dangerKeywords = ['安眠药', '安乐死', '自杀', '自残', '服药', '上吊', '割腕'];
        for (let k of dangerKeywords) {
            if (value && value.indexOf(k) >= 0) {
                try {
                    await router.pushUrl({ url: 'pages/CarePage' }).catch((err: Error) => {
                        console.error('导航到关怀页失败:', String(err));
                    });
                }
                catch (err) {
                    console.error('导航到关怀页异常:', String(err));
                }
                return;
            }
        }
        this.updateTabState(index, { search: value });
    }
    private handleSubCategoryChange(index: number, value: string): void {
        this.updateTabState(index, { subCategory: value });
    }
    private handleSortChange(index: number, sort: SortOption): void {
        this.updateTabState(index, { sort });
    }
    private handleFilterToggle(index: number, filter: FilterId): void {
        const current: TabUIState = this.tabStates[index];
        if (current === undefined) {
            return;
        }
        const filters: FilterId[] = current.filters.slice();
        const position: number = filters.indexOf(filter);
        if (position >= 0) {
            filters.splice(position, 1);
        }
        else {
            filters.push(filter);
        }
        this.updateTabState(index, { filters });
    }
    private handleLoadMore(category: CategoryType): void {
        const index: number = tabBarMeta.findIndex((tab: TabMeta) => tab.id === category);
        if (index < 0) {
            return;
        }
        this.getDataSourceByIndex(index).requestMore();
    }
    private updateTabState(index: number, partial: Partial<TabUIState>): void {
        const current: TabUIState = this.tabStates[index];
        if (current === undefined) {
            return;
        }
        const updated: TabUIState = {
            search: partial.search !== undefined ? partial.search : current.search,
            subCategory: partial.subCategory !== undefined ? partial.subCategory : current.subCategory,
            sort: partial.sort !== undefined ? partial.sort : current.sort,
            filters: partial.filters !== undefined ? partial.filters.slice() : current.filters.slice()
        };
        const newStates: TabUIState[] = this.tabStates.slice();
        newStates[index] = updated;
        this.tabStates = newStates;
        this.syncDataSource(index, updated);
    }
    private getDataSourceByIndex(index: number): ListDataSource {
        const tab: TabMeta = tabBarMeta[index];
        let dataSource: ListDataSource | undefined = this.dataSourceCache.get(tab.id);
        if (dataSource === undefined) {
            dataSource = new ListDataSource(tab.id);
            this.dataSourceCache.set(tab.id, dataSource);
            this.syncDataSource(index, this.readTabState(index), dataSource);
        }
        return dataSource;
    }
    private syncDataSource(index: number, state: TabUIState, target?: ListDataSource): void {
        const dataSource: ListDataSource = target !== undefined ? target : this.getDataSourceByIndex(index);
        const query: ListQueryState = {
            search: state.search,
            subCategory: state.subCategory,
            sort: state.sort,
            filters: state.filters.slice()
        };
        dataSource.updateQuery(query);
    }
    private putDownRefresh(event?: TouchEvent, tabIndex?: number): void {
        if (event === undefined) {
            return;
        }
        switch (event.type) {
            case TouchType.Down:
                this.currentOffsetY = event.touches[0].y;
                break;
            case TouchType.Move:
                this.canTriggerRefresh = event.touches[0].y - this.currentOffsetY > MAX_OFFSET_Y;
                this.refreshStatus = this.canTriggerRefresh || this.isRefreshing;
                break;
            case TouchType.Cancel:
                this.refreshStatus = false;
                this.canTriggerRefresh = false;
                break;
            case TouchType.Up:
                if (this.canTriggerRefresh) {
                    this.triggerRefresh(tabIndex ?? this.tabsIndex);
                }
                else if (!this.isRefreshing) {
                    this.refreshStatus = false;
                }
                break;
            default:
                break;
        }
    }
    private async triggerRefresh(tabIndex: number): Promise<void> {
        if (this.isRefreshing) {
            return;
        }
        this.isRefreshing = true;
        this.refreshStatus = true;
        this.refreshText = { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
        const onWait = setTimeout(() => {
            this.refreshText = { "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
        }, REFRESH_TIME);
        try {
            await this.getDataSourceByIndex(tabIndex).refresh();
            this.refreshText = { "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
        }
        catch (err) {
            this.refreshText = { "id": 16777250, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
        }
        finally {
            clearTimeout(onWait);
            setTimeout(() => {
                this.refreshStatus = false;
                this.refreshText = { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
                this.isRefreshing = false;
                this.canTriggerRefresh = false;
            }, 300);
        }
    }
    private buildInitialState(tab: TabMeta): TabUIState {
        const defaultSub: string = tab.subCategories.length > 0 ? tab.subCategories[0].id : 'all';
        return {
            search: '',
            subCategory: defaultSub,
            sort: SortOption.Comprehensive,
            filters: []
        };
    }
    private readTabState(index: number): TabUIState {
        const existing: TabUIState | undefined = this.tabStates[index];
        if (existing !== undefined) {
            return existing;
        }
        const tabMeta: TabMeta | undefined = tabBarMeta[index];
        const nextState: TabUIState = tabMeta !== undefined ? this.buildInitialState(tabMeta) : {
            search: '',
            subCategory: 'all',
            sort: SortOption.Comprehensive,
            filters: []
        };
        const clone: TabUIState[] = this.tabStates.slice();
        clone[index] = nextState;
        this.tabStates = clone;
        return nextState;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
