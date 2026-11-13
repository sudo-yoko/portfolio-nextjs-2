export const FormKeys = {
    tripType: 'tripType',
    destination: 'destination',
    passportNumber: 'passportNumber',
    needHotel: 'needHotel',
    hotelRank: 'hotelRank',
    specialNote: 'specialNote',
    noteDetail: 'noteDetail',
    isAgreed: 'isAgreed',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];
