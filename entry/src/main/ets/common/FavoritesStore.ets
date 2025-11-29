import dataPreferences from '@ohos.data.preferences';
import { GoodsListItemType, goodsPool } from '../viewmodel/InitialData';

type Preferences = dataPreferences.Preferences;

interface StoredFavoriteEntry {
  id: number;
}

export interface FavoriteItem {
  product: GoodsListItemType;
}

export default class FavoritesStore {
  private static favorites: FavoriteItem[] = [];
  private static listeners: Array<() => void> = [];
  private static preferences: Preferences | null = null;
  private static readonly FAVORITES_KEY: string = 'favorite_items';
  private static initialized: boolean = false;

  static async init(preferences: Preferences): Promise<void> {
    if (FavoritesStore.initialized) {
      return;
    }
    FavoritesStore.preferences = preferences;
    await FavoritesStore.restoreFromStorage();
    FavoritesStore.initialized = true;
  }

  static add(product: GoodsListItemType): void {
    const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
    if (idx < 0) {
      FavoritesStore.favorites.push({ product });
      FavoritesStore.persist();
      FavoritesStore.notifyListeners();
    }
  }

  static remove(productId: number): void {
    FavoritesStore.favorites = FavoritesStore.favorites.filter((f: FavoriteItem) => f.product.id !== productId);
    FavoritesStore.persist();
    FavoritesStore.notifyListeners();
  }

  static toggle(product: GoodsListItemType): boolean {
    const idx: number = FavoritesStore.favorites.findIndex((f: FavoriteItem) => f.product.id === product.id);
    if (idx >= 0) {
      FavoritesStore.favorites.splice(idx, 1);
      FavoritesStore.persist();
      FavoritesStore.notifyListeners();
      return false;
    } else {
      FavoritesStore.favorites.push({ product });
      FavoritesStore.persist();
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
    FavoritesStore.persist();
    FavoritesStore.notifyListeners();
  }

  static subscribe(cb: () => void): void {
    if (!cb) return;
    FavoritesStore.listeners.push(cb);
  }

  static unsubscribe(cb: () => void): void {
    if (!cb) return;
    FavoritesStore.listeners = FavoritesStore.listeners.filter((l) => l !== cb);
  }

  private static notifyListeners(): void {
    try {
      FavoritesStore.listeners.forEach((l) => {
        try {
          l();
        } catch (e) {
          console.error('FavoritesStore listener error:', String(e));
        }
      });
    } catch (err) {
      console.error('Notify listeners failed:', String(err));
    }
  }

  private static async restoreFromStorage(): Promise<void> {
    if (!FavoritesStore.preferences) {
      return;
    }
    try {
      const storedValue = await FavoritesStore.preferences.get(FavoritesStore.FAVORITES_KEY, '[]');
      const raw: string = typeof storedValue === 'string' ? storedValue : JSON.stringify(storedValue);
      const parsed = JSON.parse(raw) as StoredFavoriteEntry[];
      const mapped = parsed.map((entry: StoredFavoriteEntry) => {
        const product = FavoritesStore.resolveProductById(entry.id);
        if (!product) return null;
        const fav: FavoriteItem = { product };
        return fav;
      });
      const restored = mapped.filter((item) => item !== null) as FavoriteItem[];
      FavoritesStore.favorites = restored;
      FavoritesStore.notifyListeners();
    } catch (e) {
      console.error('FavoritesStore restore failed:', String(e));
    }
  }

  private static persist(): void {
    if (!FavoritesStore.preferences) {
      return;
    }
    const payload: StoredFavoriteEntry[] = FavoritesStore.favorites.map((item: FavoriteItem) => {
      const entry: StoredFavoriteEntry = { id: item.product.id };
      return entry;
    });
    FavoritesStore.preferences.put(FavoritesStore.FAVORITES_KEY, JSON.stringify(payload))
      .then(() => FavoritesStore.preferences?.flush())
      .catch((err: Error) => console.error('FavoritesStore persist failed:', String(err)));
  }

  private static resolveProductById(id: number): GoodsListItemType | null {
    const product = goodsPool.find((item: GoodsListItemType) => item.id === id);
    return product ?? null;
  }
}
