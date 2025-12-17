import dataPreferences from '@ohos.data.preferences';
import { GoodsListItemType, goodsPool } from '../viewmodel/InitialData';
import { pointsGoodsPool } from '../viewmodel/PointsGoodsData';
import AuthStore from './AuthStore';

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
  private static allData: Record<string, StoredCartEntry[]> = {};
  private static cart: CartItem[] = [];
  private static listeners: Array<() => void> = [];
  private static preferences: Preferences | null = null;
  private static readonly CART_KEY: string = 'cart_items_v2';
  private static initialized: boolean = false;

  static async init(preferences: Preferences): Promise<void> {
    if (CartStore.initialized) {
      return;
    }
    CartStore.preferences = preferences;
    await CartStore.restoreFromStorage();
    AuthStore.subscribe(() => CartStore.switchUser());
    CartStore.initialized = true;
  }

  static add(product: GoodsListItemType): void {
    const idx: number = CartStore.cart.findIndex((c: CartItem) => c.product.id === product.id);
    if (idx >= 0) {
      CartStore.cart[idx].quantity += 1;
    } else {
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
    if (!cb) return;
    CartStore.listeners.push(cb);
  }

  static unsubscribe(cb: () => void): void {
    if (!cb) return;
    CartStore.listeners = CartStore.listeners.filter((l) => l !== cb);
  }

  private static notifyListeners(): void {
    try {
      CartStore.listeners.forEach((l) => {
        try {
          l();
        } catch (e) {
          console.error('CartStore listener error:', String(e));
        }
      });
    } catch (err) {
      console.error('CartStore notify failed:', String(err));
    }
  }

  private static async restoreFromStorage(): Promise<void> {
    if (!CartStore.preferences) {
      return;
    }
    try {
      const storedValue = await CartStore.preferences.get(CartStore.CART_KEY, '{}');
      const raw: string = typeof storedValue === 'string' ? storedValue : JSON.stringify(storedValue);
      const parsed = JSON.parse(raw) as Record<string, StoredCartEntry[]> | StoredCartEntry[];
      if (Array.isArray(parsed)) {
        CartStore.allData['__guest__'] = parsed;
      } else if (parsed && typeof parsed === 'object') {
        CartStore.allData = parsed;
      }
      CartStore.switchUser();
    } catch (e) {
      console.error('CartStore restore failed:', String(e));
    }
  }

  private static switchUser(): void {
    const key = CartStore.userKey();
    const list = CartStore.allData[key] ?? [];
    CartStore.cart = CartStore.deserialize(list);
    CartStore.notifyListeners();
  }

  private static persist(): void {
    if (!CartStore.preferences) {
      return;
    }
    const payload: StoredCartEntry[] = CartStore.cart.map((item: CartItem) => {
      const entry: StoredCartEntry = { id: item.product.id, quantity: item.quantity } as StoredCartEntry;
      return entry;
    });
    CartStore.allData[CartStore.userKey()] = payload;
    CartStore.preferences.put(CartStore.CART_KEY, JSON.stringify(CartStore.allData))
      .then(() => CartStore.preferences?.flush())
      .catch((err: Error) => console.error('CartStore persist failed:', String(err)));
  }

  private static deserialize(entries: StoredCartEntry[]): CartItem[] {
    const mapped = entries.map((entry: StoredCartEntry) => {
      const product = CartStore.resolveProductById(entry.id);
      if (!product) {
        return null;
      }
      const item: CartItem = { product: product, quantity: entry.quantity };
      return item;
    });
    return mapped.filter((item) => item !== null) as CartItem[];
  }

  private static userKey(): string {
    const phone = AuthStore.getCurrentPhone ? AuthStore.getCurrentPhone().trim() : '';
    return phone.length > 0 ? phone : '__guest__';
  }

  private static resolveProductById(id: number): GoodsListItemType | null {
    const product = goodsPool.find((item: GoodsListItemType) => item.id === id)
      ?? pointsGoodsPool.find((item: GoodsListItemType) => item.id === id);
    return product ?? null;
  }
}
