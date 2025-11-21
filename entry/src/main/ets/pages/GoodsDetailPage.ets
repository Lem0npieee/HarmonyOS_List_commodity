/*
 * 商品详情页
 */
import router from '@ohos.router';
import { GoodsListItemType, CategoryType, goodsPool } from '../viewmodel/InitialData';
import { LAYOUT_WIDTH_OR_HEIGHT, STORE } from '../common/CommonConstants';

// 定义接口
interface ReviewItem {
  user: string;
  level: string;
  rating: number;
  content: string;
  spec: string;
}

interface QAItem {
  user: string;
  question: string;
  answer: string;
  answerCount: number;
}

interface ReviewCategory {
  phone: ReviewItem[];
  clothes: ReviewItem[];
  food: ReviewItem[];
  home: ReviewItem[];
}

interface QACategory {
  phone: QAItem[];
  clothes: QAItem[];
  food: QAItem[];
  home: QAItem[];
}

// 评价数据池 - 按类别组织
const REVIEWS_BY_CATEGORY: ReviewCategory = {
  phone: [
    { user: 'a**m', level: '钻石会员', rating: 5, content: '手机性能非常好,拍照效果惊艳,续航给力,值得购买!', spec: '[256GB 蓝色]' },
    { user: 'z**8', level: '黄金会员', rating: 5, content: '系统流畅,屏幕显示细腻,信号稳定,很满意!', spec: '[512GB 黑色]' },
    { user: 'w**3', level: '银牌会员', rating: 4, content: '整体不错,就是价格有点贵,但品质确实好', spec: '[128GB 白色]' },
    { user: 'l**n', level: '钻石会员', rating: 5, content: '5G网速飞快,玩游戏很流畅,散热也做得不错', spec: '[256GB 蓝色]' },
    { user: 'j**7', level: '黄金会员', rating: 5, content: '外观漂亮,手感舒适,拍照功能强大', spec: '[512GB 金色]' },
    { user: 'h**2', level: '银牌会员', rating: 4, content: '音质很好,屏幕亮度高,总体满意', spec: '[256GB 黑色]' },
    { user: 'q**5', level: '钻石会员', rating: 5, content: '电池耐用,充电速度快,用了一周很稳定', spec: '[512GB 蓝色]' },
    { user: 'p**1', level: '黄金会员', rating: 5, content: '摄像头效果好,夜拍也很清晰', spec: '[256GB 白色]' },
    { user: 'r**9', level: '银牌会员', rating: 4, content: '系统更新及时,运行速度快', spec: '[128GB 黑色]' },
    { user: 'm**4', level: '钻石会员', rating: 5, content: '包装精美,发货快,手机质量很好', spec: '[512GB 蓝色]' },
    { user: 's**6', level: '黄金会员', rating: 5, content: '性价比高,功能齐全,推荐购买', spec: '[256GB 金色]' },
    { user: 't**0', level: '银牌会员', rating: 4, content: '用起来很顺手,没有卡顿现象', spec: '[512GB 白色]' }
  ],
  clothes: [
    { user: 'x**y', level: '钻石会员', rating: 5, content: '面料舒适,做工精细,版型很好看,非常满意!', spec: '[L码 蓝色]' },
    { user: 'b**c', level: '黄金会员', rating: 5, content: '颜色正,质量不错,穿着很舒服', spec: '[M码 黑色]' },
    { user: 'n**f', level: '银牌会员', rating: 4, content: '款式好看,就是有点薄,秋天穿刚好', spec: '[XL码 灰色]' },
    { user: 'd**g', level: '钻石会员', rating: 5, content: '尺码标准,颜色漂亮,很有质感', spec: '[L码 白色]' },
    { user: 'e**h', level: '黄金会员', rating: 5, content: '洗过不缩水,不掉色,值得购买', spec: '[M码 蓝色]' },
    { user: 'f**i', level: '银牌会员', rating: 4, content: '性价比高,适合日常穿着', spec: '[XL码 黑色]' },
    { user: 'g**j', level: '钻石会员', rating: 5, content: '包装好,发货快,衣服质量很棒', spec: '[L码 灰色]' },
    { user: 'k**l', level: '黄金会员', rating: 5, content: '面料柔软,穿着不起球,很满意', spec: '[M码 白色]' },
    { user: 'o**p', level: '银牌会员', rating: 4, content: '版型修身,显得很精神', spec: '[XL码 蓝色]' },
    { user: 'u**v', level: '钻石会员', rating: 5, content: '设计时尚,搭配方便,很喜欢', spec: '[L码 黑色]' },
    { user: 'w**x', level: '黄金会员', rating: 5, content: '价格实惠,质量好,会回购', spec: '[M码 灰色]' },
    { user: 'y**z', level: '银牌会员', rating: 4, content: '收到很惊喜,比想象中好', spec: '[XL码 白色]' }
  ],
  food: [
    { user: 't**k', level: '黄金会员', rating: 5, content: '价格划算,口感不错,已经买过好几次了,很新鲜!', spec: '[经典装]' },
    { user: 'c**d', level: '钻石会员', rating: 5, content: '味道很好,分量足,包装精美', spec: '[豪华装]' },
    { user: 'v**w', level: '银牌会员', rating: 4, content: '口味不错,就是有点甜,总体满意', spec: '[礼盒装]' },
    { user: 'i**j', level: '黄金会员', rating: 5, content: '新鲜度高,保质期长,很放心', spec: '[经典装]' },
    { user: 'k**l', level: '钻石会员', rating: 5, content: '孩子很喜欢吃,健康美味', spec: '[豪华装]' },
    { user: 'm**n', level: '银牌会员', rating: 4, content: '性价比高,适合囤货', spec: '[经典装]' },
    { user: 'o**p', level: '黄金会员', rating: 5, content: '包装完整,没有破损,很满意', spec: '[礼盒装]' },
    { user: 'q**r', level: '钻石会员', rating: 5, content: '送人很体面,自己吃也不错', spec: '[豪华装]' },
    { user: 's**t', level: '银牌会员', rating: 4, content: '味道纯正,分量实在', spec: '[经典装]' },
    { user: 'u**v', level: '黄金会员', rating: 5, content: '物流快,东西新鲜,推荐', spec: '[礼盒装]' },
    { user: 'w**x', level: '钻石会员', rating: 5, content: '老顾客了,一如既往的好', spec: '[豪华装]' },
    { user: 'y**z', level: '银牌会员', rating: 4, content: '价格合理,质量放心', spec: '[经典装]' }
  ],
  home: [
    { user: 'g**h', level: '钻石会员', rating: 5, content: '功能强大,使用方便,物有所值,推荐!', spec: '[白色]' },
    { user: 'a**b', level: '黄金会员', rating: 5, content: '质量好,噪音小,效果明显', spec: '[黑色]' },
    { user: 'c**d', level: '银牌会员', rating: 4, content: '性价比不错,功能齐全', spec: '[灰色]' },
    { user: 'e**f', level: '钻石会员', rating: 5, content: '设计人性化,操作简单', spec: '[白色]' },
    { user: 'g**h', level: '黄金会员', rating: 5, content: '省电省心,效果很好', spec: '[黑色]' },
    { user: 'i**j', level: '银牌会员', rating: 4, content: '外观漂亮,做工精细', spec: '[灰色]' },
    { user: 'k**l', level: '钻石会员', rating: 5, content: '智能化程度高,体验很好', spec: '[白色]' },
    { user: 'm**n', level: '黄金会员', rating: 5, content: '品质可靠,值得信赖', spec: '[黑色]' },
    { user: 'o**p', level: '银牌会员', rating: 4, content: '物流快,包装好,满意', spec: '[灰色]' },
    { user: 'q**r', level: '钻石会员', rating: 5, content: '使用效果超出预期', spec: '[白色]' },
    { user: 's**t', level: '黄金会员', rating: 5, content: '性能稳定,推荐购买', spec: '[黑色]' },
    { user: 'u**v', level: '银牌会员', rating: 4, content: '功能实用,价格合理', spec: '[灰色]' }
  ]
};

// 问大家数据池
const QA_BY_CATEGORY: QACategory = {
  phone: [
    { user: 'q**1', question: '这款手机支持5G吗?', answer: '支持的,5G信号很稳定', answerCount: 15 },
    { user: 'a**2', question: '电池能用一天吗?', answer: '正常使用一天没问题,重度使用需要充一次', answerCount: 23 },
    { user: 'w**3', question: '有没有充电器?', answer: '有配充电器和数据线', answerCount: 18 },
    { user: 'e**4', question: '拍照效果怎么样?', answer: '拍照很清晰,夜拍也不错', answerCount: 31 },
    { user: 'r**5', question: '玩游戏会发热吗?', answer: '散热做得不错,长时间玩也不会很烫', answerCount: 27 }
  ],
  clothes: [
    { user: 'q**6', question: '会不会起球?', answer: '穿了一个月没起球,质量很好', answerCount: 20 },
    { user: 'a**7', question: '尺码准吗?', answer: '尺码标准,按平时的买就行', answerCount: 35 },
    { user: 'w**8', question: '面料厚吗?', answer: '厚度适中,春秋穿刚好', answerCount: 16 },
    { user: 'e**9', question: '会不会缩水?', answer: '洗过不缩水,放心购买', answerCount: 22 },
    { user: 'r**0', question: '颜色会掉吗?', answer: '颜色很正,洗了不掉色', answerCount: 19 }
  ],
  food: [
    { user: 'q**a', question: '保质期多久?', answer: '保质期12个月,很新鲜', answerCount: 28 },
    { user: 'a**b', question: '有没有添加剂?', answer: '没有添加剂,很健康', answerCount: 33 },
    { user: 'w**c', question: '适合小孩吃吗?', answer: '很适合,小孩很喜欢', answerCount: 25 },
    { user: 'e**d', question: '包装会破损吗?', answer: '包装很结实,收到完好无损', answerCount: 17 },
    { user: 'r**e', question: '味道甜吗?', answer: '甜度适中,口感很好', answerCount: 29 }
  ],
  home: [
    { user: 'q**f', question: '噪音大吗?', answer: '噪音很小,不影响休息', answerCount: 24 },
    { user: 'a**g', question: '耗电吗?', answer: '很省电,功耗不高', answerCount: 21 },
    { user: 'w**h', question: '好操作吗?', answer: '操作很简单,老人也会用', answerCount: 30 },
    { user: 'e**i', question: '质量怎么样?', answer: '质量很好,做工精细', answerCount: 26 },
    { user: 'r**j', question: '售后好吗?', answer: '售后很负责,有问题马上解决', answerCount: 19 }
  ]
};

@Entry
@Component
struct GoodsDetailPage {
  @State goods: GoodsListItemType | null = null;
  @State selectedSpec: number = 0;
  @State quantity: number = 1;
  @State showAllReviews: boolean = false;
  @State showAllQA: boolean = false;
  @State displayedReviews: ReviewItem[] = [];
  @State displayedQA: QAItem[] = [];
  @State recommendedGoods: GoodsListItemType[] = [];
  @State isFavorited: boolean = false;
  private scroller: Scroller = new Scroller();

  aboutToAppear() {
    try {
      const params = router.getParams() as Record<string, Object>;
      if (params && params.goods) {
        this.goods = params.goods as GoodsListItemType;
        
        // 初始化评价数据
        this.initializeReviews();
        
        // 初始化问大家数据
        this.initializeQA();
        
        // 初始化推荐商品
        this.initializeRecommendedGoods();
      }
    } catch (err) {
      console.error('获取参数失败:', err);
    }
  }
  
  // 初始化评价数据
  private initializeReviews() {
    if (!this.goods) return;
    
    const category = this.goods.category;
    let reviewPool: ReviewItem[] = [];
    
    // 根据分类获取评价池
    switch (category) {
      case CategoryType.Phone:
        reviewPool = REVIEWS_BY_CATEGORY.phone;
        break;
      case CategoryType.Clothes:
        reviewPool = REVIEWS_BY_CATEGORY.clothes;
        break;
      case CategoryType.Food:
        reviewPool = REVIEWS_BY_CATEGORY.food;
        break;
      case CategoryType.Home:
        reviewPool = REVIEWS_BY_CATEGORY.home;
        break;
      default:
        reviewPool = REVIEWS_BY_CATEGORY.food;
    }
    
    // 随机打乱并取第一条作为默认显示
    const shuffled = this.shuffleArray([...reviewPool]);
    this.displayedReviews = [shuffled[0]];
  }
  
  // 初始化问大家数据
  private initializeQA() {
    if (!this.goods) return;
    
    const category = this.goods.category;
    let qaPool: QAItem[] = [];
    
    // 根据分类获取问答池
    switch (category) {
      case CategoryType.Phone:
        qaPool = QA_BY_CATEGORY.phone;
        break;
      case CategoryType.Clothes:
        qaPool = QA_BY_CATEGORY.clothes;
        break;
      case CategoryType.Food:
        qaPool = QA_BY_CATEGORY.food;
        break;
      case CategoryType.Home:
        qaPool = QA_BY_CATEGORY.home;
        break;
      default:
        qaPool = QA_BY_CATEGORY.food;
    }
    
    // 随机打乱并取第一条作为默认显示
    const shuffled = this.shuffleArray([...qaPool]);
    this.displayedQA = [shuffled[0]];
  }
  
  // 初始化推荐商品
  private initializeRecommendedGoods() {
    if (!this.goods) return;
    
    // 获取同类商品
    const sameCategory = goodsPool.filter(item => 
      item.category === this.goods?.category && 
      item.title !== this.goods?.title
    );
    
    // 随机打乱并取6个
    const shuffled = this.shuffleArray(sameCategory);
    this.recommendedGoods = shuffled.slice(0, 6);
  }
  
  // 数组随机打乱
  private shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
  
  // 展开评价
  private expandReviews() {
    if (!this.goods) return;
    
    const category = this.goods.category;
    let reviewPool: ReviewItem[] = [];
    
    switch (category) {
      case CategoryType.Phone:
        reviewPool = REVIEWS_BY_CATEGORY.phone;
        break;
      case CategoryType.Clothes:
        reviewPool = REVIEWS_BY_CATEGORY.clothes;
        break;
      case CategoryType.Food:
        reviewPool = REVIEWS_BY_CATEGORY.food;
        break;
      case CategoryType.Home:
        reviewPool = REVIEWS_BY_CATEGORY.home;
        break;
      default:
        reviewPool = REVIEWS_BY_CATEGORY.food;
    }
    
    // 保留第一条,随机显示另外4条
    const firstReview = this.displayedReviews[0];
    const otherReviews: ReviewItem[] = [];
    for (let i = 0; i < reviewPool.length; i++) {
      if (reviewPool[i] !== firstReview) {
        otherReviews.push(reviewPool[i]);
      }
    }
    const shuffled = this.shuffleArray(otherReviews);
    this.displayedReviews = [firstReview, ...shuffled.slice(0, 4)];
    this.showAllReviews = true;
  }
  
  // 展开问大家
  private expandQA() {
    if (!this.goods) return;
    
    const category = this.goods.category;
    let qaPool: QAItem[] = [];
    
    switch (category) {
      case CategoryType.Phone:
        qaPool = QA_BY_CATEGORY.phone;
        break;
      case CategoryType.Clothes:
        qaPool = QA_BY_CATEGORY.clothes;
        break;
      case CategoryType.Food:
        qaPool = QA_BY_CATEGORY.food;
        break;
      case CategoryType.Home:
        qaPool = QA_BY_CATEGORY.home;
        break;
      default:
        qaPool = QA_BY_CATEGORY.food;
    }
    
    // 保留第一条,随机显示另外4条
    const firstQA = this.displayedQA[0];
    const otherQA: QAItem[] = [];
    for (let i = 0; i < qaPool.length; i++) {
      if (qaPool[i] !== firstQA) {
        otherQA.push(qaPool[i]);
      }
    }
    const shuffled = this.shuffleArray(otherQA);
    this.displayedQA = [firstQA, ...shuffled.slice(0, 4)];
    this.showAllQA = true;
  }

  build() {
    Column() {
      // 顶部导航栏（与 ListIndex 的结构一致，防止 Navigation 占满整个页面）
      Row() {
        Navigation() {
          Column() {
            Row() {
              Image($r('sys.symbol.chevron_left'))
                .width(24)
                .height(24)
                .fillColor(Color.Black)
                .onClick(() => {
                  router.back();
                })

              Blank()

              Image($r('sys.symbol.ellipsis_circle'))
                .width(24)
                .height(24)
                .fillColor(Color.Black)
            }
            .width('100%')
            .height(56)
            .padding({ left: 16, right: 16 })
          }
          .width(LAYOUT_WIDTH_OR_HEIGHT)
          .justifyContent(FlexAlign.Center)
        }
        .size({ width: LAYOUT_WIDTH_OR_HEIGHT, height: LAYOUT_WIDTH_OR_HEIGHT })
        .title(STORE)
        .titleMode(NavigationTitleMode.Mini)
      }
      .height(56)
      .backgroundColor(Color.White)
      
      if (this.goods !== null) {
        Scroll(this.scroller) {
          Column() {
            // 商品图片轮播
            this.buildImageSwiper();
            
            // 商品基本信息
            this.buildBasicInfo();
            
            // 优惠信息
            this.buildPromotionInfo();
            
            // 配送信息
            this.buildDeliveryInfo();
            
            // 规格选择
            this.buildSpecifications();
            
            // 店铺信息
            this.buildShopInfo();
            
            // 评价预览
            this.buildReviews();
            
            // 商品详情图片
            this.buildDetailImages();
          }
        }
        .scrollBar(BarState.Off)
        .layoutWeight(1)
        
        // 底部操作栏
        this.buildBottomBar();
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  @Builder
  buildNavBar() {
    Row() {
      Image($r('sys.symbol.chevron_left'))
        .width(24)
        .height(24)
        .fillColor(Color.Black)
        .onClick(() => {
          router.back();
        })
      
      Blank()
      
      Image($r('sys.symbol.ellipsis_circle'))
        .width(24)
        .height(24)
        .fillColor(Color.Black)
    }
    .width('100%')
    .height(56)
    .padding({ left: 16, right: 16 })
    .backgroundColor(Color.White)
  }

  @Builder
  buildImageSwiper() {
    Swiper() {
      Image(this.goods?.cover)
        .width('100%')
        .height(375)
        .objectFit(ImageFit.Cover)
      
      if (this.goods?.detailImages) {
        ForEach(this.goods.detailImages, (img: Resource) => {
          Image(img)
            .width('100%')
            .height(375)
            .objectFit(ImageFit.Cover)
        })
      }
    }
    .width('100%')
    .height(375)
    .backgroundColor(Color.White)
    .indicator(true)
    .loop(true)
    .autoPlay(true)
    .interval(3000)
  }

  @Builder
  buildBasicInfo() {
    Column() {
      // 价格区域
      Row() {
        Text('¥')
          .fontSize(16)
          .fontColor('#FF0000')
          .fontWeight(FontWeight.Bold)
        Text(this.goods?.price.toFixed(2))
          .fontSize(28)
          .fontColor('#FF0000')
          .fontWeight(FontWeight.Bold)
        
        if (this.goods?.originalPrice && this.goods.originalPrice > this.goods.price) {
          Text('¥' + this.goods.originalPrice.toFixed(2))
            .fontSize(14)
            .fontColor('#999999')
            .decoration({ type: TextDecorationType.LineThrough })
            .margin({ left: 8 })
        }
        
        Blank()
        
        Text('已售 ' + (this.goods?.salesCount ?? 7) + '+')
          .fontSize(12)
          .fontColor('#666666')
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      // 商品标题（左对齐，自动换行）
      Text(this.goods?.title)
        .fontSize(16)
        .fontColor('#333333')
        .fontWeight(FontWeight.Medium)
        .textAlign(TextAlign.Start)
        .width('100%')
        .lineHeight(24)
        .wordBreak(WordBreak.BREAK_ALL)
        .margin({ bottom: 8 })
      
      // 标签（紧跟名称后面）
      Row({ space: 8 }) {
        if (this.goods?.tags) {
          ForEach(this.goods.tags, (tag: Resource) => {
            Text(tag)
              .fontSize(11)
              .fontColor('#FF6B00')
              .padding({ left: 6, right: 6, top: 3, bottom: 3 })
              .border({ width: 1, color: '#FF6B00', radius: 3 })
          })
        }
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 8 })
  }

  @Builder
  buildPromotionInfo() {
    Column({ space: 12 }) {
      Row() {
        Image($r('app.media.goodsImg'))
          .width(16)
          .height(16)
          .borderRadius(8)
        Text('点击成为会员，领券下单更优惠')
          .fontSize(13)
          .fontColor('#333333')
          .margin({ left: 8 })
        Blank()
        Image($r('sys.symbol.chevron_right'))
          .width(16)
          .height(16)
          .fillColor('#999999')
      }
      
      Row() {
        Text('承诺')
          .fontSize(12)
          .fontColor('#999999')
          .width(50)
        Text('· 24小时闪电发货  · 使用24小时内可退')
          .fontSize(12)
          .fontColor('#333333')
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .margin({ bottom: 8 })
  }

  @Builder
  buildDeliveryInfo() {
    Column({ space: 12 }) {
      Row() {
        Text('配送')
          .fontSize(14)
          .fontColor('#333333')
          .width(60)
        Text(this.goods?.deliveryInfo ?? '不支持7天无理由退换')
          .fontSize(14)
          .fontColor('#666666')
        Blank()
        Image($r('sys.symbol.chevron_right'))
          .width(16)
          .height(16)
          .fillColor('#999999')
      }
      
      Row() {
        Text('送至')
          .fontSize(14)
          .fontColor('#333333')
          .width(60)
        Text('广东 广州 · 免运费')
          .fontSize(14)
          .fontColor('#666666')
        Blank()
        Image($r('sys.symbol.chevron_right'))
          .width(16)
          .height(16)
          .fillColor('#999999')
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .margin({ bottom: 8 })
  }

  @Builder
  buildSpecifications() {
    Row() {
      Text('麦当劳')
        .fontSize(14)
        .fontColor('#333333')
        .width(60)
      
      Row({ space: 8 }) {
        if (this.goods?.specifications && this.goods.specifications.length > 0) {
          ForEach(this.goods.specifications, (spec: string, index: number) => {
            Text(spec)
              .fontSize(13)
              .fontColor(this.selectedSpec === index ? '#FF0000' : '#333333')
              .padding({ left: 12, right: 12, top: 6, bottom: 6 })
              .backgroundColor(this.selectedSpec === index ? '#FFE8E8' : '#F5F5F5')
              .borderRadius(4)
              .border({
                width: 1,
                color: this.selectedSpec === index ? '#FF0000' : '#E0E0E0'
              })
              .onClick(() => {
                this.selectedSpec = index;
              })
          }, (spec: string, index: number) => index.toString())
        } else {
          Text('小薯  无有效期  镇江')
            .fontSize(13)
            .fontColor('#333333')
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .backgroundColor('#F5F5F5')
            .borderRadius(4)
        }
      }
      
      Blank()
      
      Image($r('sys.symbol.chevron_right'))
        .width(16)
        .height(16)
        .fillColor('#999999')
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .margin({ bottom: 8 })
  }

  @Builder
  buildShopInfo() {
    Row() {
      Image($r('app.media.goodsImg'))
        .width(40)
        .height(40)
        .borderRadius(20)
      
      Column({ space: 4 }) {
        Row() {
          Text(this.goods?.shopName ?? '猫小弟')
            .fontSize(14)
            .fontColor('#333333')
            .fontWeight(FontWeight.Medium)
          
          ForEach([1, 2, 3, 4, 5], (star: number) => {
            Image($r('sys.symbol.star_fill'))
              .width(12)
              .height(12)
              .fillColor('#FFB800')
              .margin({ left: 4 })
          })
          
          Text('4.4')
            .fontSize(12)
            .fontColor('#666666')
            .margin({ left: 4 })
          
          Text('424位')
            .fontSize(12)
            .fontColor('#999999')
            .margin({ left: 4 })
        }
        
        Text('店铺宝贝27项好评')
          .fontSize(12)
          .fontColor('#666666')
      }
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
      
      Blank()
      
      Button('关注')
        .fontSize(13)
        .fontColor('#FF6600')
        .backgroundColor(Color.Transparent)
        .border({ width: 1, color: '#FF6600', radius: 16 })
        .padding({ left: 16, right: 16, top: 6, bottom: 6 })
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .margin({ bottom: 8 })
  }

  @Builder
  buildReviews() {
    Column({ space: 12 }) {
      Row() {
        Text('评价 · 5万+')
          .fontSize(16)
          .fontColor('#333333')
          .fontWeight(FontWeight.Medium)
        
        Blank()
        
        Text(this.showAllReviews ? '收起' : '查看全部')
          .fontSize(13)
          .fontColor('#999999')
          .onClick(() => {
            if (!this.showAllReviews) {
              this.expandReviews();
            } else {
              this.showAllReviews = false;
              this.displayedReviews = [this.displayedReviews[0]];
            }
          })
        Image($r('sys.symbol.chevron_right'))
          .width(16)
          .height(16)
          .fillColor(Color.Black)
      }
      
      // 评价筛选
      Row({ space: 12 }) {
        Text('用户评价好 28')
          .fontSize(13)
          .fontColor('#333333')
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .backgroundColor('#F5F5F5')
          .borderRadius(12)
        
        Text('速度快 20')
          .fontSize(13)
          .fontColor('#333333')
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .backgroundColor('#F5F5F5')
          .borderRadius(12)
        
        Text('价格实惠 9')
          .fontSize(13)
          .fontColor('#333333')
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .backgroundColor('#F5F5F5')
          .borderRadius(12)
      }
      
      Divider().color('#E5E5E5').margin({ top: 8, bottom: 8 })
      
      // 评价列表
      ForEach(this.displayedReviews, (review: ReviewItem, index: number) => {
        Column({ space: 8 }) {
          Row() {
            Image($r('app.media.goodsImg'))
              .width(32)
              .height(32)
              .borderRadius(16)
            
            Column({ space: 2 }) {
              Text(review.user + ' ' + review.level)
                .fontSize(13)
                .fontColor('#333333')
              
              Row() {
                ForEach([1, 2, 3, 4, 5], (star: number) => {
                  Image($r('sys.symbol.star_fill'))
                    .width(12)
                    .height(12)
                    .fillColor(star <= review.rating ? '#FFB800' : '#E0E0E0')
                })
                
                Text(review.spec)
                  .fontSize(11)
                  .fontColor('#999999')
                  .margin({ left: 8 })
              }
            }
            .alignItems(HorizontalAlign.Start)
            .margin({ left: 8 })
          }
          
          Text(review.content)
            .fontSize(13)
            .fontColor('#333333')
            .lineHeight(20)
            .margin({ top: 8 })
          
          Image(this.goods?.cover)
            .width(80)
            .height(80)
            .borderRadius(4)
            .margin({ top: 8 })
          
          if (index < this.displayedReviews.length - 1) {
            Divider().color('#F0F0F0').margin({ top: 12, bottom: 4 })
          }
        }
        .alignItems(HorizontalAlign.Start)
        .width('100%')
      })
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 8 })
  }

  @Builder
  buildDetailImages() {
    Column() {
      // 问大家部分
      Row() {
        Text('问大家 · ' + (this.displayedQA.length > 1 ? this.displayedQA.length : '2'))
          .fontSize(16)
          .fontColor('#333333')
          .fontWeight(FontWeight.Medium)
        
        Blank()
        
        Text(this.showAllQA ? '收起' : '查看更多')
          .fontSize(13)
          .fontColor('#999999')
          .onClick(() => {
            if (!this.showAllQA) {
              this.expandQA();
            } else {
              this.showAllQA = false;
              this.displayedQA = [this.displayedQA[0]];
            }
          })
        Image($r('sys.symbol.chevron_right'))
          .width(16)
          .height(16)
          .fillColor(Color.Black)
      }
      .width('100%')
      .margin({ bottom: 16 })
      
      // 问大家列表
      ForEach(this.displayedQA, (qa: QAItem, index: number) => {
        Column({ space: 8 }) {
          Row() {
            Image($r('app.media.goodsImg'))
              .width(24)
              .height(24)
              .borderRadius(12)
            
            Text(qa.user)
              .fontSize(13)
              .fontColor('#333333')
              .margin({ left: 8 })
            
            Blank()
            
            Text(qa.answerCount + '个回答')
              .fontSize(11)
              .fontColor('#999999')
          }
          .width('100%')
          
          Text('问: ' + qa.question)
            .fontSize(14)
            .fontColor('#333333')
            .fontWeight(FontWeight.Medium)
            .margin({ top: 4 })
          
          Text('答: ' + qa.answer)
            .fontSize(13)
            .fontColor('#666666')
            .lineHeight(20)
            .margin({ top: 8 })
          
          if (index < this.displayedQA.length - 1) {
            Divider().color('#F0F0F0').margin({ top: 12, bottom: 12 })
          }
        }
        .alignItems(HorizontalAlign.Start)
        .width('100%')
      })
      
      Divider().color('#E5E5E5').margin({ top: 16, bottom: 16 })
      
      // 店铺推荐
      Text('店铺推荐')
        .fontSize(16)
        .fontColor('#333333')
        .fontWeight(FontWeight.Medium)
        .width('100%')
        .margin({ bottom: 16 })
      
      // 推荐商品网格
      Grid() {
        ForEach(this.recommendedGoods, (item: GoodsListItemType, index: number) => {
          GridItem() {
            Column() {
              Image(item.cover)
                .width('100%')
                .aspectRatio(1)
                .borderRadius(8)
              
              Text(item.title)
                .fontSize(12)
                .fontColor('#333333')
                .maxLines(2)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .margin({ top: 8 })
              
              Text('¥' + item.price.toFixed(2))
                .fontSize(14)
                .fontColor('#FF0000')
                .fontWeight(FontWeight.Bold)
                .margin({ top: 4 })
            }
            .onClick(() => {
              // 跳转到该商品详情页
              router.pushUrl({
                url: 'pages/GoodsDetailPage',
                params: { goods: item }
              }).catch((err: Error) => {
                console.error('跳转失败:', err.message);
              });
            })
          }
        })
      }
      .columnsTemplate('1fr 1fr')
      .columnsGap(12)
      .rowsGap(12)
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor(Color.White)
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  buildBottomBar() {
    Row() {
      // 店铺
      Column({ space: 2 }) {
        Image($r('app.media.dianpu'))
          .width(22)
          .height(22)
          .fillColor(Color.Black)
        Text('店铺')
          .fontSize(10)
          .fontColor('#666666')
      }
      .width(50)
      .justifyContent(FlexAlign.Center)
      
      // 收藏
      Column({ space: 2 }) {
        Image(this.isFavorited ? $r('app.media.yishoucang') : $r('app.media.shoucang'))
          .width(22)
          .height(22)
          .fillColor(this.isFavorited ? '#FF6600' : Color.Black)
        Text('收藏')
          .fontSize(10)
          .fontColor('#666666')
      }
      .width(50)
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        this.isFavorited = !this.isFavorited;
      })
      
      // 客服
      Column({ space: 2 }) {
        Image($r('app.media.kefu'))
          .width(22)
          .height(22)
          .fillColor(Color.Black)
        Text('客服')
          .fontSize(10)
          .fontColor('#666666')
      }
      .width(50)
      .justifyContent(FlexAlign.Center)
      
      Blank()
      
      // 进店逛逛
      Button('进店逛逛')
        .fontSize(13)
        .fontColor('#FF6600')
        .backgroundColor('#FFE8D6')
        .borderRadius(20)
        .height(40)
        .width(90)
      
      // 立即购买
      Button('立即购买')
        .fontSize(13)
        .fontColor(Color.White)
        .backgroundColor('#FF6600')
        .borderRadius(20)
        .height(40)
        .width(90)
        .margin({ left: 8 })
    }
    .width('100%')
    .height(60)
    .padding({ left: 12, right: 12, top: 8, bottom: 8 })
    .backgroundColor(Color.White)
    .shadow({ radius: 8, color: '#10000000', offsetY: -2 })
    .alignItems(VerticalAlign.Center)
  }
}
