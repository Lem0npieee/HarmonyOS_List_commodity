/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export enum CategoryType {
  Featured = 'featured',
  Phone = 'phone',
  Clothes = 'clothes',
  Food = 'food',
  Home = 'home'
}

export enum SortOption {
  Comprehensive = 'comprehensive',
  Newest = 'newest',
  PriceLow = 'price_low',
  PriceHigh = 'price_high'
}

export type FilterId = 'free_shipping' | 'coupon' | 'hot' | 'new';

export interface SubCategoryMeta {
  id: string;
  title: Resource;
}

export interface BannerMeta {
  primary: Resource;
  secondary: Resource;
  images: Array<Resource | BannerImageItem>;
}

export interface BannerImageItem {
  image: Resource;
  primary?: Resource;
  secondary?: Resource;
}

export interface TabMeta {
  id: CategoryType;
  title: Resource;
  subCategories: SubCategoryMeta[];
  banner: BannerMeta;
}

export interface SortOptionMeta {
  id: SortOption;
  title: Resource;
}

export interface FilterOptionMeta {
  id: FilterId;
  title: Resource;
}

export interface GoodsListItemType {
  id: number;
  cover: Resource;
  title: Resource;
  description: Resource;
  evaluate: Resource;
  price: number;
  category: CategoryType;
  subCategory: string;
  keyword: string;
  searchIndex: string;  // 智能搜索索引
  isNew: boolean;
  isHot: boolean;
  isFreeShipping: boolean;
  hasCoupon: boolean;
  tags: Resource[];
  height: number;
  // 详情页所需字段
  detailImages?: Resource[];  // 商品详情图片
  originalPrice?: number;     // 原价
  salesCount?: number;        // 销量
  rating?: number;            // 评分
  ratingCount?: number;       // 评价数
  shopName?: string;          // 店铺名称
  specifications?: string[];  // 规格选项
  deliveryInfo?: string;      // 配送信息
  redeemPoints?: number;      // 积分兑换所需积分
}

export const sortOptionMetas: SortOptionMeta[] = [
  { id: SortOption.Comprehensive, title: $r('app.string.sort_comprehensive') },
  { id: SortOption.Newest, title: $r('app.string.sort_new') },
  { id: SortOption.PriceLow, title: $r('app.string.sort_price_low') },
  { id: SortOption.PriceHigh, title: $r('app.string.sort_price_high') }
];

export const filterOptionMetas: FilterOptionMeta[] = [
  { id: 'free_shipping', title: $r('app.string.filter_free_shipping') },
  { id: 'coupon', title: $r('app.string.filter_coupon') },
  { id: 'hot', title: $r('app.string.filter_hot') },
  { id: 'new', title: $r('app.string.filter_new') }
];

export const tabBarMeta: TabMeta[] = [
  {
    id: CategoryType.Featured,
    title: $r('app.string.selected'),
    subCategories: [
      { id: 'all', title: $r('app.string.sub_all') },
      { id: 'trending', title: $r('app.string.sub_trending') },
      { id: 'limited', title: $r('app.string.sub_limited') }
    ],
    banner: {
      primary: $r('app.string.banner_selected_primary'),
      secondary: $r('app.string.banner_selected_secondary'),
      images: [
        { image: $r('app.media.homepage_show1'), primary: $r('app.string.home_banner_1_line1'), secondary: $r('app.string.home_banner_1_line2') },
        { image: $r('app.media.homepage_show2'), primary: $r('app.string.home_banner_2_line1'), secondary: $r('app.string.home_banner_2_line2') },
        { image: $r('app.media.homepage_show3'), primary: $r('app.string.home_banner_3_line1'), secondary: $r('app.string.home_banner_3_line2') },
        { image: $r('app.media.homepage_show4'), primary: $r('app.string.home_banner_4_line1'), secondary: $r('app.string.home_banner_4_line2') }
      ]
    }
  },
  {
    id: CategoryType.Phone,
    title: $r('app.string.mobile_phone'),
    subCategories: [
      { id: 'all', title: $r('app.string.sub_all') },
      { id: 'android', title: $r('app.string.sub_android') },
      { id: 'ios', title: $r('app.string.sub_ios') },
      { id: 'accessories', title: $r('app.string.sub_accessories') }
    ],
    banner: {
      primary: $r('app.string.banner_phone_primary'),
      secondary: $r('app.string.banner_phone_secondary'),
      images: [$r('app.media.goodsImg_2'), $r('app.media.goodsImg_3')]
    }
  },
  {
    id: CategoryType.Clothes,
    title: $r('app.string.clothes'),
    subCategories: [
      { id: 'all', title: $r('app.string.sub_all') },
      { id: 'men', title: $r('app.string.sub_men') },
      { id: 'women', title: $r('app.string.sub_women') },
      { id: 'kids', title: $r('app.string.sub_kids') }
    ],
    banner: {
      primary: $r('app.string.banner_clothes_primary'),
      secondary: $r('app.string.banner_clothes_secondary'),
      images: [$r('app.media.goodsImg_3'), $r('app.media.goodsImg_4')]
    }
  },
  {
    id: CategoryType.Food,
    title: $r('app.string.food'),
    subCategories: [
      { id: 'all', title: $r('app.string.sub_all') },
      { id: 'snacks', title: $r('app.string.sub_snacks') },
      { id: 'drinks', title: $r('app.string.sub_drinks') },
      { id: 'fresh', title: $r('app.string.sub_fresh') }
    ],
    banner: {
      primary: $r('app.string.banner_food_primary'),
      secondary: $r('app.string.banner_food_secondary'),
      images: [$r('app.media.goodsImg'), $r('app.media.goodsImg_4')]
    }
  },
  {
    id: CategoryType.Home,
    title: $r('app.string.home_furnishing'),
    subCategories: [
      { id: 'all', title: $r('app.string.sub_all') },
      { id: 'furniture', title: $r('app.string.sub_furniture') },
      { id: 'smart', title: $r('app.string.sub_smart') },
      { id: 'kitchen', title: $r('app.string.sub_kitchen') }
    ],
    banner: {
      primary: $r('app.string.banner_home_primary'),
      secondary: $r('app.string.banner_home_secondary'),
      images: [$r('app.media.goodsImg_2'), $r('app.media.goodsImg_3')]
    }
  }
];

interface GoodsSeed {
  cover: Resource;
  title: Resource;
  description: Resource;
  evaluate: Resource;
  price: number;
  category: CategoryType;
  subCategory: string;
  keyword: string;
  searchIndex: string;  // 智能搜索索引
  isNew: boolean;
  isHot: boolean;
  isFreeShipping: boolean;
  hasCoupon: boolean;
  // 详情页字段
  detailImages?: Resource[];
  originalPrice?: number;
  salesCount?: number;
  rating?: number;
  ratingCount?: number;
  shopName?: string;
  specifications?: string[];
  deliveryInfo?: string;
}

const goodsSeeds: GoodsSeed[] = [
  {
    cover: $r('app.media.Bingjinlv_1'),
    title: $r('app.string.goods_tea_drink'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 199,
    category: CategoryType.Featured,
    subCategory: 'trending',
    keyword: 'tea limited low fat featured',
    searchIndex: '畅乐冰晶绿低脂茶饮 茶 绿茶 低脂 新品 饮料 冰晶绿 tea drink low fat',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true,
    detailImages: [$r('app.media.Bingjinlv_2'), $r('app.media.Bingjinlv_3')],
    originalPrice: 299,
    salesCount: 7,
    rating: 4.8,
    ratingCount: 5234,
    shopName: '畅乐官方旗舰店',
    specifications: ['小薇', '中薇', '大薇'],
    deliveryInfo: '不支持7天无理由退换'
  },
  {
    cover: $r('app.media.Milktea_1'),
    title: $r('app.string.goods_milk_tea'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 265,
    category: CategoryType.Featured,
    subCategory: 'limited',
    keyword: 'milk tea limited selected',
    searchIndex: '香港风味丝袖奶茶 奶茶 香港 丝袖 饮料 milk tea limited',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false,
    detailImages: [$r('app.media.Milktea_2'), $r('app.media.Milktea_3')],
    originalPrice: 350,
    salesCount: 12,
    rating: 4.9,
    ratingCount: 8956,
    shopName: '港式饮品专卖',
    specifications: ['原味', '少糖', '无糖'],
    deliveryInfo: '支持7天无理由退换'
  },
  
  {
    cover: $r('app.media.goodsImg_Huawei_1'),
    title: $r('app.string.goods_android_phone'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 810,
    category: CategoryType.Phone,
    subCategory: 'android',
    keyword: 'android phone flagship 5g',
    searchIndex: '华为 Mate 60 Pro 5G智能手机 华为 手机 智能 安卓 5G 旗舰 mate android phone',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true,
    detailImages: [$r('app.media.goodsImg_Huawei_2'), $r('app.media.goodsImg_Huawei_3')],
    originalPrice: 6999,
    salesCount: 3456,
    rating: 4.9,
    ratingCount: 12845,
    shopName: '华为官方旗舰店',
    specifications: ['12GB+256GB', '12GB+512GB', '12GB+1TB'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.goodsImg_IPhone_1'),
    title: $r('app.string.goods_ios_phone'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 999,
    category: CategoryType.Phone,
    subCategory: 'ios',
    keyword: 'ios phone flagship',
    searchIndex: 'iPhone 15 Pro Max 苹果 手机 蓝色 钛金属 旗舰 iphone ios apple',
    isNew: false,
    isHot: true,
    isFreeShipping: false,
    hasCoupon: true,
    detailImages: [$r('app.media.goodsImg_IPhone_2'), $r('app.media.goodsImg_IPhone_3')],
    originalPrice: 9999,
    salesCount: 8900,
    rating: 5.0,
    ratingCount: 23456,
    shopName: 'Apple官方旗舰店',
    specifications: ['256GB', '512GB', '1TB'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.coat_1'),
    title: $r('app.string.goods_mens_coat'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 520,
    category: CategoryType.Clothes,
    subCategory: 'men',
    keyword: 'men coat winter',
    searchIndex: '男士羊毛大衣 男装 大衣 羊毛 冬季 保暖 商务 men coat winter',
    isNew: true,
    isHot: false,
    isFreeShipping: true,
    hasCoupon: true,
    detailImages: [$r('app.media.coat_2'), $r('app.media.coat_3')],
    originalPrice: 899,
    salesCount: 567,
    rating: 4.7,
    ratingCount: 3421,
    shopName: '男士服饰旗舰店',
    specifications: ['M码', 'L码', 'XL码', 'XXL码'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.dress_1'),
    title: $r('app.string.goods_womens_dress'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 430,
    category: CategoryType.Clothes,
    subCategory: 'women',
    keyword: 'dress women spring',
    searchIndex: '春季花卉连衣裙 女装 连衣裙 春季 花卉 法式 复古 dress women spring',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false,
    detailImages: [$r('app.media.dress_2'), $r('app.media.dress_3')],
    originalPrice: 699,
    salesCount: 1234,
    rating: 4.8,
    ratingCount: 6789,
    shopName: '法式女装馆',
    specifications: ['S码', 'M码', 'L码'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.goodsImg_ThreeSquirrel_1'),
    title: $r('app.string.goods_snacks'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 260,
    category: CategoryType.Food,
    subCategory: 'snacks',
    keyword: 'snacks imported healthy',
    searchIndex: '三只松鼠坚果组合装 零食 坚果 三只松鼠 健康 每日坚果 snacks nuts healthy',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true,
    detailImages: [$r('app.media.goodsImg_ThreeSquirrel_2'), $r('app.media.goodsImg_ThreeSquirrel_3')],
    originalPrice: 358,
    salesCount: 5678,
    rating: 4.9,
    ratingCount: 15432,
    shopName: '三只松鼠旗舰店',
    specifications: ['经典装', '豪华装', '礼盒装'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.goodsImg_NFC_1'),
    title: $r('app.string.goods_drinks'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 320,
    category: CategoryType.Food,
    subCategory: 'drinks',
    keyword: 'drinks fresh juice',
    searchIndex: '农夫山泉100%NFC鲜榨汁 饮料 果汁 鲜榨汁 农夫山泉 NFC 橙汁 drinks juice orange',
    isNew: true,
    isHot: false,
    isFreeShipping: false,
    hasCoupon: true,
    detailImages: [$r('app.media.goodsImg_NFC_2'), $r('app.media.goodsImg_NFC_3')],
    originalPrice: 450,
    salesCount: 2345,
    rating: 4.8,
    ratingCount: 8765,
    shopName: '农夫山泉官方店',
    specifications: ['300ml*10瓶', '300ml*20瓶', '300ml*30瓶'],
    deliveryInfo: '不支持7天无理由退换'
  },
  {
    cover: $r('app.media.goodsImg_Xiaoaiyinxiang_1'),
    title: $r('app.string.goods_smart_speaker'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 680,
    category: CategoryType.Home,
    subCategory: 'smart',
    keyword: 'smart home speaker',
    searchIndex: '小爱音箱Pro 智能音箱 AI语音助手 智能家居 音箱 小爱 AI smart speaker home',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true,
    detailImages: [$r('app.media.goodsImg_Xiaoaiyinxiang_2'), $r('app.media.goodsImg_Xiaoaiyinxiang_3'), $r('app.media.goodsImg_Xiaoaiyinxiang_4')],
    originalPrice: 899,
    salesCount: 4567,
    rating: 4.9,
    ratingCount: 11234,
    shopName: '小米智能家居',
    specifications: ['白色', '黑色', '灰色'],
    deliveryInfo: '支持7天无理由退换'
  },
  {
    cover: $r('app.media.goodsImg_Juicer_1'),
    title: $r('app.string.goods_kitchen_appliance'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 450,
    category: CategoryType.Home,
    subCategory: 'kitchen',
    keyword: 'kitchen appliance compact',
    searchIndex: '九阳破壁料理机 厨房 电器 破壁机 九阳 料理机 研磨机 kitchen appliance',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false,
    detailImages: [$r('app.media.goodsImg_Juicer_2'), $r('app.media.goodsImg_Juicer_3')],
    originalPrice: 799,
    salesCount: 3456,
    rating: 4.7,
    ratingCount: 9876,
    shopName: '九阳官方旗舰店',
    specifications: ['基础版', '升级版', '旗舰版'],
    deliveryInfo: '支持7天无理由退换'
  }
];

const TAG_HOT: Resource = $r('app.string.tag_hot');
const TAG_NEW: Resource = $r('app.string.tag_new');
const TAG_FREE: Resource = $r('app.string.tag_free_shipping');
const TAG_COUPON: Resource = $r('app.string.tag_coupon');
const WATERFALL_HEIGHTS: number[] = [180, 210, 240, 200, 230];

const buildTags = (seed: GoodsSeed, dynamicHot: boolean, dynamicNew: boolean, dynamicCoupon: boolean): Resource[] => {
  const tags: Resource[] = [];
  if (dynamicHot) {
    tags.push(TAG_HOT);
  }
  if (dynamicNew) {
    tags.push(TAG_NEW);
  }
  if (seed.isFreeShipping) {
    tags.push(TAG_FREE);
  }
  if (dynamicCoupon) {
    tags.push(TAG_COUPON);
  }
  return tags;
}

export const goodsPool: GoodsListItemType[] = (() => {
  const pool: GoodsListItemType[] = [];
  let idCursor: number = 1;
  goodsSeeds.forEach((seed: GoodsSeed, seedIndex: number) => {
    for (let offset = 0; offset < 5; offset++) {
      const dynamicHot: boolean = offset % 2 === 0 ? seed.isHot : !seed.isHot;
      const dynamicNew: boolean = offset % 3 === 0 ? true : seed.isNew;
      const dynamicCoupon: boolean = offset % 2 === 1 ? true : seed.hasCoupon;
      pool.push({
        id: idCursor++,
        cover: seed.cover,
        title: seed.title,
        description: seed.description,
        evaluate: seed.evaluate,
        price: seed.price + offset * 15,
        category: seed.category,
        subCategory: seed.subCategory,
        keyword: `${seed.keyword} ${seed.subCategory} round${offset} seed${seedIndex}`,
        searchIndex: seed.searchIndex,
        isNew: dynamicNew,
        isHot: dynamicHot,
        isFreeShipping: seed.isFreeShipping,
        hasCoupon: dynamicCoupon,
        tags: buildTags(seed, dynamicHot, dynamicNew, dynamicCoupon),
        height: WATERFALL_HEIGHTS[(seedIndex + offset) % WATERFALL_HEIGHTS.length],
        // 详情页字段
        detailImages: seed.detailImages,
        originalPrice: seed.originalPrice,
        salesCount: seed.salesCount,
        rating: seed.rating,
        ratingCount: seed.ratingCount,
        shopName: seed.shopName,
        specifications: seed.specifications,
        deliveryInfo: seed.deliveryInfo
      });
    }
  });
  return pool;
})();
