import { z } from 'zod';

import { Validator } from '@/presentation/_system/validation/validation.types';

const validateMax = (max: number): Validator => {
    const schema = z.string().max(max);
    return (value, label) => {
        if (schema.safeParse(value).success) {
            return [];
        }
        return [`${label}は${max}文字以内にしてください。`];
    };
};

export const validateMax50 = validateMax(50);
export const validateMax100 = validateMax(100);
export const validateMax150 = validateMax(150);
