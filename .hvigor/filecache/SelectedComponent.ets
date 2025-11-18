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

import * as commonConst from '../common/CommonConstants';
import {
  SortOption,
  sortOptionMetas,
  filterOptionMetas,
  SubCategoryMeta,
  FilterId
} from '../viewmodel/InitialData';

@Component
export default struct SelectedComponent {
  subCategories: SubCategoryMeta[];
  currentSubCategory: string;
  searchValue: string;
  sortOption: SortOption;
  activeFilters: FilterId[];
  onSearchChange: (value: string) => void;
  onSubCategoryChange: (id: string) => void;
  onSortChange: (sort: SortOption) => void;
  onFilterToggle: (filter: FilterId) => void;

  private readonly searchPlaceholder: Resource = $r('app.string.search_placeholder');

  build() {
    Column() {
      this.renderSearchBar();
      this.renderSubCategories();
      this.renderSortOptions();
      this.renderFilterOptions();
      Divider().color($r('app.color.divider')).height(1);
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .padding({
      left: commonConst.GOODS_LIST_PADDING,
      right: commonConst.GOODS_LIST_PADDING,
      top: commonConst.GOODS_LIST_PADDING,
      bottom: commonConst.GOODS_LIST_PADDING
    })
  }

  @Builder
  private renderSearchBar() {
    Search({ value: this.searchValue, placeholder: this.searchPlaceholder })
      .searchButton('Go')
      .border({ width: 1, color: $r('app.color.divider') })
      .height(40)
      .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
      .backgroundColor(Color.White)
      .onSubmit((value: string) => {
        this.onSearchChange(value);
      })
      .onChange((value: string) => {
        this.onSearchChange(value);
      })
  }

  @Builder
  private renderSubCategories() {
    Scroll({ scrollBar: BarState.Off, axis: Axis.Horizontal }) {
      Row({ space: 8 }) {
        ForEach(this.subCategories, (sub: SubCategoryMeta) => {
          this.categoryChip(sub);
        }, (sub: SubCategoryMeta) => sub.id)
      }
      .padding({ top: 8, bottom: 8 })
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
  }

  @Builder
  private categoryChip(sub: SubCategoryMeta) {
    const isActive: boolean = this.currentSubCategory === sub.id;
    Text(sub.title)
      .padding({ left: 12, right: 12, top: 6, bottom: 6 })
      .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
      .backgroundColor(isActive ? $r('app.color.accent') : $r('app.color.softAccent'))
      .fontColor(isActive ? Color.White : $r('app.color.deepGray'))
      .borderRadius(16)
      .onClick(() => {
        this.onSubCategoryChange(sub.id);
      })
  }

  @Builder
  private renderSortOptions() {
    Column() {
      Text($r('app.string.sort_section_title'))
        .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        .fontColor($r('app.color.deepGray'))
        .margin({ top: 6, bottom: 4 })
      Row({ space: 8 }) {
        ForEach(sortOptionMetas, (option) => {
          const isActive: boolean = this.sortOption === option.id;
          Text(option.title)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .backgroundColor(isActive ? $r('app.color.accent') : Color.Transparent)
            .border({
              width: 1,
              color: isActive ? $r('app.color.accent') : $r('app.color.divider')
            })
            .fontColor(isActive ? Color.White : $r('app.color.deepGray'))
            .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
            .onClick(() => {
              this.onSortChange(option.id);
            })
        }, (option) => option.id)
      }
    }
  }

  @Builder
  private renderFilterOptions() {
    Column() {
      Text($r('app.string.filter_section_title'))
        .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        .fontColor($r('app.color.deepGray'))
        .margin({ top: 12, bottom: 4 })
      Wrap({ spacing: 8, alignment: WrapAlignment.Start }) {
        ForEach(filterOptionMetas, (filter) => {
          const isActive: boolean = this.activeFilters.indexOf(filter.id) >= 0;
          Text(filter.title)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .border({
              width: 1,
              color: isActive ? $r('app.color.accent') : $r('app.color.divider')
            })
            .backgroundColor(isActive ? $r('app.color.softAccent') : Color.Transparent)
            .fontColor($r('app.color.deepGray'))
            .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
            .onClick(() => {
              this.onFilterToggle(filter.id);
            })
        }, (filter) => filter.id)
      }
    }
  }
}
