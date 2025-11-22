export default class NotificationStore {
    private static listeners: Array<(msg: string, duration?: number) => void> = [];
    static show(message: string, duration: number = 5000): void {
        try {
            NotificationStore.listeners.forEach((l) => {
                try {
                    l(message, duration);
                }
                catch (e) {
                    console.error('Notification listener error:', String(e));
                }
            });
        }
        catch (err) {
            console.error('NotificationStore.show failed:', String(err));
        }
    }
    static subscribe(cb: (msg: string, duration?: number) => void): void {
        if (!cb)
            return;
        NotificationStore.listeners.push(cb);
    }
    static unsubscribe(cb: (msg: string, duration?: number) => void): void {
        if (!cb)
            return;
        NotificationStore.listeners = NotificationStore.listeners.filter((l) => l !== cb);
    }
}
