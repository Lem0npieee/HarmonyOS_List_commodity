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
    searchIndex: string; // 智能搜索索引
    isNew: boolean;
    isHot: boolean;
    isFreeShipping: boolean;
    hasCoupon: boolean;
    tags: Resource[];
    height: number;
    // 详情页所需字段
    detailImages?: Resource[]; // 商品详情图片
    originalPrice?: number; // 原价
    salesCount?: number; // 销量
    rating?: number; // 评分
    ratingCount?: number; // 评价数
    shopName?: string; // 店铺名称
    specifications?: string[]; // 规格选项
    deliveryInfo?: string; // 配送信息
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
            images: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
            images: [{ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
            images: [{ "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
            images: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
            images: [{ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }]
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
    searchIndex: string; // 智能搜索索引
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
        cover: { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777309, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 199,
        category: CategoryType.Featured,
        subCategory: 'trending',
        keyword: 'tea limited low fat featured',
        searchIndex: '畅乐冰晶绿低脂茶饮 茶 绿茶 低脂 新品 饮料 冰晶绿 tea drink low fat',
        isNew: true,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: true,
        detailImages: [{ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 299,
        salesCount: 7,
        rating: 4.8,
        ratingCount: 5234,
        shopName: '畅乐官方旗舰店',
        specifications: ['小薇', '中薇', '大薇'],
        deliveryInfo: '不支持7天无理由退换'
    },
    {
        cover: { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777306, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 265,
        category: CategoryType.Featured,
        subCategory: 'limited',
        keyword: 'milk tea limited selected',
        searchIndex: '香港风味丝袖奶茶 奶茶 香港 丝袖 饮料 milk tea limited',
        isNew: false,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: false,
        detailImages: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 350,
        salesCount: 12,
        rating: 4.9,
        ratingCount: 8956,
        shopName: '港式饮品专卖',
        specifications: ['原味', '少糖', '无糖'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777301, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 810,
        category: CategoryType.Phone,
        subCategory: 'android',
        keyword: 'android phone flagship 5g',
        searchIndex: '华为 Mate 60 Pro 5G智能手机 华为 手机 智能 安卓 5G 旗舰 mate android phone',
        isNew: true,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: true,
        detailImages: [{ "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 6999,
        salesCount: 3456,
        rating: 4.9,
        ratingCount: 12845,
        shopName: '华为官方旗舰店',
        specifications: ['12GB+256GB', '12GB+512GB', '12GB+1TB'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 999,
        category: CategoryType.Phone,
        subCategory: 'ios',
        keyword: 'ios phone flagship',
        searchIndex: 'iPhone 15 Pro Max 苹果 手机 蓝色 钛金属 旗舰 iphone ios apple',
        isNew: false,
        isHot: true,
        isFreeShipping: false,
        hasCoupon: true,
        detailImages: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 9999,
        salesCount: 8900,
        rating: 5.0,
        ratingCount: 23456,
        shopName: 'Apple官方旗舰店',
        specifications: ['256GB', '512GB', '1TB'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777305, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 520,
        category: CategoryType.Clothes,
        subCategory: 'men',
        keyword: 'men coat winter',
        searchIndex: '男士羊毛大衣 男装 大衣 羊毛 冬季 保暖 商务 men coat winter',
        isNew: true,
        isHot: false,
        isFreeShipping: true,
        hasCoupon: true,
        detailImages: [{ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 899,
        salesCount: 567,
        rating: 4.7,
        ratingCount: 3421,
        shopName: '男士服饰旗舰店',
        specifications: ['M码', 'L码', 'XL码', 'XXL码'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777310, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 430,
        category: CategoryType.Clothes,
        subCategory: 'women',
        keyword: 'dress women spring',
        searchIndex: '春季花卉连衣裙 女装 连衣裙 春季 花卉 法式 复古 dress women spring',
        isNew: true,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: false,
        detailImages: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 699,
        salesCount: 1234,
        rating: 4.8,
        ratingCount: 6789,
        shopName: '法式女装馆',
        specifications: ['S码', 'M码', 'L码'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777308, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 260,
        category: CategoryType.Food,
        subCategory: 'snacks',
        keyword: 'snacks imported healthy',
        searchIndex: '三只松鼠坚果组合装 零食 坚果 三只松鼠 健康 每日坚果 snacks nuts healthy',
        isNew: false,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: true,
        detailImages: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 358,
        salesCount: 5678,
        rating: 4.9,
        ratingCount: 15432,
        shopName: '三只松鼠旗舰店',
        specifications: ['经典装', '豪华装', '礼盒装'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777302, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 320,
        category: CategoryType.Food,
        subCategory: 'drinks',
        keyword: 'drinks fresh juice',
        searchIndex: '农夫山泉100%NFC鲜榨汁 饮料 果汁 鲜榨汁 农夫山泉 NFC 橙汁 drinks juice orange',
        isNew: true,
        isHot: false,
        isFreeShipping: false,
        hasCoupon: true,
        detailImages: [{ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 450,
        salesCount: 2345,
        rating: 4.8,
        ratingCount: 8765,
        shopName: '农夫山泉官方店',
        specifications: ['300ml*10瓶', '300ml*20瓶', '300ml*30瓶'],
        deliveryInfo: '不支持7天无理由退换'
    },
    {
        cover: { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777307, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 680,
        category: CategoryType.Home,
        subCategory: 'smart',
        keyword: 'smart home speaker',
        searchIndex: '小爱音箱Pro 智能音箱 AI语音助手 智能家居 音箱 小爱 AI smart speaker home',
        isNew: true,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: true,
        detailImages: [{ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 899,
        salesCount: 4567,
        rating: 4.9,
        ratingCount: 11234,
        shopName: '小米智能家居',
        specifications: ['白色', '黑色', '灰色'],
        deliveryInfo: '支持7天无理由退换'
    },
    {
        cover: { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        title: { "id": 16777304, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        description: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        evaluate: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" },
        price: 450,
        category: CategoryType.Home,
        subCategory: 'kitchen',
        keyword: 'kitchen appliance compact',
        searchIndex: '九阳破壁料理机 厨房 电器 破壁机 九阳 料理机 研磨机 kitchen appliance',
        isNew: false,
        isHot: true,
        isFreeShipping: true,
        hasCoupon: false,
        detailImages: [{ "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.list_harmony", "moduleName": "entry" }],
        originalPrice: 799,
        salesCount: 3456,
        rating: 4.7,
        ratingCount: 9876,
        shopName: '九阳官方旗舰店',
        specifications: ['基础版', '升级版', '旗舰版'],
        deliveryInfo: '支持7天无理由退换'
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
