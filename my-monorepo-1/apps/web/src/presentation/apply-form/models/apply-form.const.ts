/** 申請種別 */
export const TripType = {
    /** 国内出張 */
    DOMESTIC: 'domestic',
    /** 海外出張 */
    OVERSEAS: 'overseas',
} as const;

/** 宿泊手配の希望 */
export const NeedHotel = {
    /** 希望しない */
    NONE: 'none',
    /** 希望する */
    DESIRED: 'desired',
} as const;

/** 希望宿泊ランク */
export const HotelRank = {
    /** 未選択 */
    NONE: '',
    /** スタンダード */
    STANDARD: 'standard',
    /** デラックス */
    DELUXE: 'deluxe',
};
