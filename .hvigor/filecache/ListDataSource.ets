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

interface EmptyListener {
  (empty: boolean): void;
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
  private readonly pageSize: number = 20;
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
    const merged: Partial<ListQueryState> = { ...partial };
    if (partial.filters !== undefined) {
      merged.filters = [...partial.filters];
    }
    this.query = { ...this.query, ...merged };
    this.rebuildData();
  }

  public toggleFilter(filterId: FilterId): void {
    const filters: FilterId[] = [...this.query.filters];
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
    await new Promise((resolve) => setTimeout(resolve, REFRESH_TIME));
    this.rebuildData();
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
    }, LOAD_DELAY);
  }

  public registerEmptyListener(listener: EmptyListener): void {
    if (this.emptyListeners.indexOf(listener) >= 0) {
      return;
    }
    this.emptyListeners.push(listener);
    listener(this.visibleData.length === 0);
  }

  public unregisterEmptyListener(listener: EmptyListener): void {
    const index: number = this.emptyListeners.indexOf(listener);
    if (index >= 0) {
      this.emptyListeners.splice(index, 1);
    }
  }

  public getSnapshot(): ListQueryState {
    return { ...this.query, filters: [...this.query.filters] };
  }

  private rebuildData(): void {
    const keyword: string = this.query.search.trim().toLowerCase();
    this.filteredData = goodsPool
      .filter((item: GoodsListItemType) => item.category === this.category)
      .filter((item: GoodsListItemType) => this.query.subCategory === 'all' ? true : item.subCategory === this.query.subCategory)
      .filter((item: GoodsListItemType) => keyword.length === 0 ? true : item.keyword.toLowerCase().indexOf(keyword) >= 0)
      .filter((item: GoodsListItemType) => this.matchesFilters(item));
    this.filteredData = this.sortByCurrentOption(this.filteredData);
    const initialLength: number = Math.min(this.pageSize, this.filteredData.length);
    this.visibleData = this.filteredData.slice(0, initialLength);
    this.notifyDataReload();
    this.notifyEmpty();
  }

  private matchesFilters(item: GoodsListItemType): boolean {
    return this.query.filters.every((filterId: FilterId) => {
      switch (filterId) {
        case 'free_shipping':
          return item.isFreeShipping;
        case 'coupon':
          return item.hasCoupon;
        case 'hot':
          return item.isHot;
        case 'new':
          return item.isNew;
        default:
          return true;
      }
    });
  }

  private sortByCurrentOption(list: GoodsListItemType[]): GoodsListItemType[] {
    const copied: GoodsListItemType[] = [...list];
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
    this.emptyListeners.forEach((listener: EmptyListener) => listener(empty));
  }
}
