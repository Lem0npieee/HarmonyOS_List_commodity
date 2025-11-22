/*
 * 关怀页面：当检测到自残/自杀/危险药品相关查询时跳转到此页面。
 * 中央慢慢淡入三句鼓励话（占位），周围持续弹出随机颜色的圆角气泡，显示十条备选短句。
 */
import router from '@ohos.router';

interface Bubble {
  id: string;
  text: string;
  left: number;
  top: number;
  bg: string;
  size: number;
  opacity: number;
}

@Entry
@Component
struct CarePage {
  @State private lineOpacities: number[] = [0, 0, 0];
  @State private bubbles: Bubble[] = [];
  @State private hotlineOpacity: number = 0;
  private spawnInterval: number = 0;
  private fadeIntervals: number[] = [];

  // 三句鼓励话（占位，用户可后续修改）
  private readonly lines: string[] = [
    '你并不孤单，我们在这里关心你',
    '相信每一点善意的汇聚',
    '终将照亮我们的生活'
  ];

  // 背景气泡内的一些短句（10条）
  private readonly bubblePhrases: string[] = [
    '多喝热水', '天天开心', '你已经很棒啦', '按时吃饭', '累了就休息一下',
    '深呼吸~', '今天天气好吗？', '试着出去走走', '加油加油加油', '抱抱你'
  ];

  // 紧急/公共热线（显示在鼓励话下面，字体稍小）
  private readonly hotlines: string[] = [
    '全国公共卫生健康热线 12320',
    '全国青少年心理咨询热线 12355',
    '全国妇女儿童心理咨询热线 12338'
  ];

  // 一些淡色背景
    // 一些淡色背景（9 种柔和的彩虹色）
    private readonly pastelColors: string[] = [
      '#fff68888', // 软红
      '#fffcbc91', // 软橙
      '#fffde387', // 软黄
      '#c8b3fda0', // 软绿
      '#b398fdfd', // 软青
      '#b398c1ff', // 软蓝
      '#c6b3ffff', // 软靛
      '#e6c3b3ff', // 软紫
      '#ffffbcfb'  // 软粉
    ];

  aboutToAppear(): void {
    // 顺序淡入三句
    this.fadeInLine(0, 600);
    setTimeout(() => this.fadeInLine(1, 600), 900);
    setTimeout(() => this.fadeInLine(2, 600), 1800); 

    // 第三句淡入完成（1800 + 600 ms）后，再一起淡入三条热线
    setTimeout(() => {
      this.fadeInHotlines(600);
    }, 1800 + 600);

    // 持续生成背景气泡（0.1s 一个）
    this.spawnInterval = setInterval(() => {
      this.spawnBubble();
    }, 100);
  }

  aboutToDisappear(): void {
    // 清理计时器
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
      this.spawnInterval = 0;
    }
    this.fadeIntervals.forEach((id: number) => clearInterval(id));
    this.fadeIntervals = [];
    this.bubbles = [];
  }
  private fadeInLine(index: number, duration: number): void {
    const steps = 12;
    const stepTime = Math.max(10, Math.floor(duration / steps));
    let cur = 0;
    const id = setInterval(() => {
      cur++;
      const v = Math.min(1, cur / steps);
      const next = [...this.lineOpacities];
      next[index] = v;
      this.lineOpacities = next;
      if (v >= 1) {
        clearInterval(id);
      }
    }, stepTime);
    this.fadeIntervals.push(id);
  }

  private fadeInHotlines(duration: number): void {
    const steps = 12;
    const stepTime = Math.max(10, Math.floor(duration / steps));
    let cur = 0;
    const id = setInterval(() => {
      cur++;
      const v = Math.min(1, cur / steps);
      this.hotlineOpacity = v;
      if (v >= 1) {
        clearInterval(id);
      }
    }, stepTime);
    this.fadeIntervals.push(id);
  }

  private spawnBubble(): void {
    const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
    const text = this.bubblePhrases[Math.floor(Math.random() * this.bubblePhrases.length)];
    // 随机像素位置（宽/高顺序调整以匹配设备方向）
    const left: number = Math.floor(Math.random() * 300); // px (宽度范围)
    const targetTop: number = Math.floor(Math.random() * 800); // px (高度范围)
    const initialTop: number = targetTop + 20; // 初始位置低 20px
    const bg = this.pastelColors[Math.floor(Math.random() * this.pastelColors.length)];
    const size: number = Math.floor(Math.random() * 8) + 14; // 字号在14-21之间

    // 初始为透明且位置低于目标，随后在0.5s内逐步上移20px并逐渐显示
    const bubble: Bubble = { id: id, text: text, left: left, top: initialTop, bg: bg, size: size, opacity: 0 };
    this.bubbles = this.bubbles.concat([bubble]);

    // 渐显与上移动画（0.5s）
    const fadeInSteps = 10;
    const fadeInStepTime = Math.floor(500 / fadeInSteps); // ~50ms
    let fiCur = 0;
    const fiId = setInterval(() => {
      fiCur++;
      const progress = Math.min(1, fiCur / fadeInSteps);
      const newOpacity = progress;
      const newTop = Math.round(initialTop - progress * 20);
      this.bubbles = this.bubbles.map((b: Bubble) => {
        if (b.id === id) {
          const nb: Bubble = { id: b.id, text: b.text, left: b.left, top: newTop, bg: b.bg, size: b.size, opacity: newOpacity };
          return nb;
        }
        return b;
      });
      if (progress >= 1) {
        clearInterval(fiId);
      }
    }, fadeInStepTime);
    this.fadeIntervals.push(fiId);

    // 显示 5 秒后平滑淡出（0.6s）并移除
    setTimeout(() => {
      const fadeOutSteps = 12;
      const fadeOutStepTime = Math.floor(600 / fadeOutSteps); // ~50ms
      let foCur = 0;
      const foId = setInterval(() => {
        foCur++;
        const progress = Math.min(1, foCur / fadeOutSteps);
        const newOpacity = Math.max(0, 1 - progress);
        this.bubbles = this.bubbles.map((b: Bubble) => {
          if (b.id === id) {
            const nb: Bubble = { id: b.id, text: b.text, left: b.left, top: b.top, bg: b.bg, size: b.size, opacity: newOpacity };
            return nb;
          }
          return b;
        });
        if (progress >= 1) {
          clearInterval(foId);
          this.bubbles = this.bubbles.filter((b: Bubble) => b.id !== id);
        }
      }, fadeOutStepTime);
      this.fadeIntervals.push(foId);
    }, 5000);
  }

  build() {
    Stack() {
      // 背景颜色
      Column() {
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#FFFDF6')

      // 随机气泡（绝对定位）
      ForEach(this.bubbles, (b: Bubble) => {
        Text(b.text)
          .padding({ left: Math.max(12, b.size - 4), right: Math.max(12, b.size - 4), top: Math.max(6, Math.floor(b.size/2)-2), bottom: Math.max(6, Math.floor(b.size/2)-2) })
          .borderRadius(Math.max(12, Math.floor(b.size/2)))
          .backgroundColor(b.bg)
          .fontSize(b.size)
          .fontColor('#333333')
          .opacity(b.opacity)
          .position({ left: b.left, top: b.top })
      })

      // 中央三句（垂直居中），放入白色矩形并置于气泡上层
      Column() {
        Column() {
          ForEach(this.lines, (line: string, idx: number) => {
            Text(line)
              .fontSize(18)
              .fontColor('#222222')
              .textAlign(TextAlign.Center)
              .opacity(this.lineOpacities[idx])
              .margin({ bottom: 12 })
          })

          // 顶部鼓励语下方显示三条全国热线，字体稍小
          ForEach(this.hotlines, (h: string, hi: number) => {
            Text(h)
              .fontSize(14)
              .fontColor('#666666')
              .textAlign(TextAlign.Center)
              .margin({ top: 8 })
              .opacity(this.hotlineOpacity)
              .enableDataDetector(true)
              .textAlign(TextAlign.Center)
          })
        }
        .width('86%')
        .backgroundColor(Color.White)
        .borderRadius(12)
        .padding({ left: 20, right: 20, top: 18, bottom: 18 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)
      .position({ left: 0, top: 0 })
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
