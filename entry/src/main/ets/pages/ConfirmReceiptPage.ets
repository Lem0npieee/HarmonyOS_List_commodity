import router from '@ohos.router';
import prompt from '@system.prompt';
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import OrderStore from '../common/OrderStore';
import { GoodsListItemType } from '../viewmodel/InitialData';

@Entry
@Component
export default struct ConfirmReceiptPage {
  private orderListener!: () => void;
  @State private pendingItems: GoodsListItemType[] = OrderStore.getPendingReceiveItems();

  constructor() {
    super();
    this.orderListener = () => {
      try {
        this.pendingItems = OrderStore.getPendingReceiveItems();
      } catch (err) {
        console.error('刷新待收货列表失败:', String(err));
      }
    };
    OrderStore.subscribe(this.orderListener);
  }

  onDestroy() {
    OrderStore.unsubscribe(this.orderListener);
  }

  private confirmReceipt(goodsId: number): void {
    try {
      OrderStore.confirmReceived(goodsId);
      this.pendingItems = OrderStore.getPendingReceiveItems();
      prompt.showToast({ message: '确认收货成功', duration: 1500 });
    } catch (err) {
      console.error('确认收货失败:', String(err));
    }
  }

  build() {
    Column() {
      // 顶部导航
      Row() {
        Image($r('sys.symbol.chevron_left'))
          .width(24)
          .height(24)
          .fillColor(Color.Black)
          .onClick(() => router.back())
        Text('确认收货')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({ left: 12 })
        Blank()
      }
      .width(LAYOUT_WIDTH_OR_HEIGHT)
      .height(56)
      .alignItems(VerticalAlign.Center)
      .padding({ left: 12, right: 12 })

      if (this.pendingItems.length === 0) {
        Column() {
          Image($r('app.media.daishouhuo'))
            .width(80)
            .height(80)
            .margin({ bottom: 12 })
          Text('当前没有待收货的商品')
            .fontSize(14)
            .fontColor($r('app.color.gray'))
        }
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .height('80%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      } else {
        List({ space: 0 }) {
          ForEach(this.pendingItems, (product: GoodsListItemType, index?: number) => {
            ListItem() {
              Column() {
                Row({ space: 8 }) {
                  Image(product.cover)
                    .width(112)
                    .height(112)
                    .borderRadius(16)
                    .objectFit(ImageFit.Cover)
                    .draggable(false)

                  Column() {
                    Text(product.title)
                      .fontSize(16)
                      .fontWeight(FontWeight.Medium)
                      .fontColor($r('app.color.deepGray'))
                      .maxLines(2)
                      .textAlign(TextAlign.Start)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })
                      .width('100%')
                    Text('¥' + product.price.toFixed(0))
                      .fontSize(18)
                      .fontColor($r('app.color.freshRed'))
                      .fontWeight(FontWeight.Bold)
                    Text('配送状态：已到货')
                      .fontSize(12)
                      .fontColor($r('app.color.gray'))
                  }
                  .alignItems(HorizontalAlign.Start)
                  .layoutWeight(1)

                  Button('确认收货')
                    .fontSize(13)
                    .fontColor(Color.White)
                    .backgroundColor('#FF6600')
                    .borderRadius(16)
                    .padding({ left: 12, right: 12 })
                    .height(36)
                    .onClick(() => this.confirmReceipt(product.id))
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
            .margin({ left: 4, right: 4 })
          })
        }
        .edgeEffect(EdgeEffect.Spring)
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .listDirection(Axis.Vertical)
        .layoutWeight(1)
      }
    }
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
