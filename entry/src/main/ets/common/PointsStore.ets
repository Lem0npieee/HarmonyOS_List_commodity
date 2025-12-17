import dataPreferences from '@ohos.data.preferences';
import AuthStore from './AuthStore';

type PointsListener = () => void;

const POINTS_KEY: string = 'points_balance';

export default class PointsStore {
  private static allData: Record<string, number> = {};
  private static prefs?: dataPreferences.Preferences;
  private static balance: number = 0;
  private static listeners: PointsListener[] = [];

  static async init(prefs: dataPreferences.Preferences): Promise<void> {
    PointsStore.prefs = prefs;
    await PointsStore.restore();
    AuthStore.subscribe(() => PointsStore.switchUser());
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
      } catch (err) {
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
    const key = PointsStore.userKey();
    const value = PointsStore.allData[key];
    if (typeof value === 'number') {
      return value;
    }
    return 0;
  }

  private static async persist(): Promise<void> {
    if (!PointsStore.prefs) {
      return;
    }
    try {
      PointsStore.allData[PointsStore.userKey()] = PointsStore.balance;
      await PointsStore.prefs.put(POINTS_KEY, JSON.stringify(PointsStore.allData));
      await PointsStore.prefs.flush();
    } catch (err) {
      console.error('保存积分失败:', String(err));
    }
  }

  private static async restore(): Promise<void> {
    if (!PointsStore.prefs) {
      return;
    }
    try {
      const stored = await PointsStore.prefs.get(POINTS_KEY, '{}');
      const raw: string = typeof stored === 'string' ? stored : JSON.stringify(stored);
      const parsed = JSON.parse(raw) as Record<string, number> | number;
      if (typeof parsed === 'number') {
        PointsStore.allData['__guest__'] = parsed;
      } else if (parsed && typeof parsed === 'object') {
        PointsStore.allData = parsed as Record<string, number>;
      }
      PointsStore.balance = await PointsStore.loadBalance();
      PointsStore.notify();
    } catch (err) {
      console.error('读取积分失败:', String(err));
    }
  }

  private static switchUser(): void {
    PointsStore.balance = Math.round((PointsStore.loadBalanceSync()) * 10) / 10;
    PointsStore.notify();
  }

  private static loadBalanceSync(): number {
    const key = PointsStore.userKey();
    const value = PointsStore.allData[key];
    if (typeof value === 'number') {
      return value;
    }
    return 0;
  }

  private static userKey(): string {
    const phone = AuthStore.getCurrentPhone ? AuthStore.getCurrentPhone().trim() : '';
    return phone.length > 0 ? phone : '__guest__';
  }
}
