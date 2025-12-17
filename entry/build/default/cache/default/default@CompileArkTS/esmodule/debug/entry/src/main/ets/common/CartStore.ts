import type dataPreferences from "@ohos:data.preferences";
import { goodsPool } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { GoodsListItemType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import { pointsGoodsPool } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/PointsGoodsData";
type Preferences = dataPreferences.Preferences;
interface StoredCartEntry {
    id: number;
    quantity: number;
}
export interface CartItem {
    product: GoodsListItemType;
    quantity: number;
}
export default class CartStore {
    private static cart: CartItem[] = [];
    private static listeners: Array<() => void> = [];
    private static preferences: Preferences | null = null;
    private static readonly CART_KEY: string = 'cart_items';
    private static initialized: boolean = false;
    static async init(preferences: Preferences): Promise<void> {
        if (CartStore.initialized) {
            return;
        }
        CartStore.preferences = preferences;
        await CartStore.restoreFromStorage();
        CartStore.initialized = true;
    }
    static add(product: GoodsListItemType): void {
        const idx: number = CartStore.cart.findIndex((c: CartItem) => c.product.id === product.id);
        if (idx >= 0) {
            CartStore.cart[idx].quantity += 1;
        }
        else {
            CartStore.cart.push({ product, quantity: 1 });
        }
        CartStore.persist();
        CartStore.notifyListeners();
    }
    static getItems(): CartItem[] {
        return CartStore.cart.slice();
    }
    static clear(): void {
        CartStore.cart = [];
        CartStore.persist();
        CartStore.notifyListeners();
    }
    static removeByIds(ids: number[]): void {
        if (!ids || ids.length === 0) {
            return;
        }
        const idSet: Set<number> = new Set(ids);
        CartStore.cart = CartStore.cart.filter((item: CartItem) => !idSet.has(item.product.id));
        CartStore.persist();
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
    private static async restoreFromStorage(): Promise<void> {
        if (!CartStore.preferences) {
            return;
        }
        try {
            const storedValue = await CartStore.preferences.get(CartStore.CART_KEY, '[]');
            const raw: string = typeof storedValue === 'string' ? storedValue : JSON.stringify(storedValue);
            const parsed = JSON.parse(raw) as StoredCartEntry[];
            const mapped = parsed.map((entry: StoredCartEntry) => {
                const product = CartStore.resolveProductById(entry.id);
                if (!product) {
                    return null;
                }
                const item: CartItem = { product: product, quantity: entry.quantity };
                return item;
            });
            const restored = mapped.filter((item) => item !== null) as CartItem[];
            CartStore.cart = restored;
            CartStore.notifyListeners();
        }
        catch (e) {
            console.error('CartStore restore failed:', String(e));
        }
    }
    private static persist(): void {
        if (!CartStore.preferences) {
            return;
        }
        const payload: StoredCartEntry[] = CartStore.cart.map((item: CartItem) => {
            const entry: StoredCartEntry = { id: item.product.id, quantity: item.quantity };
            return entry;
        });
        CartStore.preferences.put(CartStore.CART_KEY, JSON.stringify(payload))
            .then(() => CartStore.preferences?.flush())
            .catch((err: Error) => console.error('CartStore persist failed:', String(err)));
    }
    private static resolveProductById(id: number): GoodsListItemType | null {
        const product = goodsPool.find((item: GoodsListItemType) => item.id === id)
            ?? pointsGoodsPool.find((item: GoodsListItemType) => item.id === id);
        return product ?? null;
    }
}
