import type { GoodsListItemType } from '../viewmodel/InitialData';
import StorageUtil from "@bundle:com.example.list_harmony/entry/ets/common/StorageUtil";
export interface CartItem {
    product: GoodsListItemType;
    quantity: number;
}
export default class CartStore {
    private static cart: CartItem[] = [];
    private static readonly STORAGE_KEY: string = 'app.cart';
    private static listeners: Array<() => void> = [];
    // 异步初始化：在应用入口处调用 CartStore.init() 恢复持久化数据
    static async init(): Promise<void> {
        try {
            const raw = await StorageUtil.getString(CartStore.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as CartItem[];
                if (Array.isArray(parsed))
                    CartStore.cart = parsed;
            }
        }
        catch (e) {
            console.error('CartStore loadFromStorage failed:', String(e));
        }
    }
    static add(product: GoodsListItemType): void {
        const idx: number = CartStore.cart.findIndex((c: CartItem) => c.product.id === product.id);
        if (idx >= 0) {
            CartStore.cart[idx].quantity += 1;
        }
        else {
            CartStore.cart.push({ product, quantity: 1 });
        }
        try {
            const json = JSON.stringify(CartStore.cart);
            StorageUtil.putString(CartStore.STORAGE_KEY, json);
            console.info(`[CartStore] persisted key=${CartStore.STORAGE_KEY} value=${json}`);
        }
        catch (e) {
            console.error('CartStore persist failed:', String(e));
        }
        CartStore.notifyListeners();
    }
    static getItems(): CartItem[] {
        return CartStore.cart.slice();
    }
    static clear(): void {
        CartStore.cart = [];
        try {
            StorageUtil.remove(CartStore.STORAGE_KEY);
            console.info(`[CartStore] cleared key=${CartStore.STORAGE_KEY}`);
        }
        catch (e) {
            console.error('CartStore clear persist failed:', String(e));
        }
        CartStore.notifyListeners();
    }
    static subscribe(cb: () => void): void {
        if (!cb)
            return;
        CartStore.listeners.push(cb);
    }
    static unsubscribe(cb: () => void): void {
        if (!cb)
            return;
        CartStore.listeners = CartStore.listeners.filter((l) => l !== cb);
    }
    private static notifyListeners(): void {
        try {
            CartStore.listeners.forEach((l) => {
                try {
                    l();
                }
                catch (e) {
                    console.error('CartStore listener error:', String(e));
                }
            });
        }
        catch (err) {
            console.error('CartStore notify failed:', String(err));
        }
    }
}
