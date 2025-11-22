import { GoodsListItemType } from '../viewmodel/InitialData';

export interface CartItem {
  product: GoodsListItemType;
  quantity: number;
}

export default class CartStore {
  private static cart: CartItem[] = [];
  private static listeners: Array<() => void> = [];

  static add(product: GoodsListItemType): void {
    const idx: number = CartStore.cart.findIndex((c: CartItem) => c.product.id === product.id);
    if (idx >= 0) {
      CartStore.cart[idx].quantity += 1;
    } else {
      CartStore.cart.push({ product, quantity: 1 });
    }
    CartStore.notifyListeners();
  }

  static getItems(): CartItem[] {
    return CartStore.cart.slice();
  }

  static clear(): void {
    CartStore.cart = [];
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
}
