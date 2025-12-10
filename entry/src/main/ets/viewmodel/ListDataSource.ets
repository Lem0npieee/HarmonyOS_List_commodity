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

import { goodsPool, GoodsListItemType, CategoryType, SortOption, FilterId } from './InitialData';
import { REFRESH_TIME } from '../common/CommonConstants';

export interface EmptyListener {
  onEmptyChanged(empty: boolean): void;
}

export interface ListQueryState {
  search: string;
  subCategory: string;
  sort: SortOption;
  filters: FilterId[];
}

const LOAD_DELAY: number = 400;

/**
 * LazyLoad Class
 */
class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];

  public totalCount(): number {
    return 0;
  }

  public getData(index: number): GoodsListItemType | undefined {
    return undefined;
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener);
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const position = this.listeners.indexOf(listener);
    if (position >= 0) {
      this.listeners.splice(position, 1);
    }
  }

  notifyDataReload(): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataReloaded();
    })
  }

  notifyDataAdd(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataAdd(index);
    })
  }

  notifyDataChange(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataChange(index);
    })
  }

  notifyDataDelete(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataDelete(index);
    })
  }

  notifyDataMove(from: number, to: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataMove(from, to);
    })
  }
}

export class ListDataSource extends BasicDataSource {
  private readonly category: CategoryType;
  private query: ListQueryState = {
    search: '',
    subCategory: 'all',
    sort: SortOption.Comprehensive,
    filters: []
  };
  private filteredData: GoodsListItemType[] = [];
  private visibleData: GoodsListItemType[] = [];
  private readonly pageSize: number = 10;
  private isLoadingMore: boolean = false;
  private emptyListeners: EmptyListener[] = [];

  constructor(category: CategoryType) {
    super();
    this.category = category;
    this.rebuildData();
  }

  public totalCount(): number {
    return this.visibleData.length;
  }

  public getData(index: number): GoodsListItemType {
    return this.visibleData[index];
  }

  public updateQuery(partial: Partial<ListQueryState>): void {
    const merged: Partial<ListQueryState> = {};
    if (partial.search !== undefined) {
      merged.search = partial.search;
    }
    if (partial.subCategory !== undefined) {
      merged.subCategory = partial.subCategory;
    }
    if (partial.sort !== undefined) {
      merged.sort = partial.sort;
    }
    if (partial.filters !== undefined) {
      merged.filters = partial.filters.slice();
    }

    // 手动合并query对象
    const newQuery: ListQueryState = {
      search: merged.search !== undefined ? merged.search : this.query.search,
      subCategory: merged.subCategory !== undefined ? merged.subCategory : this.query.subCategory,
      sort: merged.sort !== undefined ? merged.sort : this.query.sort,
      filters: merged.filters !== undefined ? merged.filters : this.query.filters.slice()
    };
    this.query = newQuery;
    this.rebuildData();
  }

  public toggleFilter(filterId: FilterId): void {
    const filters: FilterId[] = this.query.filters.slice();
    const index: number = filters.indexOf(filterId);
    if (index >= 0) {
      filters.splice(index, 1);
    } else {
      filters.push(filterId);
    }
    this.updateQuery({ filters });
  }
  public async refresh(): Promise<void> {
    // Simulate latency while keeping frame rate stable.
    await new Promise<void>((resolve) => setTimeout(resolve, REFRESH_TIME));
    this.rebuildData();
    if (this.query.sort === SortOption.PriceLow || this.query.sort === SortOption.PriceHigh) {
      this.autoLoadRemainingPages();
    }
  }

  public requestMore(): void {
    if (this.isLoadingMore) {
      return;
    }
    if (this.visibleData.length >= this.filteredData.length) {
      return;
    }
    this.isLoadingMore = true;
    setTimeout(() => {
      const nextLength: number = Math.min(this.visibleData.length + this.pageSize, this.filteredData.length);
      this.visibleData = this.filteredData.slice(0, nextLength);
      this.isLoadingMore = false;
      this.notifyDataReload();
      this.notifyEmpty();
      // If sorting by price, continue auto-loading remaining pages once user triggers load-more
      if (this.query.sort === SortOption.PriceLow || this.query.sort === SortOption.PriceHigh) {
        this.autoLoadRemainingPages();
      }
    }, LOAD_DELAY);
  }

  public registerEmptyListener(listener: EmptyListener): void {
    if (this.emptyListeners.indexOf(listener) >= 0) {
      return;
    }
    this.emptyListeners.push(listener);
    listener.onEmptyChanged(this.visibleData.length === 0);
  }

  public unregisterEmptyListener(listener: EmptyListener): void {
    const index: number = this.emptyListeners.indexOf(listener);
    if (index >= 0) {
      this.emptyListeners.splice(index, 1);
    }
  }

  public getSnapshot(): ListQueryState {
    return {
      search: this.query.search,
      subCategory: this.query.subCategory,
      sort: this.query.sort,
      filters: this.query.filters.slice()
    };
  }

  private rebuildData(): void {
    const keyword: string = this.query.search.trim().toLowerCase();
    
    // 精选类别:先筛选后根据排序决定是随机还是稳定排序
    if (this.category === CategoryType.Featured) {
      // 步骤1: 应用所有筛选条件(子分类/搜索/标签)
      let filteredGoods: GoodsListItemType[] = goodsPool
        .filter((item: GoodsListItemType) => this.query.subCategory === 'all' ? true :
          item.subCategory === this.query.subCategory)
        .filter((item: GoodsListItemType) => {
          if (keyword.length === 0) {
            return true;
          }
          const searchText: string = item.searchIndex.toLowerCase();
          const keywords: string[] = keyword.split(/\s+/).filter((k: string) => k.length > 0);
          return keywords.every((k: string) => searchText.indexOf(k) >= 0);
        })
        .filter((item: GoodsListItemType) => this.matchesFilters(item));

      // 如果排序为综合(默认)，才进行随机化选择；否则严格按排序规则排序并取前N
      if (this.query.sort === SortOption.Comprehensive) {
        // 随机打乱筛选后的结果
        for (let i = filteredGoods.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = filteredGoods[i];
          filteredGoods[i] = filteredGoods[j];
          filteredGoods[j] = temp;
        }
        // 不再一次性截断为 10 条；保留完整结果以支持分页加载
        this.filteredData = filteredGoods.slice();
      } else {
        // 非综合排序: 按当前排序规则稳定排序 (不随机, 刷新不会改变顺序)
        const sorted: GoodsListItemType[] = this.sortByCurrentOption(filteredGoods);
        // 保留完整排序结果以支持分页加载
        this.filteredData = sorted.slice();
      }

      // 初始可见数据为第一页（pageSize 条）
      this.visibleData = this.filteredData.slice(0, this.pageSize);
      this.notifyDataReload();
      this.notifyEmpty();
      return;
    }
    
    // 其他类别:正常的过滤和排序逻辑
    this.filteredData = goodsPool
      .filter((item: GoodsListItemType) => item.category === this.category)
      .filter((item: GoodsListItemType) => this.query.subCategory === 'all' ? true :
        item.subCategory === this.query.subCategory)
      .filter((item: GoodsListItemType) => {
        if (keyword.length === 0) {
          return true;
        }
        // 使用智能搜索索引进行匹配
        const searchText: string = item.searchIndex.toLowerCase();
        
        // 支持空格分隔的多关键词搜索(AND逻辑)
        const keywords: string[] = keyword.split(/\s+/).filter((k: string) => k.length > 0);
        return keywords.every((k: string) => searchText.indexOf(k) >= 0);
      })
      .filter((item: GoodsListItemType) => this.matchesFilters(item));
    this.filteredData = this.sortByCurrentOption(this.filteredData);
    const initialLength: number = Math.min(this.pageSize, this.filteredData.length);
    this.visibleData = this.filteredData.slice(0, initialLength);
    this.notifyDataReload();
    this.notifyEmpty();
  }

  private autoLoadRemainingPages(): void {
    if (this.visibleData.length >= this.filteredData.length) {
      return;
    }
    const loadChunk = (): void => {
      if (this.visibleData.length >= this.filteredData.length) {
        this.isLoadingMore = false;
        return;
      }
      this.isLoadingMore = true;
      const nextLength: number = Math.min(this.visibleData.length + this.pageSize, this.filteredData.length);
      this.visibleData = this.filteredData.slice(0, nextLength);
      this.isLoadingMore = false;
      this.notifyDataReload();
      this.notifyEmpty();
      if (this.visibleData.length < this.filteredData.length) {
        setTimeout(loadChunk, LOAD_DELAY);
      }
    };
    loadChunk();
  }

  private matchesFilters(item: GoodsListItemType): boolean {
    const result = this.query.filters.every((filterId: FilterId) => {
      switch (filterId) {
        case 'free_shipping':
          return item.isFreeShipping === true;
        case 'coupon':
          return item.hasCoupon === true;
        case 'hot':
          return item.isHot === true;
        case 'new':
          return item.isNew === true;
        default:
          return true;
      }
    });
    
    // 调试日志
    if (this.query.filters.length > 0) {
      console.log(`商品: ${item.id}, 筛选条件: [${this.query.filters.join(',')}], ` +
        `isHot:${item.isHot}, isNew:${item.isNew}, isFreeShipping:${item.isFreeShipping}, ` +
        `hasCoupon:${item.hasCoupon}, 结果:${result}, tags数量:${item.tags.length}`);
    }
    
    return result;
  }

  private sortByCurrentOption(list: GoodsListItemType[]): GoodsListItemType[] {
    const copied: GoodsListItemType[] = list.slice();
    switch (this.query.sort) {
      case SortOption.PriceLow:
        copied.sort((a: GoodsListItemType, b: GoodsListItemType) => a.price - b.price);
        break;
      case SortOption.PriceHigh:
        copied.sort((a: GoodsListItemType, b: GoodsListItemType) => b.price - a.price);
        break;
      case SortOption.Newest:
        copied.sort((a: GoodsListItemType, b: GoodsListItemType) => b.id - a.id);
        break;
      default:
        copied.sort((a: GoodsListItemType, b: GoodsListItemType) => {
          if (a.isHot === b.isHot) {
            return b.id - a.id;
          }
          return a.isHot ? -1 : 1;
        });
        break;
    }
    return copied;
  }

  private notifyEmpty(): void {
    const empty: boolean = this.visibleData.length === 0;
    this.emptyListeners.forEach((listener: EmptyListener) => listener.onEmptyChanged(empty));
  }
}
