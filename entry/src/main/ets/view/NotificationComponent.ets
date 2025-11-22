import NotificationStore from '../common/NotificationStore';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct NotificationComponent {
  @State private text: string = '';
  @State private visible: boolean = false;
  private hideTimer: number | null = null;

  private listener!: (msg: string, duration?: number) => void;

  constructor() {
    super();
    this.listener = (msg: string, duration: number = 5000) => {
      try {
        this.show(msg, duration);
      } catch (e) {
        console.error('Notification listener failed:', String(e));
      }
    };
    NotificationStore.subscribe(this.listener);
  }

  onDestroy() {
    NotificationStore.unsubscribe(this.listener);
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private show(msg: string, duration: number): void {
    this.text = msg;
    this.visible = true;
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.hideTimer = setTimeout(() => {
      this.visible = false;
      this.hideTimer = null;
    }, duration);
  }

  build() {
    Column() {
      if (this.visible) {
        Column() {
          Text(this.text)
            .fontSize(14)
            .fontColor(Color.White)
            .backgroundColor('#333333')
            .padding({ left: 14, right: 14, top: 8, bottom: 8 })
            .borderRadius(20)
            .maxLines(2)
            .textAlign(TextAlign.Center)
        }
        .alignItems(HorizontalAlign.Center)
        .margin({ top: 12 })
      }
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .position({ left: 0, top: 0 })
  }
}
