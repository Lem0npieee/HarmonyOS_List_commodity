/*
 * 我的页面（空）
 */
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import FavoritesStore, { FavoriteItem } from '../common/FavoritesStore';
import OrderStore from '../common/OrderStore';
import router from '@ohos.router';
import prompt from '@system.prompt';

@Component
export default struct ProfilePage {
  private touchStartMap: Map<number, number> = new Map();
  @State private favorites: FavoriteItem[] = FavoritesStore.getItems();
  @State private pendingShipCount: number = OrderStore.getPendingShipCount();
  private orderListener!: () => void;
  private favoritesListener!: () => void;

  constructor() {
    super();
    this.favoritesListener = () => {
      try {
        this.favorites = FavoritesStore.getItems();
      } catch (err) {
        console.error('更新收藏列表失败:', String(err));
      }
    };
    this.orderListener = () => {
      try {
        this.pendingShipCount = OrderStore.getPendingShipCount();
      } catch (err) {
        console.error('更新订单数失败:', String(err));
      }
    };
    FavoritesStore.subscribe(this.favoritesListener);
    OrderStore.subscribe(this.orderListener);
  }

  onDestroy() {
    FavoritesStore.unsubscribe(this.favoritesListener);
    OrderStore.unsubscribe(this.orderListener);
  }
  build() {
    Column() {
      // 顶部用户信息卡
      Row() {
        Image($r('app.media.goodsImg'))
          .width(64)
          .height(64)
          .borderRadius(32)
          .margin({ left: 16 })

        Column() {
          Row() {
            Text('tbNick_04ies')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor($r('app.color.deepGray'))
            Text('黄金会员')
              .fontSize(12)
              .fontColor('#FFB800')
              .backgroundColor('#FFF6E0')
              .borderRadius(8)
              .padding({ left: 6, right: 6 })
              .margin({ left: 8 })
          }
          .alignItems(VerticalAlign.Center)

          Row({ space: 12 }) {
            Text('关注店铺')
              .fontSize(12)
              .fontColor($r('app.color.gray'))
            Text('地址')
              .fontSize(12)
              .fontColor($r('app.color.gray'))
            Text('客服')
              .fontSize(12)
              .fontColor($r('app.color.gray'))
          }
        }
        .margin({ left: 12 })

        Blank()
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .height(120)
      .backgroundColor(Color.White)
      .alignItems(VerticalAlign.Top)

      // 订单快捷入口（待付款/待发货/待收货/待评价/退款）
      Row() {
        Column() {
          Image($r('app.media.daifukuan'))
            .width(36)
            .height(36)
          Text('待付款')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)

        Column() {
          Stack() {
            Image($r('app.media.daifahuo'))
              .width(36)
              .height(36)
            // 红色数字气泡（仅当数量>0时显示）
            if (this.pendingShipCount > 0) {
              Text(this.pendingShipCount > 99 ? '99+' : `${this.pendingShipCount}`)
                .fontSize(12)
                .fontColor(Color.White)
                .backgroundColor('#FF3B30')
                .width(this.pendingShipCount > 9 ? 20 : 16)
                .height(16)
                .textAlign(TextAlign.Center)
                .borderRadius(8)
                .position({ left: this.pendingShipCount > 9 ? 22 : 24, top: -6 })
            }
          }
          Text('待发货')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)

        Column() {
          Image($r('app.media.daishouhuo'))
            .width(36)
            .height(36)
          Text('待收货')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)

        Column() {
          Image($r('app.media.daipingjia'))
            .width(36)
            .height(36)
          Text('待评价')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)

        Column() {
          Image($r('app.media.tuikuanshouhou'))
            .width(36)
            .height(36)
          Text('退款/售后')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .height(96)
      .padding({ left: 8, right: 8 })
      .backgroundColor(Color.White)

      // 我的收藏 标题
      Row() {
        Text('我的收藏')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .padding({ left: 12, top: 12 })
        Blank()
      }

      // 收藏列表（复用购物车样式）
      List({ space: 0 }) {
        ForEach(this.favorites, (entry: FavoriteItem, index?: number) => {
          ListItem() {
            Column() {
              Row({ space: 8 }) {
                Image(entry.product.cover)
                  .width(112)
                  .height(112)
                  .borderRadius(16)
                  .objectFit(ImageFit.Cover)
                  .draggable(false)
                Column() {
                  Text(entry.product.title)
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                    .fontColor($r('app.color.deepGray'))
                    .maxLines(2)
                    .textAlign(TextAlign.Start)
                    .textOverflow({ overflow: TextOverflow.Ellipsis })
                    .width('100%')
                  Text(`¥${entry.product.price.toFixed(0)}`)
                    .fontSize(18)
                    .fontColor($r('app.color.freshRed'))
                    .fontWeight(FontWeight.Bold)
                }
                .alignItems(HorizontalAlign.Start)
                .layoutWeight(1)
              }
              .width(LAYOUT_WIDTH_OR_HEIGHT)
              .alignItems(VerticalAlign.Center)
              .padding({ top: 12, bottom: 12 })

              Divider()
                .color($r('app.color.divider'))
                .opacity(0.6)
                .margin({ top: 12 })
            }
          }
          .onTouch((event?: TouchEvent) => {
            try {
              if (!event) return;
              const ttype = (event.type ?? '').toString();
              if (ttype === 'start' && event.touches && event.touches.length > 0) {
                this.touchStartMap.set(entry.product.id, event.touches[0].x ?? 0);
              } else if (ttype === 'end') {
                const startX = this.touchStartMap.get(entry.product.id) ?? 0;
                let endX = startX;
                if (event.changedTouches && event.changedTouches.length > 0) {
                  endX = event.changedTouches[0].x ?? startX;
                }
                // 左滑阈值 40px
                if (startX - endX > 40) {
                  FavoritesStore.remove(entry.product.id);
                  prompt.showToast({ message: '已取消收藏', duration: 1200 });
                }
              }
            } catch (err) {
              console.error('处理滑动删除失败:', String(err));
            }
          })
          .margin({ left: 4, right: 4 })
          .onClick(() => {
            try {
              router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: entry.product } });
            } catch (err) {
              console.error('跳转收藏商品详情失败:', String(err));
            }
          })
        })
      }
      .edgeEffect(EdgeEffect.Spring)
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .listDirection(Axis.Vertical)
      .layoutWeight(1)

    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .padding({ top: AppStorage.get<number>('statusBarHeight') })
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
