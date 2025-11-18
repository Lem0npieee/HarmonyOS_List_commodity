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
import { GoodsListItemType } from '../viewmodel/InitialData';
import { ListDataSource } from '../viewmodel/ListDataSource';

@Component
export default struct GoodsList {
  dataSource: ListDataSource;
  onLoadMore?: () => void;
  @State private isEmpty: boolean = false;
  @State private showLoading: boolean = false;

  aboutToAppear() {
    this.dataSource.registerEmptyListener(this.handleEmptyChange);
  }

  aboutToDisappear() {
    this.dataSource.unregisterEmptyListener(this.handleEmptyChange);
  }

  private handleEmptyChange = (empty: boolean): void => {
    this.isEmpty = empty;
  }

  build() {
    Column() {
      if (this.isEmpty) {
        this.renderEmptyState();
      } else {
        List({ space: commonConst.LIST_ITEM_SPACE }) {
          LazyForEach(this.dataSource, (item: GoodsListItemType, index?: number) => {
            ListItem() {
              this.waterfallCard(item, index ?? 0);
            }
            .margin({ left: 4, right: 4 })
            .onAppear(() => {
              if (index !== undefined && this.shouldLoadMore(index)) {
                this.triggerLoadMore();
              }
            })
          }, (item: GoodsListItemType) => `${item.id}`)
        }
        .edgeEffect(EdgeEffect.Spring)
        .width(commonConst.GOODS_LIST_WIDTH)
        .listDirection(Axis.Vertical)
        .chainAnimation(false)
      }

      if (this.showLoading) {
        Text($r('app.string.loading_more_text'))
          .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .margin({ top: 8 })
      }
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .justifyContent(FlexAlign.Start)
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

  @Builder
  private renderEmptyState() {
    Column() {
      Image($r('app.media.icon'))
        .width(80)
        .height(80)
        .margin({ bottom: 12 })
      Text($r('app.string.empty_list_hint'))
        .fontSize(commonConst.NORMAL_FONT_SIZE)
        .fontColor($r('app.color.gray'))
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .height(200)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }

  @Builder
  private waterfallCard(item: GoodsListItemType, index: number) {
    Column() {
      Image(item.cover)
        .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
        .height(item.height)
        .borderRadius(20)
        .objectFit(ImageFit.Cover)
        .draggable(false)
      Column() {
        Text(item.title)
          .fontSize(commonConst.NORMAL_FONT_SIZE)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.deepGray'))
          .maxLines(2)
        Text(item.description)
          .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
          .fontColor($r('app.color.gray'))
          .maxLines(2)
          .margin({ top: 4, bottom: 4 })
        Row({ space: 6 }) {
          ForEach(item.tags, (tag: Resource, tagIndex?: number) => {
            Text(tag)
              .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
              .fontColor($r('app.color.freshRed'))
              .padding({ left: 8, right: 8, top: 2, bottom: 2 })
              .borderRadius(12)
              .backgroundColor($r('app.color.softAccent'))
          }, (tag: Resource, tagIndex?: number) => `${tagIndex ?? 0}`)
        }
        Row() {
          Text(`¥${item.price.toFixed(0)}`)
            .fontSize(commonConst.BIGGER_FONT_SIZE)
            .fontColor($r('app.color.freshRed'))
          Text(item.evaluate)
            .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
            .fontColor($r('app.color.deepGray'))
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .alignItems(VerticalAlign.Center)
        .margin({ top: 8 })
      }
      .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    }
    .padding(commonConst.GOODS_LIST_PADDING)
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .backgroundColor($r('app.color.cardBg'))
    .borderRadius(24)
    .shadow({ radius: 6, color: new Color(0x14000000), offsetY: 2 })
    .margin({ bottom: index % 2 === 0 ? 4 : 12 })
  }
}