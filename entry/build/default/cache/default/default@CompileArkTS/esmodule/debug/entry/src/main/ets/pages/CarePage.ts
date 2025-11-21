if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CarePage_Params {
    lineOpacities?: number[];
    bubbles?: Bubble[];
    hotlineOpacity?: number;
    spawnInterval?: number;
    fadeIntervals?: number[];
    lines?: string[];
    bubblePhrases?: string[];
    hotlines?: string[];
    pastelColors?: string[];
}
interface Bubble {
    id: string;
    text: string;
    left: number;
    top: number;
    bg: string;
    size: number;
    opacity: number;
}
class CarePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__lineOpacities = new ObservedPropertyObjectPU([0, 0, 0], this, "lineOpacities");
        this.__bubbles = new ObservedPropertyObjectPU([], this, "bubbles");
        this.__hotlineOpacity = new ObservedPropertySimplePU(0, this, "hotlineOpacity");
        this.spawnInterval = 0;
        this.fadeIntervals = [];
        this.lines = [
            '你并不孤单，我们在这里关心你',
            '相信每一点善意的汇聚',
            '终将照亮我们的生活'
        ];
        this.bubblePhrases = [
            '多喝热水', '天天开心', '你已经很棒啦', '按时吃饭', '累了就休息一下',
            '深呼吸~', '今天天气好吗？', '试着出去走走', '加油加油加油', '抱抱你'
        ];
        this.hotlines = [
            '全国公共卫生健康热线 12320',
            '全国青少年心理咨询热线 12355',
            '全国妇女儿童心理咨询热线 12338'
        ];
        this.pastelColors = [
            '#fff68888',
            '#fffcbc91',
            '#fffde387',
            '#c8b3fda0',
            '#b398fdfd',
            '#b398c1ff',
            '#c6b3ffff',
            '#e6c3b3ff',
            '#ffffbcfb' // 软粉
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CarePage_Params) {
        if (params.lineOpacities !== undefined) {
            this.lineOpacities = params.lineOpacities;
        }
        if (params.bubbles !== undefined) {
            this.bubbles = params.bubbles;
        }
        if (params.hotlineOpacity !== undefined) {
            this.hotlineOpacity = params.hotlineOpacity;
        }
        if (params.spawnInterval !== undefined) {
            this.spawnInterval = params.spawnInterval;
        }
        if (params.fadeIntervals !== undefined) {
            this.fadeIntervals = params.fadeIntervals;
        }
        if (params.lines !== undefined) {
            this.lines = params.lines;
        }
        if (params.bubblePhrases !== undefined) {
            this.bubblePhrases = params.bubblePhrases;
        }
        if (params.hotlines !== undefined) {
            this.hotlines = params.hotlines;
        }
        if (params.pastelColors !== undefined) {
            this.pastelColors = params.pastelColors;
        }
    }
    updateStateVars(params: CarePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__lineOpacities.purgeDependencyOnElmtId(rmElmtId);
        this.__bubbles.purgeDependencyOnElmtId(rmElmtId);
        this.__hotlineOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__lineOpacities.aboutToBeDeleted();
        this.__bubbles.aboutToBeDeleted();
        this.__hotlineOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __lineOpacities: ObservedPropertyObjectPU<number[]>;
    get lineOpacities() {
        return this.__lineOpacities.get();
    }
    set lineOpacities(newValue: number[]) {
        this.__lineOpacities.set(newValue);
    }
    private __bubbles: ObservedPropertyObjectPU<Bubble[]>;
    get bubbles() {
        return this.__bubbles.get();
    }
    set bubbles(newValue: Bubble[]) {
        this.__bubbles.set(newValue);
    }
    private __hotlineOpacity: ObservedPropertySimplePU<number>;
    get hotlineOpacity() {
        return this.__hotlineOpacity.get();
    }
    set hotlineOpacity(newValue: number) {
        this.__hotlineOpacity.set(newValue);
    }
    private spawnInterval: number;
    private fadeIntervals: number[];
    // 三句鼓励话（占位，用户可后续修改）
    private readonly lines: string[];
    // 背景气泡内的一些短句（10条）
    private readonly bubblePhrases: string[];
    // 紧急/公共热线（显示在鼓励话下面，字体稍小）
    private readonly hotlines: string[];
    // 一些淡色背景
    // 一些淡色背景（9 种柔和的彩虹色）
    private readonly pastelColors: string[];
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景颜色
            Column.create();
            // 背景颜色
            Column.width('100%');
            // 背景颜色
            Column.height('100%');
            // 背景颜色
            Column.backgroundColor('#FFFDF6');
        }, Column);
        // 背景颜色
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 随机气泡（绝对定位）
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const b = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(b.text);
                    Text.padding({ left: Math.max(12, b.size - 4), right: Math.max(12, b.size - 4), top: Math.max(6, Math.floor(b.size / 2) - 2), bottom: Math.max(6, Math.floor(b.size / 2) - 2) });
                    Text.borderRadius(Math.max(12, Math.floor(b.size / 2)));
                    Text.backgroundColor(b.bg);
                    Text.fontSize(b.size);
                    Text.fontColor('#333333');
                    Text.opacity(b.opacity);
                    Text.position({ left: b.left, top: b.top });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.bubbles, forEachItemGenFunction);
        }, ForEach);
        // 随机气泡（绝对定位）
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.create();
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.width('100%');
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.alignItems(HorizontalAlign.Center);
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.justifyContent(FlexAlign.Center);
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.position({ left: 0, top: 0 });
            // 中央三句（垂直居中），放入白色矩形并置于气泡上层
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('86%');
            Column.backgroundColor(Color.White);
            Column.borderRadius(12);
            Column.padding({ left: 20, right: 20, top: 18, bottom: 18 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const line = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(line);
                    Text.fontSize(18);
                    Text.fontColor('#222222');
                    Text.textAlign(TextAlign.Center);
                    Text.opacity(this.lineOpacities[idx]);
                    Text.margin({ bottom: 12 });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.lines, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部鼓励语下方显示三条全国热线，字体稍小
            ForEach.create();
            const forEachItemGenFunction = (_item, hi: number) => {
                const h = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(h);
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.textAlign(TextAlign.Center);
                    Text.margin({ top: 8 });
                    Text.opacity(this.hotlineOpacity);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.hotlines, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        // 顶部鼓励语下方显示三条全国热线，字体稍小
        ForEach.pop();
        Column.pop();
        // 中央三句（垂直居中），放入白色矩形并置于气泡上层
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CarePage";
    }
}
registerNamedRoute(() => new CarePage(undefined, {}), "", { bundleName: "com.example.list_harmony", moduleName: "entry", pagePath: "pages/CarePage", pageFullPath: "entry/src/main/ets/pages/CarePage", integratedHsp: "false", moduleType: "followWithHap" });
