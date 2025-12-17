/*
 * 购物车页面（空）
 */
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import CartStore, { CartItem } from '../common/CartStore';
import { GoodsListItemType } from '../viewmodel/InitialData';
import OrderStore from '../common/OrderStore';
import PointsStore from '../common/PointsStore';
import NotificationStore, { NotificationPayload } from '../common/NotificationStore';
import prompt from '@system.prompt';
import { PointsGoodsItem } from '../viewmodel/PointsGoodsData';
import router from '@ohos.router';

interface PointsInfo {
  pointsMode: boolean;
  cost: number;
}

@Component
export default struct CartPage {
  private cartListener!: () => void;
  @State private items: CartItem[] = CartStore.getItems();
  @State private multiSelectMode: boolean = true; // 始终处于多选模式
  @State private selectedIds: number[] = [];

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

  private toggleSelection(id: number): void {
    const exists: boolean = this.selectedIds.indexOf(id) >= 0;
    this.selectedIds = exists ? this.selectedIds.filter((v: number) => v !== id) : [...this.selectedIds, id];
  }

  private clearSelections(): void {
    this.selectedIds = [];
  }

  private isSelected(id: number): boolean {
    return this.selectedIds.indexOf(id) >= 0;
  }

  private getRedeemPointsInfo(product: GoodsListItemType): PointsInfo {
    const candidate = product as PointsGoodsItem;
    const cost: number = typeof candidate?.redeemPoints === 'number' ? Math.max(0, candidate.redeemPoints) : 0;
    return { pointsMode: cost > 0, cost } as PointsInfo;
  }

  private handleDeleteSelected(): void {
    if (!this.multiSelectMode || this.selectedIds.length === 0) {
      return;
    }
    CartStore.removeByIds(this.selectedIds);
    this.clearSelections();
    this.items = CartStore.getItems();
    prompt.showToast({ message: '已删除选中商品', duration: 1500 });
  }

  private async handlePurchaseSelected(): Promise<void> {
    if (!this.multiSelectMode || this.selectedIds.length === 0) {
      return;
    }
    const selectedItems: CartItem[] = this.items.filter((item: CartItem) => this.selectedIds.indexOf(item.product.id) >= 0);
    if (selectedItems.length === 0) {
      return;
    }
    const processedIds: number[] = [];
    for (const entry of selectedItems) {
      const product: GoodsListItemType = entry.product;
      const pointsInfo = this.getRedeemPointsInfo(product);
      const pointsMode: boolean = pointsInfo.pointsMode;
      const cost: number = pointsInfo.cost;
      if (pointsMode) {
        const ok: boolean = await PointsStore.spendPoints(cost);
        if (!ok) {
          prompt.showToast({ message: '积分不足，跳过: ' + product.title, duration: 1500 });
          continue;
        }
      }
      OrderStore.addOrderPendingShip(product.id);
      if (!pointsMode) {
        const earnedPoints: number = Math.round((product.price / 10) * 10) / 10;
        if (earnedPoints > 0) {
          await PointsStore.addPoints(earnedPoints);
        }
      }
      this.scheduleOrderLifecycle(product.id, product.title);
      processedIds.push(product.id);
    }
    if (processedIds.length > 0) {
      CartStore.removeByIds(processedIds);
      prompt.showToast({ message: '购买成功，已下单', duration: 1500 });
    }
    this.clearSelections();
    this.items = CartStore.getItems();
  }

  private scheduleOrderLifecycle(goodsId: number, goodsTitle?: Resource): void {
    setTimeout(() => {
      try {
        if (goodsTitle) {
          const payload: NotificationPayload = { resource: goodsTitle, suffix: ' 现已发货' } as NotificationPayload;
          NotificationStore.show(payload, 5000);
        } else {
          NotificationStore.show('商品已发货', 5000);
        }
        OrderStore.markShipped(goodsId);
        prompt.showToast({ message: '您购买的商品已发货', duration: 2000 });
      } catch (e) {
        console.error('发货通知失败:', String(e));
      }
    }, 3000);
    setTimeout(() => {
      try {
        if (goodsTitle) {
          const payload2: NotificationPayload = { resource: goodsTitle, suffix: ' 现已到货，请注意查收' } as NotificationPayload;
          NotificationStore.show(payload2, 5000);
        } else {
          NotificationStore.show('商品已到货', 5000);
        }
        OrderStore.markArrived(goodsId);
        prompt.showToast({ message: '您购买的商品已到货，请注意查收', duration: 2000 });
      } catch (e) {
        console.error('到货通知失败:', String(e));
      }
    }, 8000);
  }

  private openDetail(product: GoodsListItemType): void {
    try {
      router.pushUrl({ url: 'pages/GoodsDetailPage', params: { goods: product } });
    } catch (err) {
      console.error('跳转商品详情失败:', String(err));
    }
  }

  build() {
    Column() {
      Row() {
        Text('购物车')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
      }
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
                  Checkbox({ name: 'select-' + entry.product.id })
                    .size({ width: 24, height: 24 })
                    .select(this.isSelected(entry.product.id))
                    .onChange(() => this.toggleSelection(entry.product.id))
                    .margin({ right: 8 });
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
                .onClick(() => this.openDetail(entry.product))

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

      if (this.items.length > 0) {
        Row({ space: 12 }) {
          Button('删除')
            .fontSize(14)
            .fontColor(Color.White)
            .backgroundColor('#FF3B30')
            .borderRadius(18)
            .height(40)
            .layoutWeight(1)
            .onClick(() => this.handleDeleteSelected())

          Button('购买')
            .fontSize(14)
            .fontColor(Color.White)
            .backgroundColor('#FF6600')
            .borderRadius(18)
            .height(40)
            .layoutWeight(1)
            .onClick(async () => await this.handlePurchaseSelected())
        }
        .padding({ left: 16, right: 16, top: 8, bottom: 12 })
        .width(LAYOUT_WIDTH_OR_HEIGHT)
        .backgroundColor(Color.White)
        .shadow({ radius: 8, color: '#10000000', offsetY: -2 })
      }
    }
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Start)
    .width(LAYOUT_WIDTH_OR_HEIGHT)
    .layoutWeight(1)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}
