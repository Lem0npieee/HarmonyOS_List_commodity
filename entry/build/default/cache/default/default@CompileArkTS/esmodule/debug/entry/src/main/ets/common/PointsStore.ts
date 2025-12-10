import type dataPreferences from "@ohos:data.preferences";
type PointsListener = () => void;
const POINTS_KEY: string = 'points_balance';
export default class PointsStore {
    private static prefs?: dataPreferences.Preferences;
    private static balance: number = 0;
    private static listeners: PointsListener[] = [];
    static async init(prefs: dataPreferences.Preferences): Promise<void> {
        PointsStore.prefs = prefs;
        PointsStore.balance = await PointsStore.loadBalance();
    }
    static getPoints(): number {
        return Math.round(PointsStore.balance * 10) / 10;
    }
    static subscribe(listener: PointsListener): void {
        if (PointsStore.listeners.indexOf(listener) >= 0) {
            return;
        }
        PointsStore.listeners.push(listener);
    }
    static unsubscribe(listener: PointsListener): void {
        const index: number = PointsStore.listeners.indexOf(listener);
        if (index >= 0) {
            PointsStore.listeners.splice(index, 1);
        }
    }
    private static notify(): void {
        PointsStore.listeners.forEach((listener: PointsListener) => {
            try {
                listener();
            }
            catch (err) {
                console.error('PointsStore listener error:', String(err));
            }
        });
    }
    static hasEnough(cost: number): boolean {
        return PointsStore.balance + 1e-6 >= cost;
    }
    static async addPoints(amount: number): Promise<void> {
        if (!PointsStore.prefs) {
            return;
        }
        const normalized: number = Math.max(0, Math.round(amount * 10) / 10);
        if (normalized <= 0) {
            return;
        }
        PointsStore.balance = Math.round((PointsStore.balance + normalized) * 10) / 10;
        await PointsStore.persist();
        PointsStore.notify();
    }
    static async spendPoints(cost: number): Promise<boolean> {
        if (!PointsStore.prefs) {
            return false;
        }
        const normalized: number = Math.max(0, Math.round(cost * 10) / 10);
        if (normalized <= 0) {
            return true;
        }
        if (!PointsStore.hasEnough(normalized)) {
            return false;
        }
        PointsStore.balance = Math.round((PointsStore.balance - normalized) * 10) / 10;
        await PointsStore.persist();
        PointsStore.notify();
        return true;
    }
    private static async loadBalance(): Promise<number> {
        if (!PointsStore.prefs) {
            return 0;
        }
        try {
            const stored: string = (await PointsStore.prefs.get(POINTS_KEY, '0')) as string;
            const parsed: number = Number(stored);
            if (!Number.isNaN(parsed)) {
                return parsed;
            }
        }
        catch (err) {
            console.error('读取积分失败:', String(err));
        }
        return 0;
    }
    private static async persist(): Promise<void> {
        if (!PointsStore.prefs) {
            return;
        }
        try {
            await PointsStore.prefs.put(POINTS_KEY, PointsStore.balance.toString());
            await PointsStore.prefs.flush();
        }
        catch (err) {
            console.error('保存积分失败:', String(err));
        }
    }
}
