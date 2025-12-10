import type dataPreferences from "@ohos:data.preferences";
import { goodsPool } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
import type { GoodsListItemType } from "@bundle:com.example.list_harmony/entry/ets/viewmodel/InitialData";
type Preferences = dataPreferences.Preferences;
export interface StoredReviewRecord {
    goodsId: number;
    user: string;
    level: string;
    rating: number;
    content: string;
    spec: string;
    createdAt: number;
}
interface PersistedReviewBucket {
    id: string;
    entries: StoredReviewRecord[];
}
interface PersistedReviewState {
    pendingIds: string[];
    reviews: PersistedReviewBucket[];
}
export default class ReviewStore {
    private static pendingReviewIds: Set<string> = new Set();
    private static reviewsByGoods: Map<string, StoredReviewRecord[]> = new Map();
    private static listeners: Array<() => void> = [];
    private static preferences: Preferences | null = null;
    private static readonly REVIEW_KEY: string = 'review_state';
    private static initialized: boolean = false;
    static async init(preferences: Preferences): Promise<void> {
        if (ReviewStore.initialized) {
            return;
        }
        ReviewStore.preferences = preferences;
        await ReviewStore.restoreFromStorage();
        ReviewStore.initialized = true;
    }
    static subscribe(cb: () => void): void {
        if (!cb) {
            return;
        }
        ReviewStore.listeners.push(cb);
    }
    static unsubscribe(cb: () => void): void {
        if (!cb) {
            return;
        }
        ReviewStore.listeners = ReviewStore.listeners.filter((listener: () => void) => listener !== cb);
    }
    static getPendingReviewCount(): number {
        return ReviewStore.pendingReviewIds.size;
    }
    static getPendingReviewItems(): GoodsListItemType[] {
        const items: GoodsListItemType[] = [];
        ReviewStore.pendingReviewIds.forEach((id: string) => {
            const resolved = ReviewStore.resolveProductById(id);
            if (resolved) {
                items.push(resolved);
            }
        });
        return items;
    }
    static addPendingReview(id: number | string): void {
        if (!id) {
            return;
        }
        const key = String(id);
        if (ReviewStore.pendingReviewIds.has(key)) {
            return;
        }
        ReviewStore.pendingReviewIds.add(key);
        ReviewStore.notifyListeners();
        ReviewStore.persist();
    }
    static submitReview(goods: GoodsListItemType, rating: number, content: string, spec?: string): boolean {
        if (!goods) {
            return false;
        }
        const trimmed = content.trim();
        if (!trimmed) {
            return false;
        }
        const normalizedRating = Math.max(1, Math.min(5, Math.floor(rating)));
        const key = String(goods.id);
        const review: StoredReviewRecord = {
            goodsId: goods.id,
            user: 'tbNick_04ies',
            level: '黄金会员',
            rating: normalizedRating,
            content: trimmed,
            spec: spec ?? goods.specifications?.[0] ?? '默认规格',
            createdAt: Date.now()
        };
        const existing = ReviewStore.reviewsByGoods.get(key) ?? [];
        ReviewStore.reviewsByGoods.set(key, [review, ...existing]);
        if (ReviewStore.pendingReviewIds.has(key)) {
            ReviewStore.pendingReviewIds.delete(key);
        }
        ReviewStore.notifyListeners();
        ReviewStore.persist();
        return true;
    }
    static getReviewsForGoods(goodsId: number | string): StoredReviewRecord[] {
        const key = String(goodsId);
        return ReviewStore.reviewsByGoods.get(key) ?? [];
    }
    private static notifyListeners(): void {
        try {
            ReviewStore.listeners.forEach((listener: () => void) => {
                try {
                    listener();
                }
                catch (err) {
                    console.error('ReviewStore listener failed:', String(err));
                }
            });
        }
        catch (err) {
            console.error('ReviewStore notify failed:', String(err));
        }
    }
    private static async restoreFromStorage(): Promise<void> {
        if (!ReviewStore.preferences) {
            return;
        }
        try {
            const storedValue = await ReviewStore.preferences.get(ReviewStore.REVIEW_KEY, '{"pendingIds":[],"reviews":[]}');
            const raw: string = typeof storedValue === 'string' ? storedValue : JSON.stringify(storedValue);
            if (!raw) {
                return;
            }
            const parsed = JSON.parse(raw) as PersistedReviewState;
            const pendingIds = parsed?.pendingIds ?? [];
            ReviewStore.pendingReviewIds = new Set(pendingIds.map((value: string) => String(value)));
            const buckets = parsed?.reviews ?? [];
            ReviewStore.reviewsByGoods.clear();
            buckets.forEach((bucket: PersistedReviewBucket) => {
                if (!bucket || !bucket.id) {
                    return;
                }
                ReviewStore.reviewsByGoods.set(String(bucket.id), bucket.entries ?? []);
            });
            ReviewStore.notifyListeners();
        }
        catch (err) {
            console.error('ReviewStore restore failed:', String(err));
        }
    }
    private static persist(): void {
        if (!ReviewStore.preferences) {
            return;
        }
        const payload: PersistedReviewState = {
            pendingIds: Array.from(ReviewStore.pendingReviewIds.values()),
            reviews: Array.from(ReviewStore.reviewsByGoods.entries()).map((entry: [
                string,
                StoredReviewRecord[]
            ]): PersistedReviewBucket => ({
                id: entry[0],
                entries: entry[1]
            }))
        };
        ReviewStore.preferences.put(ReviewStore.REVIEW_KEY, JSON.stringify(payload))
            .then(() => ReviewStore.preferences?.flush())
            .catch((err: Error) => console.error('ReviewStore persist failed:', String(err)));
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
