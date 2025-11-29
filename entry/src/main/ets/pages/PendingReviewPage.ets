import router from '@ohos.router';
import prompt from '@system.prompt';
import { LAYOUT_WIDTH_OR_HEIGHT } from '../common/CommonConstants';
import ReviewStore from '../common/ReviewStore';
import { GoodsListItemType } from '../viewmodel/InitialData';

@Entry
@Component
export default struct PendingReviewPage {
  private reviewListener!: () => void;
  @State private pendingItems: GoodsListItemType[] = ReviewStore.getPendingReviewItems();
  @State private showEditor: boolean = false;
  @State private editingGoods: GoodsListItemType | null = null;
  @State private currentRating: number = 5;
  @State private reviewContent: string = '';

  constructor() {
    super();
    this.reviewListener = () => {
      try {
        this.pendingItems = ReviewStore.getPendingReviewItems();
      } catch (err) {
        console.error('刷新待评价列表失败:', String(err));
      }
    };
    ReviewStore.subscribe(this.reviewListener);
  }

  onDestroy() {
    ReviewStore.unsubscribe(this.reviewListener);
  }

  private openEditor(product: GoodsListItemType): void {
    this.editingGoods = product;
    this.currentRating = 5;
    this.reviewContent = '';
    this.showEditor = true;
  }

  private closeEditor(): void {
    this.showEditor = false;
    this.editingGoods = null;
    this.reviewContent = '';
  }

  private submitReview(): void {
    if (!this.editingGoods) {
      return;
    }
    const success = ReviewStore.submitReview(
      this.editingGoods,
      this.currentRating,
      this.reviewContent,
      this.editingGoods.specifications?.[0]
    );
    if (!success) {
      prompt.showToast({ message: '请填写评价内容', duration: 1500 });
      return;
    }
    this.pendingItems = ReviewStore.getPendingReviewItems();
    prompt.showToast({ message: '评价发布成功', duration: 1500 });
    this.closeEditor();
  }

  build() {
    Stack() {
      Column() {
        Row() {
          Image($r('sys.symbol.chevron_left'))
            .width(24)
            .height(24)
            .fillColor(Color.Black)
            .onClick(() => router.back())
          Text('待评价')
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
            Image($r('app.media.daipingjia'))
              .width(80)
              .height(80)
              .margin({ bottom: 12 })
            Text('当前没有待评价的商品')
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
                      Text('状态：待评价')
                        .fontSize(12)
                        .fontColor($r('app.color.gray'))
                    }
                    .alignItems(HorizontalAlign.Start)
                    .layoutWeight(1)

                    Button('评价')
                      .fontSize(13)
                      .fontColor(Color.White)
                      .backgroundColor('#FF6600')
                      .borderRadius(16)
                      .padding({ left: 12, right: 12 })
                      .height(36)
                      .onClick(() => this.openEditor(product))
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

      if (this.showEditor && this.editingGoods) {
        Column() {}
          .width('100%')
          .height('100%')
          .backgroundColor('rgba(0,0,0,0.45)')
          .onClick(() => this.closeEditor())

        Column() {
          Text('撰写评价')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 12 })

          Row({ space: 12 }) {
            Image(this.editingGoods.cover)
              .width(64)
              .height(64)
              .borderRadius(8)
              .objectFit(ImageFit.Cover)
            Column() {
              Text(this.editingGoods.title)
                .fontSize(15)
                .fontColor('#333333')
                .maxLines(2)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
              Text(this.editingGoods.specifications && this.editingGoods.specifications.length > 0 ? this.editingGoods.specifications[0] : '默认规格')
                .fontSize(12)
                .fontColor('#999999')
                .margin({ top: 4 })
            }
            .alignItems(HorizontalAlign.Start)
          }
          .width('100%')

          Row({ space: 8 }) {
            Text('评分:')
              .fontSize(14)
              .fontColor('#666666')
            ForEach([1, 2, 3, 4, 5], (star: number) => {
              Image(star <= this.currentRating ? $r('app.media.star') : $r('app.media.no_star'))
                .width(24)
                .height(24)
                .onClick(() => {
                  this.currentRating = star;
                })
            })
          }
          .margin({ top: 16 })
          .alignItems(VerticalAlign.Center)

          TextArea({ text: this.reviewContent, placeholder: '写下你的真实体验吧~' })
            .width('100%')
            .height(140)
            .maxLength(200)
            .padding(12)
            .backgroundColor('#F5F5F5')
            .borderRadius(8)
            .margin({ top: 16 })
            .onChange((value: string) => {
              this.reviewContent = value;
            })

          Row({ space: 12 }) {
            Button('取消')
              .fontSize(14)
              .fontColor('#666666')
              .backgroundColor('#EDEDED')
              .borderRadius(20)
              .height(40)
              .layoutWeight(1)
              .onClick(() => this.closeEditor())

            Button('发布评价')
              .fontSize(14)
              .fontColor(Color.White)
              .backgroundColor('#FF6600')
              .borderRadius(20)
              .height(40)
              .layoutWeight(1)
              .onClick(() => this.submitReview())
          }
          .width('100%')
          .margin({ top: 20 })
        }
        .width('90%')
        .backgroundColor(Color.White)
        .borderRadius(20)
        .padding(20)
        .alignSelf(ItemAlign.Center)
      }
    }
  }
}
