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
  FilterId,
  SortOptionMeta,
  FilterOptionMeta
} from '../viewmodel/InitialData';
@Component
export default struct SelectedComponent {
  subCategories: SubCategoryMeta[] = [];
  @State currentSubCategory: string = '';
  @State searchValue: string = '';
  @State sortOption: SortOption = SortOption.Comprehensive;
  @State activeFilters: FilterId[] = [];
  sortOptionMetasData: SortOptionMeta[] = sortOptionMetas;
  filterOptionMetasData: FilterOptionMeta[] = filterOptionMetas;
  onSearchChange: (value: string) => void = () => {};
  onSubCategoryChange: (id: string) => void = () => {};
  onSortChange: (sort: SortOption) => void = () => {};
  onFilterToggle: (filter: FilterId) => void = () => {};

  private readonly searchPlaceholder: Resource = $r('app.string.search_placeholder');
  private readonly subCategoryScroller: Scroller = new Scroller();

  build() {
    Column() {
      this.renderSearchBar();
      this.renderSortOptions();
      this.renderFilterOptions();
      if (this.subCategories.length > 0) {
        this.renderSubCategories();
      }
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
    Row({ space: 8 }) {
      Text('子分类')
        .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        .fontColor($r('app.color.deepGray'))
      Scroll(this.subCategoryScroller) {
        Row({ space: 8 }) {
          ForEach(this.subCategories, (sub: SubCategoryMeta) => {
            Text(sub.title)
              .padding({ left: 12, right: 12, top: 6, bottom: 6 })
              .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
              .backgroundColor(this.currentSubCategory === sub.id ? $r('app.color.accent') : $r('app.color.softAccent'))
              .fontColor(this.currentSubCategory === sub.id ? Color.White : $r('app.color.deepGray'))
              .borderRadius(16)
              .onClick(() => {
                this.currentSubCategory = sub.id;
                this.onSubCategoryChange(sub.id);
              })
          }, (sub: SubCategoryMeta) => sub.id)
        }
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Start)
    .margin({ top: 6, bottom: 6 })
  }

  @Builder
  private renderSortOptions() {
    Row({ space: 8 }) {
      Text($r('app.string.sort_section_title'))
        .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        .fontColor($r('app.color.deepGray'))
      ForEach(this.sortOptionMetasData, (option: SortOptionMeta) => {
        Text(option.title)
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .borderRadius(16)
          .backgroundColor(this.sortOption === option.id ? $r('app.color.accent') : Color.Transparent)
          .border({
            width: 1,
            color: this.sortOption === option.id ? $r('app.color.accent') : $r('app.color.divider')
          })
          .fontColor(this.sortOption === option.id ? Color.White : $r('app.color.deepGray'))
          .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
          .onClick(() => {
            this.sortOption = option.id;
            this.onSortChange(option.id);
          })
      }, (option: SortOptionMeta) => option.id)
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Start)
    .margin({ top: 6, bottom: 6 })
  }

  @Builder
  private renderFilterOptions() {
    Row({ space: 8 }) {
      Text($r('app.string.filter_section_title'))
        .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
        .fontColor($r('app.color.deepGray'))
      Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
        ForEach(this.filterOptionMetasData, (filter: FilterOptionMeta) => {
          Text(filter.title)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .border({
              width: 1,
              color: this.activeFilters.indexOf(filter.id) >= 0 ? $r('app.color.accent') : $r('app.color.divider')
            })
            .backgroundColor(this.activeFilters.indexOf(filter.id) >= 0 ? $r('app.color.softAccent') : Color.Transparent)
            .fontColor(this.activeFilters.indexOf(filter.id) >= 0 ? $r('app.color.freshRed') : $r('app.color.deepGray'))
            .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
            .margin({ right: 8, bottom: 8 })
            .onClick(() => {
              const index: number = this.activeFilters.indexOf(filter.id);
              if (index >= 0) {
                this.activeFilters.splice(index, 1);
              } else {
                this.activeFilters.push(filter.id);
              }
              this.onFilterToggle(filter.id);
            })
        }, (filter: FilterOptionMeta) => filter.id)
      }
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .alignItems(VerticalAlign.Top)
    .margin({ top: 6, bottom: 6 })
  }
}
