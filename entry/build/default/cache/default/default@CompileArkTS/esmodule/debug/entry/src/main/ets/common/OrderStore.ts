export type OrderStatus = 'pendingShip' | 'shipped' | 'arrived' | 'completed';
export default class OrderStore {
    private static pendingShipCount: number = 0;
    private static pendingReceiveCount: number = 0; // 待收货
    private static orderStatusMap: Map<number | string, OrderStatus> = new Map();
    private static listeners: Array<() => void> = [];
    static getPendingShipCount(): number {
        return OrderStore.pendingShipCount;
    }
    static getPendingReceiveCount(): number {
        return OrderStore.pendingReceiveCount;
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
        if (!id)
            return;
        const existing = OrderStore.orderStatusMap.get(id);
        if (existing === 'pendingShip')
            return;
        OrderStore.orderStatusMap.set(id, 'pendingShip');
        OrderStore.setPendingShipCount(OrderStore.pendingShipCount + 1);
    }
    // 标记为已发货：如果之前是待发货则 pendingShip -1
    static markShipped(id: number | string): void {
        if (!id)
            return;
        const existing = OrderStore.orderStatusMap.get(id);
        if (existing === 'pendingShip') {
            OrderStore.setPendingShipCount(OrderStore.pendingShipCount - 1);
        }
        OrderStore.orderStatusMap.set(id, 'shipped');
    }
    // 标记为已到货：如果之前是已发货/待发货则增加待收货计数（避免重复增加）
    static markArrived(id: number | string): void {
        if (!id)
            return;
        const existing = OrderStore.orderStatusMap.get(id);
        // 如果还没有记录或已经是 arrived/completed，则不重复处理
        if (existing === 'arrived' || existing === 'completed')
            return;
        // 如果之前是 pendingShip，则先减少 pendingShip
        if (existing === 'pendingShip') {
            OrderStore.setPendingShipCount(OrderStore.pendingShipCount - 1);
        }
        // 增加待收货
        OrderStore.setPendingReceiveCount(OrderStore.pendingReceiveCount + 1);
        OrderStore.orderStatusMap.set(id, 'arrived');
    }
    // 用户确认收货后调用，减少待收货
    static confirmReceived(id: number | string): void {
        if (!id)
            return;
        const existing = OrderStore.orderStatusMap.get(id);
        if (existing === 'arrived') {
            OrderStore.setPendingReceiveCount(OrderStore.pendingReceiveCount - 1);
            OrderStore.orderStatusMap.set(id, 'completed');
        }
    }
    static clearAll(): void {
        OrderStore.pendingShipCount = 0;
        OrderStore.pendingReceiveCount = 0;
        OrderStore.orderStatusMap.clear();
        OrderStore.notifyListeners();
    }
    static subscribe(cb: () => void): void {
        if (!cb)
            return;
        OrderStore.listeners.push(cb);
    }
    static unsubscribe(cb: () => void): void {
        if (!cb)
            return;
        OrderStore.listeners = OrderStore.listeners.filter((l) => l !== cb);
    }
    private static notifyListeners(): void {
        try {
            OrderStore.listeners.forEach((l) => {
                try {
                    l();
                }
                catch (e) {
                    console.error('OrderStore listener error:', String(e));
                }
            });
        }
        catch (err) {
            console.error('OrderStore notify failed:', String(err));
        }
    }
}
