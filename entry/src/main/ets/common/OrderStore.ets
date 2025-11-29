import dataPreferences from '@ohos.data.preferences';
import { GoodsListItemType, goodsPool } from '../viewmodel/InitialData';
import ReviewStore from './ReviewStore';

type Preferences = dataPreferences.Preferences;

export type OrderStatus = 'pendingShip' | 'shipped' | 'arrived' | 'completed';

interface OrderStatusRecord {
  id: string;
  status: OrderStatus;
}

interface PersistedOrderState {
  pendingShipCount: number;
  pendingReceiveCount: number;
  statuses: OrderStatusRecord[];
}

export default class OrderStore {
  private static pendingShipCount: number = 0;
  private static pendingReceiveCount: number = 0; // 待收货
  private static orderStatusMap: Map<string, OrderStatus> = new Map();
  private static listeners: Array<() => void> = [];
  private static preferences: Preferences | null = null;
  private static readonly ORDER_KEY: string = 'order_state';
  private static initialized: boolean = false;

  static async init(preferences: Preferences): Promise<void> {
    if (OrderStore.initialized) {
      return;
    }
    OrderStore.preferences = preferences;
    await OrderStore.restoreFromStorage();
    OrderStore.initialized = true;
  }

  static getPendingShipCount(): number {
    return OrderStore.pendingShipCount;
  }

  static getPendingReceiveCount(): number {
    return OrderStore.pendingReceiveCount;
  }

  static getPendingReceiveItems(): GoodsListItemType[] {
    const items: GoodsListItemType[] = [];
    OrderStore.orderStatusMap.forEach((status: OrderStatus, key: string) => {
      if (status === 'arrived') {
        const resolved = OrderStore.resolveProductById(key);
        if (resolved) {
          items.push(resolved);
        }
      }
    });
    return items;
  }

  private static setPendingShipCount(count: number): void {
    OrderStore.pendingShipCount = Math.max(0, Math.floor(count));
    OrderStore.notifyListeners();
  }

  private static setPendingReceiveCount(count: number): void {
    OrderStore.pendingReceiveCount = Math.max(0, Math.floor(count));
    OrderStore.notifyListeners();
  }

  // 以订单 id 增加待发货（下单时调用）
  static addOrderPendingShip(id: number | string): void {
    if (!id) return;
    const key = String(id);
    const existing = OrderStore.orderStatusMap.get(key);
    if (existing === 'pendingShip') return;
    OrderStore.orderStatusMap.set(key, 'pendingShip');
    OrderStore.setPendingShipCount(OrderStore.pendingShipCount + 1);
    OrderStore.persist();
  }

  // 标记为已发货：如果之前是待发货则 pendingShip -1
  static markShipped(id: number | string): void {
    if (!id) return;
    const key = String(id);
    const existing = OrderStore.orderStatusMap.get(key);
    if (existing === 'pendingShip') {
      OrderStore.setPendingShipCount(OrderStore.pendingShipCount - 1);
    }
    OrderStore.orderStatusMap.set(key, 'shipped');
    OrderStore.persist();
  }

  // 标记为已到货：如果之前是已发货/待发货则增加待收货计数（避免重复增加）
  static markArrived(id: number | string): void {
    if (!id) return;
    const key = String(id);
    const existing = OrderStore.orderStatusMap.get(key);
    // 如果还没有记录或已经是 arrived/completed，则不重复处理
    if (existing === 'arrived' || existing === 'completed') return;
    // 如果之前是 pendingShip，则先减少 pendingShip
    if (existing === 'pendingShip') {
      OrderStore.setPendingShipCount(OrderStore.pendingShipCount - 1);
    }
    // 增加待收货
    OrderStore.setPendingReceiveCount(OrderStore.pendingReceiveCount + 1);
    OrderStore.orderStatusMap.set(key, 'arrived');
    ReviewStore.addPendingReview(key);
    OrderStore.persist();
  }

  // 用户确认收货后调用，减少待收货
  static confirmReceived(id: number | string): void {
    if (!id) return;
    const key = String(id);
    const existing = OrderStore.orderStatusMap.get(key);
    if (existing === 'arrived') {
      OrderStore.setPendingReceiveCount(OrderStore.pendingReceiveCount - 1);
      OrderStore.orderStatusMap.set(key, 'completed');
      OrderStore.persist();
    }
  }

  static clearAll(): void {
    OrderStore.pendingShipCount = 0;
    OrderStore.pendingReceiveCount = 0;
    OrderStore.orderStatusMap.clear();
    OrderStore.notifyListeners();
    OrderStore.persist();
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

  private static async restoreFromStorage(): Promise<void> {
    if (!OrderStore.preferences) {
      return;
    }
    try {
      const storedValue = await OrderStore.preferences.get(
        OrderStore.ORDER_KEY,
        '{"pendingShipCount":0,"pendingReceiveCount":0,"statuses":[]}'
      );
      const raw: string = typeof storedValue === 'string' ? storedValue : JSON.stringify(storedValue);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as PersistedOrderState;
      OrderStore.pendingShipCount = parsed?.pendingShipCount ?? 0;
      OrderStore.pendingReceiveCount = parsed?.pendingReceiveCount ?? 0;
      const entries = (parsed?.statuses ?? []).map<[string, OrderStatus]>((record: OrderStatusRecord) => [record.id, record.status]);
      OrderStore.orderStatusMap = new Map(entries);
      OrderStore.notifyListeners();
    } catch (e) {
      console.error('OrderStore restore failed:', String(e));
    }
  }

  private static persist(): void {
    if (!OrderStore.preferences) {
      return;
    }
    const payload: PersistedOrderState = {
      pendingShipCount: OrderStore.pendingShipCount,
      pendingReceiveCount: OrderStore.pendingReceiveCount,
      statuses: Array.from(OrderStore.orderStatusMap.entries()).map((entry): OrderStatusRecord => ({
        id: entry[0],
        status: entry[1]
      }))
    };
    OrderStore.preferences.put(OrderStore.ORDER_KEY, JSON.stringify(payload))
      .then(() => OrderStore.preferences?.flush())
      .catch((err: Error) => console.error('OrderStore persist failed:', String(err)));
  }

  private static resolveProductById(idKey: string): GoodsListItemType | null {
    const numericId = Number(idKey);
    if (Number.isNaN(numericId)) {
      return null;
    }
    const product = goodsPool.find((item: GoodsListItemType) => item.id === numericId);
    return product ?? null;
  }
}
