//
// コントロールのアクティブ化（表示／非表示や活性／非活性）状態管理
// ※フォーカス制御についてはReducerの外（カスタムフックなど）で行う
//
'use client';

import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import { FormData } from '@my/validation';

export type formState = {
    formData: FormData<FormKeys>;
    passportNumberVisible: boolean;
    hotelRankEnabled: boolean;
    noteDetailEnabled: boolean;
    applyButtonEnabled: boolean;
};
