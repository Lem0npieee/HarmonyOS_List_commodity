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
    Featured = "featured",
    Phone = "phone",
    Clothes = "clothes",
    Food = "food",
    Home = "home"
}
export enum SortOption {
    Comprehensive = "comprehensive",
    Newest = "newest",
    PriceLow = "price_low",
    PriceHigh = "price_high"
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
    { id: SortOption.Comprehensive, title: { "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: SortOption.Newest, title: { "id": 16777257, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: SortOption.PriceLow, title: { "id": 16777259, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: SortOption.PriceHigh, title: { "id": 16777258, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
];
export const filterOptionMetas: FilterOptionMeta[] = [
    { id: 'free_shipping', title: { "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: 'coupon', title: { "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: 'hot', title: { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
    { id: 'new', title: { "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
];
export const tabBarMeta: TabMeta[] = [
    {
        id: CategoryType.Featured,
        title: { "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        subCategories: [
            { id: 'all', title: { "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'trending', title: { "id": 16777274, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'limited', title: { "id": 16777268, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
        ],
        banner: {
            primary: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: [{ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
        }
    },
    {
        id: CategoryType.Phone,
        title: { "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        subCategories: [
            { id: 'all', title: { "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'android', title: { "id": 16777263, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'ios', title: { "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'accessories', title: { "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
        ],
        banner: {
            primary: { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: [{ "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
        }
    },
    {
        id: CategoryType.Clothes,
        title: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        subCategories: [
            { id: 'all', title: { "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'men', title: { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'women', title: { "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'kids', title: { "id": 16777266, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
        ],
        banner: {
            primary: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: [{ "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
        }
    },
    {
        id: CategoryType.Food,
        title: { "id": 16777300, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        subCategories: [
            { id: 'all', title: { "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'snacks', title: { "id": 16777313, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'drinks', title: { "id": 16777311, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'fresh', title: { "id": 16777312, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
        ],
        banner: {
            primary: { "id": 16777298, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777299, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: [{ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
        }
    },
    {
        id: CategoryType.Home,
        title: { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        subCategories: [
            { id: 'all', title: { "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'furniture', title: { "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'smart', title: { "id": 16777272, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } },
            { id: 'kitchen', title: { "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" } }
        ],
        banner: {
            primary: { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            secondary: { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
            images: [{ "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
        cover: { "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777309, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777306, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777301, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777305, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777310, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777308, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777302, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777296, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777307, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
        cover: { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777304, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
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
const TAG_HOT: Resource = { "id": 16777278, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
const TAG_NEW: Resource = { "id": 16777279, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
const TAG_FREE: Resource = { "id": 16777277, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
const TAG_COUPON: Resource = { "id": 16777276, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" };
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
};
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
