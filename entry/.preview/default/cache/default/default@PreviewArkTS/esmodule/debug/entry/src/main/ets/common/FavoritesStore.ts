import type { GoodsListItemType } from '../viewmodel/InitialData';
import StorageUtil from "@bundle:com.example.list_harmony/entry/ets/common/StorageUtil";
export interface FavoriteItem {
    product: GoodsListItemType;
}
export default class FavoritesStore {
    private static favorites: FavoriteItem[] = [];
    private static readonly STORAGE_KEY: string = 'app.favorites';
    private static listeners: Array<() => void> = [];
    // 异步初始化：在应用入口处调用 FavoritesStore.init() 恢复持久化数据
    static async init(): Promise<void> {
        try {
            const raw = await StorageUtil.getString(FavoritesStore.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as FavoriteItem[];
                if (Array.isArray(parsed))
                    FavoritesStore.favorites = parsed;
            }
        }
        catch (e) {
            console.error('FavoritesStore loadFromStorage failed:', String(e));
        }
    }
    static add(product: GoodsListItemType): void {
        const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
        if (idx < 0) {
            FavoritesStore.favorites.push({ product });
            try {
                const json = JSON.stringify(FavoritesStore.favorites);
                StorageUtil.putString(FavoritesStore.STORAGE_KEY, json);
                console.info(`[FavoritesStore] persisted key=${FavoritesStore.STORAGE_KEY} value=${json}`);
            }
            catch (e) {
                console.error('FavoritesStore persist failed:', String(e));
            }
            FavoritesStore.notifyListeners();
        }
    }
    static remove(productId: number): void {
        FavoritesStore.favorites = FavoritesStore.favorites.filter((f: FavoriteItem) => f.product.id !== productId);
        try {
            const json = JSON.stringify(FavoritesStore.favorites);
            StorageUtil.putString(FavoritesStore.STORAGE_KEY, json);
            console.info(`[FavoritesStore] persisted key=${FavoritesStore.STORAGE_KEY} value=${json}`);
        }
        catch (e) {
            console.error('FavoritesStore persist failed:', String(e));
        }
        FavoritesStore.notifyListeners();
    }
    static toggle(product: GoodsListItemType): boolean {
        const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
        if (idx >= 0) {
            FavoritesStore.favorites.splice(idx, 1);
            try {
                const json = JSON.stringify(FavoritesStore.favorites);
                StorageUtil.putString(FavoritesStore.STORAGE_KEY, json);
                console.info(`[FavoritesStore] persisted key=${FavoritesStore.STORAGE_KEY} value=${json}`);
            }
            catch (e) {
                console.error('FavoritesStore persist failed:', String(e));
            }
            FavoritesStore.notifyListeners();
            return false;
        }
        else {
            FavoritesStore.favorites.push({ product });
            try {
                const json = JSON.stringify(FavoritesStore.favorites);
                StorageUtil.putString(FavoritesStore.STORAGE_KEY, json);
                console.info(`[FavoritesStore] persisted key=${FavoritesStore.STORAGE_KEY} value=${json}`);
            }
            catch (e) {
                console.error('FavoritesStore persist failed:', String(e));
            }
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
        try {
            StorageUtil.remove(FavoritesStore.STORAGE_KEY);
            console.info(`[FavoritesStore] cleared key=${FavoritesStore.STORAGE_KEY}`);
        }
        catch (e) {
            console.error('FavoritesStore clear persist failed:', String(e));
        }
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
