/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
	tabBarMeta,
	TabMeta,
	SortOption,
	CategoryType,
	FilterId
} from '../viewmodel/InitialData';
import {
	LAYOUT_WIDTH_OR_HEIGHT,
	NORMAL_FONT_SIZE,
	BIGGER_FONT_SIZE,
	MAX_LINES_TEXT,
	MAX_OFFSET_Y,
	REFRESH_TIME
} from '../common/CommonConstants';
import GoodsList from './GoodsListComponent';
import PutDownRefresh from './PutDownRefreshLayout';
import SelectedComponent from './SelectedComponent';
import router from '@ohos.router';
import BannerComponent from './BannerComponent';
import { ListDataSource, ListQueryState } from '../viewmodel/ListDataSource';

interface TabUIState {
	search: string;
	subCategory: string;
	sort: SortOption;
	filters: FilterId[];
}

@Component
export default struct TabBar {
	private currentOffsetY: number = 0;
	private canTriggerRefresh: boolean = false;
	private isRefreshing: boolean = false;
	private readonly dataSourceCache: Map<CategoryType, ListDataSource> = new Map();

	@State tabsIndex: number = 0;
	@State refreshStatus: boolean = false;
	@State refreshText: Resource = $r('app.string.refresh_text');
	@State tabStates: TabUIState[] = [];

	aboutToAppear() {
		if (this.tabStates.length === 0) {
			this.tabStates = tabBarMeta.map((tab: TabMeta) => this.buildInitialState(tab));
		}
	}

	build() {
		Tabs() {
			ForEach(tabBarMeta, (tab: TabMeta, index?: number) => this.renderTab(tab, index ?? 0), (tab: TabMeta) => tab.id)
		}
		.onChange((index: number) => {
			this.tabsIndex = index;
		})
		.vertical(false)
	}

	@Builder
	private renderTab(tab: TabMeta, tabIndex: number) {
		TabContent() {
			Scroll() {
				Column() {
					if (this.refreshStatus && this.tabsIndex === tabIndex) {
						PutDownRefresh({ refreshText: $refreshText })
					}
					if (tab.id === CategoryType.Featured) {
						BannerComponent({ banner: tab.banner })
					}
					this.renderSelectedSection(tab, tabIndex);
					GoodsList({
						dataSource: this.getDataSourceByIndex(tabIndex),
						onLoadMore: () => this.handleLoadMore(tab.id)
					})
					Text($r('app.string.to_bottom'))
						.fontSize(NORMAL_FONT_SIZE)
						.fontColor($r('app.color.gray'))
						.margin({ top: 12, bottom: 12 })
				}
				.width(LAYOUT_WIDTH_OR_HEIGHT)
			}
			.scrollBar(BarState.Off)
			.edgeEffect(EdgeEffect.Spring)
			.width(LAYOUT_WIDTH_OR_HEIGHT)
			.height(LAYOUT_WIDTH_OR_HEIGHT)
			.onTouch((event?: TouchEvent) => {
				this.putDownRefresh(event, tabIndex);
			})
		}
		.tabBar(this.tabLabelBuilder(tab, tabIndex))
	}

	@Builder
	private tabLabelBuilder(tab: TabMeta, index: number) {
		Column() {
			Text(tab.title)
				.fontSize(this.tabsIndex === index ? BIGGER_FONT_SIZE : NORMAL_FONT_SIZE)
				.fontColor(this.tabsIndex === index ? Color.Black : $r('app.color.gray'))
				.maxLines(MAX_LINES_TEXT)
				.minFontSize(NORMAL_FONT_SIZE)
				.maxFontSize(BIGGER_FONT_SIZE)
		}
		.width(LAYOUT_WIDTH_OR_HEIGHT)
		.height(LAYOUT_WIDTH_OR_HEIGHT)
		.justifyContent(FlexAlign.Center)
	}

	@Builder
	private renderSelectedSection(tab: TabMeta, index: number) {
		if (this.tabStates[index] !== undefined) {
			this.renderSelectedSectionBody(tab, this.tabStates[index], index);
		}
	}

	@Builder
	private renderSelectedSectionBody(tab: TabMeta, state: TabUIState, index: number) {
		SelectedComponent({
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
		})
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
				} catch (err) {
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
		} else {
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
				} else if (!this.isRefreshing) {
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
		this.refreshText = $r('app.string.refresh_text');
		const onWait = setTimeout(() => {
			this.refreshText = $r('app.string.refresh_wait_text');
		}, REFRESH_TIME);
		try {
			await this.getDataSourceByIndex(tabIndex).refresh();
			this.refreshText = $r('app.string.refresh_done_text');
		} catch (err) {
			this.refreshText = $r('app.string.refresh_failed_text');
		} finally {
			clearTimeout(onWait);
			setTimeout(() => {
				this.refreshStatus = false;
				this.refreshText = $r('app.string.refresh_text');
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
}

