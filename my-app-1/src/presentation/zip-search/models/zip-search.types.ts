export const FormKeys = {
    zipcode: 'zipcode',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];
