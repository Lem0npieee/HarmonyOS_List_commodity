export interface NotificationPayloadResource {
  resource: Resource;
  suffix: string;
}

export type NotificationPayload = string | NotificationPayloadResource;

export default class NotificationStore {
  private static listeners: Array<(payload: NotificationPayload, duration?: number) => void> = [];

  static show(payload: NotificationPayload, duration: number = 5000): void {
    try {
      NotificationStore.listeners.forEach((l) => {
        try {
          l(payload, duration);
        } catch (e) {
          console.error('Notification listener error:', String(e));
        }
      });
    } catch (err) {
      console.error('NotificationStore.show failed:', String(err));
    }
  }

  static subscribe(cb: (payload: NotificationPayload, duration?: number) => void): void {
    if (!cb) return;
    NotificationStore.listeners.push(cb);
  }

  static unsubscribe(cb: (payload: NotificationPayload, duration?: number) => void): void {
    if (!cb) return;
    NotificationStore.listeners = NotificationStore.listeners.filter((l) => l !== cb);
  }
}
