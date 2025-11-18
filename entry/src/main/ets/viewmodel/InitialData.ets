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
  images: Resource[];
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
  isNew: boolean;
  isHot: boolean;
  isFreeShipping: boolean;
  hasCoupon: boolean;
  tags: Resource[];
  height: number;
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
      images: [$r('app.media.goodsImg'), $r('app.media.goodsImg_2'), $r('app.media.goodsImg_3'), $r('app.media.goodsImg_4')]
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
  isNew: boolean;
  isHot: boolean;
  isFreeShipping: boolean;
  hasCoupon: boolean;
}

const goodsSeeds: GoodsSeed[] = [
  {
    cover: $r('app.media.goodsImg'),
    title: $r('app.string.goods_tea_drink'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 199,
    category: CategoryType.Featured,
    subCategory: 'trending',
    keyword: 'tea limited low fat featured',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_2'),
    title: $r('app.string.goods_milk_tea'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 265,
    category: CategoryType.Featured,
    subCategory: 'limited',
    keyword: 'milk tea limited selected',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false
  },
  
  {
    cover: $r('app.media.goodsImg_3'),
    title: $r('app.string.goods_android_phone'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 810,
    category: CategoryType.Phone,
    subCategory: 'android',
    keyword: 'android phone flagship 5g',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_4'),
    title: $r('app.string.goods_ios_phone'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 999,
    category: CategoryType.Phone,
    subCategory: 'ios',
    keyword: 'ios phone flagship',
    isNew: false,
    isHot: true,
    isFreeShipping: false,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg'),
    title: $r('app.string.goods_mens_coat'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 520,
    category: CategoryType.Clothes,
    subCategory: 'men',
    keyword: 'men coat winter',
    isNew: true,
    isHot: false,
    isFreeShipping: true,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_2'),
    title: $r('app.string.goods_womens_dress'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 430,
    category: CategoryType.Clothes,
    subCategory: 'women',
    keyword: 'dress women spring',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false
  },
  {
    cover: $r('app.media.goodsImg_3'),
    title: $r('app.string.goods_snacks'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 260,
    category: CategoryType.Food,
    subCategory: 'snacks',
    keyword: 'snacks imported healthy',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_4'),
    title: $r('app.string.goods_drinks'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 320,
    category: CategoryType.Food,
    subCategory: 'drinks',
    keyword: 'drinks fresh juice',
    isNew: true,
    isHot: false,
    isFreeShipping: false,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_2'),
    title: $r('app.string.goods_smart_speaker'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 680,
    category: CategoryType.Home,
    subCategory: 'smart',
    keyword: 'smart home speaker',
    isNew: true,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: true
  },
  {
    cover: $r('app.media.goodsImg_3'),
    title: $r('app.string.goods_kitchen_appliance'),
    description: $r('app.string.advertising_language'),
    evaluate: $r('app.string.evaluate'),
    price: 450,
    category: CategoryType.Home,
    subCategory: 'kitchen',
    keyword: 'kitchen appliance compact',
    isNew: false,
    isHot: true,
    isFreeShipping: true,
    hasCoupon: false
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
        isNew: dynamicNew,
        isHot: dynamicHot,
        isFreeShipping: seed.isFreeShipping,
        hasCoupon: dynamicCoupon,
        tags: buildTags(seed, dynamicHot, dynamicNew, dynamicCoupon),
        height: WATERFALL_HEIGHTS[(seedIndex + offset) % WATERFALL_HEIGHTS.length]
      });
    }
  });
  return pool;
})();
