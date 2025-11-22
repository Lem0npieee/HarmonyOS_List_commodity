import NotificationStore, { NotificationPayload, NotificationPayloadResource } from '../common/NotificationStore';
import * as commonConst from '../common/CommonConstants';

@Component
export default struct NotificationComponent {
  @State private payload: NotificationPayload | null = null;
  @State private visible: boolean = false;
  private hideTimer: number | null = null;

  private listener!: (payload: NotificationPayload, duration?: number) => void;

  constructor() {
    super();
    this.listener = (payload: NotificationPayload, duration: number = 5000) => {
      try {
        this.show(payload, duration);
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

  private show(msg: NotificationPayload, duration: number): void {
    this.payload = msg;
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
          // payload can be a string or { resource, suffix }
          if (typeof this.payload === 'string') {
            Text(this.payload)
              .fontSize(14)
              .fontColor(Color.White)
              .textAlign(TextAlign.Center)
          } else if (this.payload && typeof this.payload !== 'string') {
            Row() {
              Text((this.payload as NotificationPayloadResource).resource)
                .fontSize(14)
                .fontColor(Color.White)
                .textAlign(TextAlign.Center)
              Text((this.payload as NotificationPayloadResource).suffix)
                .fontSize(14)
                .fontColor(Color.White)
                .textAlign(TextAlign.Center)
            }
          }
        }
        .padding({ left: 14, right: 14, top: 8, bottom: 8 })
        .backgroundColor('#333333')
        .borderRadius(20)
        .alignItems(HorizontalAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .margin({ top: 12 })
      }
    }
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
    .position({ left: 0, top: 0 })
  }
}
