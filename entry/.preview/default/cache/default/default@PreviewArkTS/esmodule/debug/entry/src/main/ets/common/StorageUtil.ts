/**
 * StorageUtil
 * 使用 `AppStorage` 作为持久化后端（简单、兼容）
 */
export default class StorageUtil {
    static async getString(key: string): Promise<string | null> {
        try {
            const value = AppStorage.get<string>(key);
            console.info(`[StorageUtil] getString key=${key} value=${String(value)}`);
            return value === undefined || value === null ? null : String(value);
        }
        catch (err) {
            console.error('StorageUtil.getString failed:', String(err));
            return null;
        }
    }
    static async putString(key: string, value: string): Promise<void> {
        try {
            AppStorage.setOrCreate<string>(key, value);
            console.info(`[StorageUtil] putString key=${key} value=${value}`);
        }
        catch (err) {
            console.error('StorageUtil.putString failed:', String(err));
        }
    }
    static async remove(key: string): Promise<void> {
        try {
            AppStorage.setOrCreate<string>(key, '');
            console.info(`[StorageUtil] remove key=${key}`);
        }
        catch (err) {
            console.error('StorageUtil.remove failed:', String(err));
        }
    }
}
