import type { GoodsListItemType } from '../viewmodel/InitialData';
export interface CartItem {
    product: GoodsListItemType;
    quantity: number;
}
export default class CartStore {
    private static cart: CartItem[] = [];
    static add(product: GoodsListItemType): void {
        const idx: number = CartStore.cart.findIndex((c: CartItem) => c.product.id === product.id);
        if (idx >= 0) {
            CartStore.cart[idx].quantity += 1;
        }
        else {
            CartStore.cart.push({ product, quantity: 1 });
        }
    }
    static getItems(): CartItem[] {
        return CartStore.cart.slice();
    }
    static clear(): void {
        CartStore.cart = [];
    }
}
