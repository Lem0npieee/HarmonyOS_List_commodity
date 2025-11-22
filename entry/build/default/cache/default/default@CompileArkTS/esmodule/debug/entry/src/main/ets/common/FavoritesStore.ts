import type { GoodsListItemType } from '../viewmodel/InitialData';
export interface FavoriteItem {
    product: GoodsListItemType;
}
export default class FavoritesStore {
    private static favorites: FavoriteItem[] = [];
    private static listeners: Array<() => void> = [];
    static add(product: GoodsListItemType): void {
        const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
        if (idx < 0) {
            FavoritesStore.favorites.push({ product });
            FavoritesStore.notifyListeners();
        }
    }
    static remove(productId: number): void {
        FavoritesStore.favorites = FavoritesStore.favorites.filter((f: FavoriteItem) => f.product.id !== productId);
        FavoritesStore.notifyListeners();
    }
    static toggle(product: GoodsListItemType): boolean {
        const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
        if (idx >= 0) {
            FavoritesStore.favorites.splice(idx, 1);
            FavoritesStore.notifyListeners();
            return false;
        }
        else {
            FavoritesStore.favorites.push({ product });
            FavoritesStore.notifyListeners();
            return true;
        }
    }
    static isFavorited(productId: number): boolean {
        return FavoritesStore.favorites.some((f: FavoriteItem) => f.product.id === productId);
    }
    static getItems(): FavoriteItem[] {
        return FavoritesStore.favorites.slice();
    }
    static clear(): void {
        FavoritesStore.favorites = [];
        FavoritesStore.notifyListeners();
    }
    static subscribe(cb: () => void): void {
        if (!cb)
            return;
        FavoritesStore.listeners.push(cb);
    }
    static unsubscribe(cb: () => void): void {
        if (!cb)
            return;
        FavoritesStore.listeners = FavoritesStore.listeners.filter((l) => l !== cb);
    }
    private static notifyListeners(): void {
        try {
            FavoritesStore.listeners.forEach((l) => {
                try {
                    l();
                }
                catch (e) {
                    console.error('FavoritesStore listener error:', String(e));
                }
            });
        }
        catch (err) {
            console.error('Notify listeners failed:', String(err));
        }
    }
}
