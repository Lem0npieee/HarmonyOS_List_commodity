import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import PointsStore from '../common/PointsStore';
import AuthStore from '../common/AuthStore';
import { pointsGoodsPool, PointsGoodsItem } from '../viewmodel/PointsGoodsData';
import router from '@ohos.router';

@Entry
@Component
export default struct PointsMallPage {
  @State private points: number = PointsStore.getPoints();
  @State private username: string = AuthStore.getCurrentUserName() || '未登录';
  private pointsListener?: () => void;
  private authListener?: () => void;

  aboutToAppear() {
    this.pointsListener = () => {
      this.points = PointsStore.getPoints();
    };
    this.authListener = () => {
      const name: string = AuthStore.getCurrentUserName();
      this.username = name && name.length > 0 ? name : '未登录';
    };
    PointsStore.subscribe(this.pointsListener!);
    AuthStore.subscribe(this.authListener!);
  }

  aboutToDisappear() {
    if (this.pointsListener) {
      PointsStore.unsubscribe(this.pointsListener);
      this.pointsListener = undefined;
    }
    if (this.authListener) {
      AuthStore.unsubscribe(this.authListener);
      this.authListener = undefined;
    }
  }

  build() {
    List() {
      ListItem() {
        this.buildHeader()
      }
      ForEach(pointsGoodsPool, (item: PointsGoodsItem, index?: number) => {
        ListItem() {
          this.renderGoodsCard(item)
        }
        .margin({ bottom: 12 })
      }, (item: PointsGoodsItem) => `${item.id}`)
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .edgeEffect(EdgeEffect.Spring)
    .listDirection(Axis.Vertical)
    .backgroundColor($r('app.color.primaryBgColor'))
    .padding({ bottom: 16, top: AppStorage.get<number>('statusBarHeight') })
  }

  @Builder
  private buildHeader() {
    Column({ space: 14 }) {
      Row({ space: 14 }) {
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
            if (AuthStore.isLoggedIn()) {
              Text('黄金会员')
                .fontSize(12)
                .fontColor('#B35C00')
                .backgroundColor('#FFE4C4')
                .borderRadius(8)
                .padding({ left: 8, right: 8, top: 2, bottom: 2 })
            }
          }
          Text(AuthStore.isLoggedIn() ? '欢迎回来，祝您购物愉快' : '登录后可同步收藏与订单进度')
            .fontSize(13)
            .fontColor('#5F5F5F')
        }
        .layoutWeight(1)
        Column({ space: 2 }) {
          Text(this.points.toFixed(1))
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF7A00')
            .textAlign(TextAlign.End)
          Text('积分')
            .fontSize(13)
            .fontColor('#999999')
            .textAlign(TextAlign.End)
        }
      }
      .alignItems(VerticalAlign.Center)

      // 已移除：兑换流程说明与“积分实时扣除”文案（按需求删除）
    }
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }

  @Builder
  private renderGoodsCard(item: PointsGoodsItem) {
    Column() {
      Row({ space: 14 }) {
        Image(item.cover)
          .width(96)
          .height(96)
          .borderRadius(16)
          .objectFit(ImageFit.Cover)
        Column({ space: 6 }) {
          Text(item.title)
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('app.color.deepGray'))
            .maxLines(2)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
          Text(item.description)
            .fontSize(13)
            .fontColor('#6B6B6B')
            .maxLines(2)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
          Row() {
            Text(`${item.redeemPoints.toFixed(0)} 积分`)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FF7A00')
          }
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
      }
      .alignItems(VerticalAlign.Center)
    }
    .padding({ left: 16, right: 16, top: 16, bottom: 16 })
    .backgroundColor(Color.White)
    .borderRadius(20)
    .margin({ left: 16, right: 16 })
    .onClick(() => {
      try {
        if (!AuthStore.isLoggedIn()) {
          router.pushUrl({ url: 'pages/LoginRegisterPage' });
          return;
        }
        router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: item } });
      } catch (err) {
        console.error('跳转积分商品详情失败:', String(err));
      }
    })
  }
}
