/*
 * 我的页面（空）
 */
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import FavoritesStore, { FavoriteItem } from '../common/FavoritesStore';
import OrderStore from '../common/OrderStore';
import ReviewStore from '../common/ReviewStore';
import AuthStore from '../common/AuthStore';
import PointsStore from '../common/PointsStore';
import router from '@ohos.router';
import prompt from '@system.prompt';

@Component
export default struct ProfilePage {
  private touchStartMap: Map<number, number> = new Map();
  @State private favorites: FavoriteItem[] = FavoritesStore.getItems();
  @State private pendingShipCount: number = OrderStore.getPendingShipCount();
  @State private pendingReceiveCount: number = OrderStore.getPendingReceiveCount();
  @State private pendingReviewCount: number = ReviewStore.getPendingReviewCount();
  @State private loggedIn: boolean = AuthStore.isLoggedIn();
  @State private username: string = AuthStore.getCurrentUserName() || '未登录';
  @State private pointsBalance: number = PointsStore.getPoints();
  private orderListener!: () => void;
  private favoritesListener!: () => void;
  private reviewListener!: () => void;
  private authListener!: () => void;
  private pointsListener!: () => void;

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
        this.pendingReceiveCount = OrderStore.getPendingReceiveCount();
      } catch (err) {
        console.error('更新订单数失败:', String(err));
      }
    };
    this.reviewListener = () => {
      try {
        this.pendingReviewCount = ReviewStore.getPendingReviewCount();
      } catch (err) {
        console.error('更新待评价数失败:', String(err));
      }
    };
    this.authListener = () => {
      try {
        this.loggedIn = AuthStore.isLoggedIn();
        const name: string = AuthStore.getCurrentUserName();
        this.username = name && name.length > 0 ? name : '未登录';
      } catch (err) {
        console.error('更新登录状态失败:', String(err));
      }
    };
    this.pointsListener = () => {
      try {
        this.pointsBalance = PointsStore.getPoints();
      } catch (err) {
        console.error('更新积分失败:', String(err));
      }
    };
    FavoritesStore.subscribe(this.favoritesListener);
    OrderStore.subscribe(this.orderListener);
    ReviewStore.subscribe(this.reviewListener);
    AuthStore.subscribe(this.authListener);
    PointsStore.subscribe(this.pointsListener);
  }

  onDestroy() {
    FavoritesStore.unsubscribe(this.favoritesListener);
    OrderStore.unsubscribe(this.orderListener);
    ReviewStore.unsubscribe(this.reviewListener);
    AuthStore.unsubscribe(this.authListener);
    PointsStore.unsubscribe(this.pointsListener);
  }
  build() {
    Column() {
      // 顶部用户信息卡
      Column({ space: 20 }) {
        Row({ space: 16 }) {
          Image($r('app.media.goodsImg'))
            .width(68)
            .height(68)
            .borderRadius(34)

          Column({ space: 6 }) {
            Row({ space: 8 }) {
              Text(this.username)
                .fontSize(20)
                .fontWeight(FontWeight.Bold)
                .fontColor(Color.Black)
              if (this.loggedIn) {
                Text('黄金会员')
                  .fontSize(12)
                  .fontColor('#B35C00')
                  .backgroundColor('#FFE4C4')
                  .borderRadius(8)
                  .padding({ left: 8, right: 8, top: 2, bottom: 2 })
              }
            }
            Text(this.loggedIn ? '欢迎回来，祝您购物愉快' : '登录后可同步收藏与订单进度')
              .fontSize(13)
              .fontColor('#5F5F5F')
          }
          .layoutWeight(1)

          if (this.loggedIn) {
            Button('退出登录')
              .height(34)
              .backgroundColor('#FF7A00')
              .fontColor(Color.White)
              .padding({ left: 12, right: 12 })
              .borderRadius(16)
              .onClick(() => this.handleLogout())
          } else {
            Button('登录/注册')
              .height(34)
              .backgroundColor('#FF7A00')
              .fontColor(Color.White)
              .padding({ left: 12, right: 12 })
              .borderRadius(16)
              .onClick(() => this.gotoLogin())
          }
        }
        .alignItems(VerticalAlign.Center)

        Column({ space: 10 }) {
          Row({ space: 12 }) {
            this.renderUserStat('收藏', `${this.favorites.length}`, '#FFF4EC')
            this.renderUserStat('待收货', `${this.pendingReceiveCount}`, '#ECF2FF')
          }
          Row({ space: 12 }) {
            this.renderUserStat('待评价', `${this.pendingReviewCount}`, '#FDF1FF')
            this.renderUserStat('积分', this.pointsBalance.toFixed(1), '#FFF8E1')
          }
        }
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .backgroundColor(Color.White)
      .padding({ left: 20, right: 20, top: 20, bottom: 20 })
      .borderRadius(24)
      .margin({ left: 12, right: 12, top: 8 })
      .shadow({ color: '#1F000000', radius: 12, offsetY: 4 })

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
          Stack() {
            Image($r('app.media.daishouhuo'))
              .width(36)
              .height(36)
            if (this.pendingReceiveCount > 0) {
              Text(this.pendingReceiveCount > 99 ? '99+' : `${this.pendingReceiveCount}`)
                .fontSize(12)
                .fontColor(Color.White)
                .backgroundColor('#FF3B30')
                .width(this.pendingReceiveCount > 9 ? 20 : 16)
                .height(16)
                .textAlign(TextAlign.Center)
                .borderRadius(8)
                .position({ left: this.pendingReceiveCount > 9 ? 22 : 24, top: -6 })
            }
          }
          Text('待收货')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)
        .onClick(() => {
          try {
            router.pushUrl({ url: 'pages/ConfirmReceiptPage' });
          } catch (err) {
            console.error('跳转待收货页面失败:', String(err));
          }
        })

        Column() {
          Stack() {
            Image($r('app.media.daipingjia'))
              .width(36)
              .height(36)
            if (this.pendingReviewCount > 0) {
              Text(this.pendingReviewCount > 99 ? '99+' : `${this.pendingReviewCount}`)
                .fontSize(12)
                .fontColor(Color.White)
                .backgroundColor('#FF3B30')
                .width(this.pendingReviewCount > 9 ? 20 : 16)
                .height(16)
                .textAlign(TextAlign.Center)
                .borderRadius(8)
                .position({ left: this.pendingReviewCount > 9 ? 22 : 24, top: -6 })
            }
          }
          Text('待评价')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)
        .onClick(() => {
          try {
            router.pushUrl({ url: 'pages/PendingReviewPage' });
          } catch (err) {
            console.error('跳转待评价页面失败:', String(err));
          }
        })

        Column() {
          Image($r('app.media.tuikuanshouhou'))
            .width(36)
            .height(36)
          Text('积分商城')
            .fontSize(12)
        }
        .alignItems(HorizontalAlign.Center)
        .layoutWeight(1)
        .onClick(() => this.gotoPointsMall())
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .height(100)
      .padding({ left: 8, right: 8 })
      .backgroundColor(Color.White)
      .margin({ top: 12 })

      // 我的收藏 标题
      Row() {
        Text('我的收藏')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .padding({ left: 16, top: 16, bottom: 8 })
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

  private async handleLogout(): Promise<void> {
    try {
      await AuthStore.logout();
      prompt.showToast({ message: '已退出登录', duration: 1200 });
      router.pushUrl({ url: 'pages/LoginRegisterPage' });
    } catch (err) {
      console.error('退出登录失败:', String(err));
      prompt.showToast({ message: '退出失败，请稍后重试', duration: 1200 });
    }
  }

  private gotoLogin(): void {
    try {
      router.pushUrl({ url: 'pages/LoginRegisterPage' });
    } catch (err) {
      console.error('跳转登录失败:', String(err));
    }
  }

  @Builder
  private renderUserStat(label: string, value: string, bgColor: string) {
    Column({ space: 4 }) {
      Text(value)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#1F1F1F')
        .textAlign(TextAlign.Center)
      Text(label)
        .fontSize(12)
        .fontColor('#7A7A7A')
        .textAlign(TextAlign.Center)
    }
    .padding({ top: 8, bottom: 8 })
    .backgroundColor(bgColor)
    .borderRadius(14)
    .layoutWeight(1)
  }

  private gotoPointsMall(): void {
    try {
      router.pushUrl({ url: 'pages/PointsMallPage' });
    } catch (err) {
      console.error('跳转积分商城失败:', String(err));
    }
  }
}
