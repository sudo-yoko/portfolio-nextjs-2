export const FormKeys = {
    customerId: 'customerId',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];