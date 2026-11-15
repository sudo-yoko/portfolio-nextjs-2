//
// コントロールのアクティブ化（表示／非表示や活性／非活性）の状態管理。
// ※フォーカス制御についてはReducerの外（カスタムフックなど）で行う
//
'use client';

import { Reducer } from 'react';

import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import { CheckBox, createEmptyFormData, FormData } from '@my/validation';

export type State = {
    formData: FormData<FormKeys>;
    passportNumberVisible: boolean;
    hotelRankEnabled: boolean;
    noteDetailEnabled: boolean;
    applyButtonEnabled: boolean;
};

export const initialState: State = {
    formData: initialFormData(),
    passportNumberVisible: false,
    hotelRankEnabled: false,
    noteDetailEnabled: false,
    applyButtonEnabled: false,
};

function initialFormData(): FormData<FormKeys> {
    const initial = createEmptyFormData(FormKeys);
    initial.tripType = 'domestic';
    initial.needHotel = 'none';
    initial.isAgreed = CheckBox.Off; // 0
    return initial;
}

export const ActionType = {
    setValue: 'setValue',
};

export type Action = { type: typeof ActionType.setValue; key: FormKeys; value: string };

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.setValue:
            const nextFormData: FormData<FormKeys> = { ...state.formData, [action.key]: action.value };

            if (action.key === FormKeys.tripType && action.value === 'domestic') {
                nextFormData.passportNumber = '';
            }

            if (action.key === FormKeys.needHotel && action.value === 'none') {
                nextFormData.hotelRank = '';
            }

            if (action.key === FormKeys.specialNote && action.value.trim().length === 0) {
                nextFormData.noteDetail = '';
            }

            return {
                ...state,
                formData: nextFormData,
                passportNumberVisible: nextFormData.tripType === 'overseas',
                hotelRankEnabled: nextFormData.needHotel === 'desired',
                noteDetailEnabled: nextFormData.specialNote.trim().length > 0,
                applyButtonEnabled: nextFormData.isAgreed === CheckBox.On,
            };
        default:
            return state;
    }
};

export function setValue(
    dispatch: React.ActionDispatch<[action: Action]>,
    key: FormKeys,
    value: string,
): void {
    dispatch({ type: ActionType.setValue, key, value });
}
