/*
 * 购物车页面（空）
 */
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import CartStore, { CartItem } from '../common/CartStore';
import { GoodsListItemType } from '../viewmodel/InitialData';

@Component
export default struct CartPage {
  private cartListener!: () => void;
  @State private items: CartItem[] = CartStore.getItems();

  constructor() {
    super();
    this.cartListener = () => {
      try {
        this.items = CartStore.getItems();
      } catch (e) {
        console.error('更新购物车列表失败:', String(e));
      }
    };
    CartStore.subscribe(this.cartListener);
  }

  onDestroy() {
    CartStore.unsubscribe(this.cartListener);
  }

  build() {
    Column() {
      Text('购物车')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .padding({ top: 8, bottom: 8 })
      if (this.items.length === 0) {
        Text('购物车为空')
          .fontSize(14)
          .fontColor($r('app.color.gray'))
          .padding({ left: 16, right: 16 })
      } else {
        List({ space: 0 }) {
          ForEach(this.items, (entry: CartItem, index?: number) => {
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
                    Text('¥' + entry.product.price.toFixed(0))
                      .fontSize(18)
                      .fontColor($r('app.color.freshRed'))
                      .fontWeight(FontWeight.Bold)
                    Text('数量: ' + entry.quantity)
                      .fontSize(12)
                      .fontColor($r('app.color.gray'))
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
            .margin({ left: 4, right: 4 })
          })
        }
        .edgeEffect(EdgeEffect.Spring)
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .listDirection(Axis.Vertical)
        .layoutWeight(1)
      }
    }
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Start)
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
