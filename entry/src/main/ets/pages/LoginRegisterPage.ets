import router from '@ohos.router';
import prompt from '@system.prompt';
import AuthStore from '../common/AuthStore';

const ORANGE: string = '#FF7A00';

@Entry
@Component
struct LoginRegisterPage {
  @State private mode: 'login' | 'register' = 'login';
  @State private username: string = '';
  @State private phone: string = '';
  @State private password: string = '';
  @State private busy: boolean = false;

  build() {
    Navigation() {
      Column({ space: 16 }) {
        // 顶部切换提示
        Column({ space: 6 }) {
          Text(this.mode === 'login' ? '欢迎登录' : '欢迎注册')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.Black)
          Text(this.mode === 'login' ? '输入手机号和密码登录您的账号' : '创建一个新账号以便购物和收藏')
            .fontSize(14)
            .fontColor('#666666')
        }
        .width('100%')
        .padding({ top: 12 })

        // 表单区域
        Column({ space: 12 }) {
          if (this.mode === 'register') {
            Text('用户名')
              .fontSize(14)
              .fontColor('#444444')
            TextInput({
              placeholder: '请输入用户名',
              text: this.username
            })
              .height(44)
              .fontSize(16)
              .padding({ left: 12, right: 12 })
              .border({ width: 1, color: '#EEEEEE' })
              .borderRadius(10)
              .backgroundColor(Color.White)
              .onChange((value: string) => {
                this.username = value;
              })
          }

          Text('手机号')
            .fontSize(14)
            .fontColor('#444444')
          TextInput({
            placeholder: '请输入手机号',
            text: this.phone
          })
            .height(44)
            .fontSize(16)
            .padding({ left: 12, right: 12 })
            .border({ width: 1, color: '#EEEEEE' })
            .borderRadius(10)
            .backgroundColor(Color.White)
            .type(InputType.Number)
            .onChange((value: string) => {
              this.phone = value;
            })

          Text('密码')
            .fontSize(14)
            .fontColor('#444444')
          TextInput({
            placeholder: '请输入密码',
            text: this.password
          })
            .height(44)
            .fontSize(16)
            .padding({ left: 12, right: 12 })
            .border({ width: 1, color: '#EEEEEE' })
            .borderRadius(10)
            .backgroundColor(Color.White)
            .type(InputType.Password)
            .onChange((value: string) => {
              this.password = value;
            })
        }
        .width('100%')

        // 主按钮
        Button(this.mode === 'login' ? '登录' : '注册并登录')
          .height(48)
          .width('100%')
          .fontSize(16)
          .fontColor(Color.White)
          .backgroundColor(ORANGE)
          .borderRadius(12)
          .enabled(!this.busy)
          .onClick(() => this.submit())

        // 切换链接
        Text(this.mode === 'login' ? '还没有账号？点此注册' : '已有账号？点此登录')
          .fontSize(14)
          .fontColor(ORANGE)
          .textAlign(TextAlign.Center)
          .width('100%')
          .onClick(() => this.toggleMode())

        Blank()
      }
      .padding({ left: 20, right: 20, top: 12, bottom: 20 })
      .backgroundColor('#F7F7F7')
    }
    .title(this.mode === 'login' ? '登录' : '注册')
    .hideBackButton(false)
    .backgroundColor('#FFFFFF')
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
      } else {
        const result = await AuthStore.login(this.phone, this.password);
        prompt.showToast({ message: result.message, duration: 1500 });
        if (result.ok) {
          router.back();
        }
      }
    } catch (err) {
      prompt.showToast({ message: '操作失败，请稍后重试', duration: 1500 });
      console.error('登录/注册失败:', String(err));
    } finally {
      this.busy = false;
    }
  }
}
