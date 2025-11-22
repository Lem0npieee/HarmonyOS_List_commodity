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

import TabBar from '../view/TabBarsComponent';
import CartPage from './CartPage';
import ProfilePage from './ProfilePage';
import NotificationComponent from '../view/NotificationComponent';
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from '../common/CommonConstants';

@Entry
@Component
struct ListIndex {
  @State selectedBottomIndex: number = 0;
  build() {
    Stack() {
      Navigation() {
        Column() {
          // 根据底部选中序号切换主体内容（页面内切换，不 pushUrl）
          if (this.selectedBottomIndex === 0) {
            TabBar()
              .layoutWeight(1)
          } else if (this.selectedBottomIndex === 1) {
            CartPage()
              .layoutWeight(1)
          } else {
            ProfilePage()
              .layoutWeight(1)
          }

          // 底部导航栏： 首页 | 购物车 | 我的（在当前页面内切换）
          Row() {
            // 首页
            Column() {
              Image($r('app.media.home'))
                .width(28)
                .height(28)
              Text('首页')
                .fontSize(12)
                .fontColor(this.selectedBottomIndex === 0 ? Color.Black : $r('app.color.gray'))
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .layoutWeight(1)
            .onClick(() => {
              this.selectedBottomIndex = 0;
            })

            // 购物车
            Column() {
              Image($r('app.media.gouwuche'))
                .width(28)
                .height(28)
              Text('购物车')
                .fontSize(12)
                .fontColor(this.selectedBottomIndex === 1 ? Color.Black : $r('app.color.gray'))
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .layoutWeight(1)
            .onClick(() => {
              this.selectedBottomIndex = 1;
            })

            // 我的
            Column() {
              Image($r('app.media.me'))
                .width(28)
                .height(28)
              Text('我的')
                .fontSize(12)
                .fontColor(this.selectedBottomIndex === 2 ? Color.Black : $r('app.color.gray'))
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .layoutWeight(1)
            .onClick(() => {
              this.selectedBottomIndex = 2;
            })
          }
          .height(64)
          .backgroundColor($r('app.color.primaryBgColor'))
          .border({ width: 1, color: $r('app.color.divider') })
        }
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .justifyContent(FlexAlign.Start)
      }
      .size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT })
      .title(STORE)
      .titleMode(NavigationTitleMode.Mini)

      // 全局通知气泡（位于导航之上）
      NotificationComponent()
    }
    .height(LAYOUT_WIDTH_OR_HEIGHT)
    .backgroundColor($r('app.color.primaryBgColor'))
    .padding({
      top: AppStorage.get<number>('statusBarHeight')
    })
  }
}