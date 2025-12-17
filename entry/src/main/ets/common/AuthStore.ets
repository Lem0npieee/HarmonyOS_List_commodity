import dataPreferences from '@ohos.data.preferences';

export interface UserAccount {
  username: string;
  phone: string;
  password: string;
}

export interface AuthResult {
  ok: boolean;
  message: string;
}

interface StoredAccount {
  username: string;
  phone: string;
  password: string;
}

type Listener = () => void;

const ACCOUNTS_KEY: string = 'auth_accounts';
const CURRENT_PHONE_KEY: string = 'auth_current_phone';

export default class AuthStore {
  private static prefs?: dataPreferences.Preferences;
  private static accounts: UserAccount[] = [];
  private static currentPhone: string | null = null;
  private static listeners: Listener[] = [];

  static async init(prefs: dataPreferences.Preferences): Promise<void> {
    AuthStore.prefs = prefs;
    AuthStore.accounts = await AuthStore.loadAccounts();
    AuthStore.currentPhone = await AuthStore.loadCurrentPhone();
  }

  static isReady(): boolean {
    return AuthStore.prefs !== undefined;
  }

  static isLoggedIn(): boolean {
    return AuthStore.currentPhone !== null && AuthStore.currentPhone.length > 0;
  }

  static getCurrentUser(): UserAccount | null {
    if (!AuthStore.isLoggedIn()) {
      return null;
    }
    return AuthStore.accounts.find((acc: UserAccount) => acc.phone === AuthStore.currentPhone) ?? null;
  }

  static getCurrentPhone(): string {
    return AuthStore.currentPhone ?? '';
  }

  static getCurrentUserName(): string {
    const user: UserAccount | null = AuthStore.getCurrentUser();
    return user !== null ? user.username : '';
  }

  static subscribe(fn: Listener): void {
    if (AuthStore.listeners.indexOf(fn) >= 0) {
      return;
    }
    AuthStore.listeners.push(fn);
  }

  static unsubscribe(fn: Listener): void {
    const idx: number = AuthStore.listeners.indexOf(fn);
    if (idx >= 0) {
      AuthStore.listeners.splice(idx, 1);
    }
  }

  private static notify(): void {
    AuthStore.listeners.forEach((fn: Listener) => {
      try {
        fn();
      } catch (err) {
        console.error('AuthStore listener error:', String(err));
      }
    });
  }

  static async register(username: string, phone: string, password: string): Promise<AuthResult>
  {
    if (!AuthStore.prefs) {
      return { ok: false, message: '存储尚未初始化' };
    }
    if (username.trim().length === 0 || phone.trim().length === 0 || password.trim().length === 0) {
      return { ok: false, message: '请填写完整信息' };
    }
    if (AuthStore.accounts.some((acc: UserAccount) => acc.phone === phone)) {
      return { ok: false, message: '该手机号已注册' };
    }
    const account: UserAccount = { username: username.trim(), phone: phone.trim(), password: password.trim() };
    AuthStore.accounts = [...AuthStore.accounts, account];
    await AuthStore.persistAccounts();
    AuthStore.currentPhone = account.phone;
    await AuthStore.persistCurrentPhone();
    AuthStore.notify();
    return { ok: true, message: '注册成功并已登录' };
  }

  static async login(phone: string, password: string): Promise<AuthResult>
  {
    if (!AuthStore.prefs) {
      return { ok: false, message: '存储尚未初始化' };
    }
    const target: UserAccount | undefined = AuthStore.accounts.find((acc: UserAccount) => acc.phone === phone.trim());
    if (!target) {
      return { ok: false, message: '账号不存在' };
    }
    if (target.password !== password.trim()) {
      return { ok: false, message: '密码不正确' };
    }
    AuthStore.currentPhone = target.phone;
    await AuthStore.persistCurrentPhone();
    AuthStore.notify();
    return { ok: true, message: '登录成功' };
  }

  static async logout(): Promise<void> {
    AuthStore.currentPhone = null;
    await AuthStore.persistCurrentPhone();
    AuthStore.notify();
  }

  private static async loadAccounts(): Promise<UserAccount[]> {
    if (!AuthStore.prefs) {
      return [];
    }
    try {
      const rawValue: string = (await AuthStore.prefs.get(ACCOUNTS_KEY, '')) as string;
      const raw: string = rawValue;
      if (!raw) {
        return [];
      }
      const parsedValue: StoredAccount[] = JSON.parse(raw) as StoredAccount[];
      if (!Array.isArray(parsedValue)) {
        return [];
      }
      const restored: UserAccount[] = [];
      parsedValue.forEach((item: StoredAccount) => {
        if (typeof item.username === 'string' && typeof item.phone === 'string' && typeof item.password === 'string') {
          restored.push({ username: item.username, phone: item.phone, password: item.password });
        }
      });
      return restored;
    } catch (err) {
      console.error('读取账号列表失败:', String(err));
    }
    return [];
  }

  private static async loadCurrentPhone(): Promise<string | null> {
    if (!AuthStore.prefs) {
      return null;
    }
    try {
      const phoneValue: string = (await AuthStore.prefs.get(CURRENT_PHONE_KEY, '')) as string;
      const phone: string = phoneValue;
      if (phone && phone.length > 0) {
        return phone;
      }
    } catch (err) {
      console.error('读取当前登录账号失败:', String(err));
    }
    return null;
  }

  private static async persistAccounts(): Promise<void> {
    if (!AuthStore.prefs) {
      return;
    }
    try {
      await AuthStore.prefs.put(ACCOUNTS_KEY, JSON.stringify(AuthStore.accounts));
      await AuthStore.prefs.flush();
    } catch (err) {
      console.error('保存账号列表失败:', String(err));
    }
  }

  private static async persistCurrentPhone(): Promise<void> {
    if (!AuthStore.prefs) {
      return;
    }
    try {
      if (AuthStore.currentPhone === null) {
        await AuthStore.prefs.delete(CURRENT_PHONE_KEY);
      } else {
        await AuthStore.prefs.put(CURRENT_PHONE_KEY, AuthStore.currentPhone);
      }
      await AuthStore.prefs.flush();
    } catch (err) {
      console.error('保存当前账号失败:', String(err));
    }
  }
}
