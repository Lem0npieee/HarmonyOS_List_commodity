export default class OrderStore {
  private static pendingShipCount: number = 0;
  private static listeners: Array<() => void> = [];

  static getPendingShipCount(): number {
    return OrderStore.pendingShipCount;
  }

  static setPendingShipCount(count: number): void {
    OrderStore.pendingShipCount = Math.max(0, Math.floor(count));
    OrderStore.notifyListeners();
  }

  static incrementPendingShipCount(by: number = 1): void {
    OrderStore.pendingShipCount = Math.max(0, OrderStore.pendingShipCount + Math.floor(by));
    OrderStore.notifyListeners();
  }

  static clearPendingShipCount(): void {
    OrderStore.pendingShipCount = 0;
    OrderStore.notifyListeners();
  }

  static subscribe(cb: () => void): void {
    if (!cb) return;
    OrderStore.listeners.push(cb);
  }

  static unsubscribe(cb: () => void): void {
    if (!cb) return;
    OrderStore.listeners = OrderStore.listeners.filter((l) => l !== cb);
  }

  private static notifyListeners(): void {
    try {
      OrderStore.listeners.forEach((l) => {
        try {
          l();
        } catch (e) {
          console.error('OrderStore listener error:', String(e));
        }
      });
    } catch (err) {
      console.error('OrderStore notify failed:', String(err));
    }
  }
}
