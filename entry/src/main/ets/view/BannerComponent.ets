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
import { BannerMeta, BannerImageItem } from '../viewmodel/InitialData';

@Component
export default struct BannerComponent {
  banner: BannerMeta = {
    primary: $r('app.string.banner_selected_primary'),
    secondary: $r('app.string.banner_selected_secondary'),
    images: []
  };
  private controller: SwiperController = new SwiperController();

  build() {
    Swiper(this.controller) {
      ForEach(this.banner.images, (imageItem: Resource | BannerImageItem) => {
        this.bannerSlide(imageItem as Resource | BannerImageItem);
      })
    }
    .indicator(true)
    .autoPlay(true)
    .interval(4000)
    .height(180)
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .margin({ bottom: 12 })
  }

  @Builder
  private bannerSlide(imageItem: Resource | BannerImageItem) {
    Stack() {
      Image((imageItem as BannerImageItem).image ? (imageItem as BannerImageItem).image : (imageItem as Resource))
        .objectFit(ImageFit.Cover)
        .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
        .height(180)
        .borderRadius(20)
      Column() {
        Text((imageItem as BannerImageItem).primary ? (imageItem as BannerImageItem).primary : this.banner.primary)
          .fontSize(commonConst.BIGGER_FONT_SIZE)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Medium)
          .margin({ bottom: 4 })
        Text((imageItem as BannerImageItem).secondary ? (imageItem as BannerImageItem).secondary : this.banner.secondary)
          .fontSize(commonConst.NORMAL_FONT_SIZE)
          .fontColor(Color.White)
          .opacity(0.85)
      }
      .padding(24)
      .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
      .height(180)
      .justifyContent(FlexAlign.End)
      .backgroundColor('#44000000')
      .borderRadius(20)
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
  }
}
