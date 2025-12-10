if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginRegisterPage_Params {
    mode?: 'login' | 'register';
    username?: string;
    phone?: string;
    password?: string;
    busy?: boolean;
}
import router from "@ohos:router";
import prompt from "@ohos:prompt";
import AuthStore from "@bundle:com.example.list_harmony/entry/ets/common/AuthStore";
const ORANGE: string = '#FF7A00';
class LoginRegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mode = new ObservedPropertySimplePU('login', this, "mode");
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__phone = new ObservedPropertySimplePU('', this, "phone");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__busy = new ObservedPropertySimplePU(false, this, "busy");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginRegisterPage_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.busy !== undefined) {
            this.busy = params.busy;
        }
    }
    updateStateVars(params: LoginRegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mode.purgeDependencyOnElmtId(rmElmtId);
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__busy.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mode.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__busy.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mode: ObservedPropertySimplePU<'login' | 'register'>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: 'login' | 'register') {
        this.__mode.set(newValue);
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __busy: ObservedPropertySimplePU<boolean>;
    get busy() {
        return this.__busy.get();
    }
    set busy(newValue: boolean) {
        this.__busy.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/LoginRegisterPage", isUserCreateStack: false });
            Navigation.title(this.mode === 'login' ? '登录' : '注册');
            Navigation.hideBackButton(false);
            Navigation.backgroundColor('#FFFFFF');
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.padding({ left: 20, right: 20, top: 12, bottom: 20 });
            Column.backgroundColor('#F7F7F7');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部切换提示
            Column.create({ space: 6 });
            // 顶部切换提示
            Column.width('100%');
            // 顶部切换提示
            Column.padding({ top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mode === 'login' ? '欢迎登录' : '欢迎注册');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.Black);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mode === 'login' ? '输入手机号和密码登录您的账号' : '创建一个新账号以便购物和收藏');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 顶部切换提示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单区域
            Column.create({ space: 12 });
            // 表单区域
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mode === 'register') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('用户名');
                        Text.fontSize(14);
                        Text.fontColor('#444444');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({
                            placeholder: '请输入用户名',
                            text: this.username
                        });
                        TextInput.height(44);
                        TextInput.fontSize(16);
                        TextInput.padding({ left: 12, right: 12 });
                        TextInput.border({ width: 1, color: '#EEEEEE' });
                        TextInput.borderRadius(10);
                        TextInput.backgroundColor(Color.White);
                        TextInput.onChange((value: string) => {
                            this.username = value;
                        });
                    }, TextInput);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手机号');
            Text.fontSize(14);
            Text.fontColor('#444444');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: '请输入手机号',
                text: this.phone
            });
            TextInput.height(44);
            TextInput.fontSize(16);
            TextInput.padding({ left: 12, right: 12 });
            TextInput.border({ width: 1, color: '#EEEEEE' });
            TextInput.borderRadius(10);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.phone = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('密码');
            Text.fontSize(14);
            Text.fontColor('#444444');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: '请输入密码',
                text: this.password
            });
            TextInput.height(44);
            TextInput.fontSize(16);
            TextInput.padding({ left: 12, right: 12 });
            TextInput.border({ width: 1, color: '#EEEEEE' });
            TextInput.borderRadius(10);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Password);
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        // 表单区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主按钮
            Button.createWithLabel(this.mode === 'login' ? '登录' : '注册并登录');
            // 主按钮
            Button.height(48);
            // 主按钮
            Button.width('100%');
            // 主按钮
            Button.fontSize(16);
            // 主按钮
            Button.fontColor(Color.White);
            // 主按钮
            Button.backgroundColor(ORANGE);
            // 主按钮
            Button.borderRadius(12);
            // 主按钮
            Button.enabled(!this.busy);
            // 主按钮
            Button.onClick(() => this.submit());
        }, Button);
        // 主按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 切换链接
            Text.create(this.mode === 'login' ? '还没有账号？点此注册' : '已有账号？点此登录');
            // 切换链接
            Text.fontSize(14);
            // 切换链接
            Text.fontColor(ORANGE);
            // 切换链接
            Text.textAlign(TextAlign.Center);
            // 切换链接
            Text.width('100%');
            // 切换链接
            Text.onClick(() => this.toggleMode());
        }, Text);
        // 切换链接
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Column.pop();
        Navigation.pop();
    }
    private toggleMode(): void {
        this.mode = this.mode === 'login' ? 'register' : 'login';
        this.password = '';
    }
    private async submit(): Promise<void> {
        if (this.busy) {
            return;
        }
        this.busy = true;
        try {
            if (this.mode === 'register') {
                const result = await AuthStore.register(this.username, this.phone, this.password);
                prompt.showToast({ message: result.message, duration: 1500 });
                if (result.ok) {
                    router.back();
                }
            }
            else {
                const result = await AuthStore.login(this.phone, this.password);
                prompt.showToast({ message: result.message, duration: 1500 });
                if (result.ok) {
                    router.back();
                }
            }
        }
        catch (err) {
            prompt.showToast({ message: '操作失败，请稍后重试', duration: 1500 });
            console.error('登录/注册失败:', String(err));
        }
        finally {
            this.busy = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginRegisterPage";
    }
}
registerNamedRoute(() => new LoginRegisterPage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/LoginRegisterPage", pageFullPath: "entry/src/main/ets/pages/LoginRegisterPage", integratedHsp: "false", moduleType: "followWithHap" });
