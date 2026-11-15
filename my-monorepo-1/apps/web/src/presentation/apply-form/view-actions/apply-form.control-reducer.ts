//
// コントロールのアクティブ化（表示／非表示や活性／非活性）の状態管理。
// ※フォーカス制御についてはReducerの外（カスタムフックなど）で行う
//
'use client';

import { Reducer } from 'react';

import { NeedHotel, TripType } from '@/presentation/apply-form/models/apply-form.const';
import { nextState, State } from '@/presentation/apply-form/models/apply-form.state';
import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import { CheckBox, createEmptyFormData, FormData } from '@my/validation';

export const initialState: State = {
    formData: initialFormData(),
    uiState: {
        passportNumberVisible: false,
        hotelRankEnabled: false,
        noteDetailEnabled: false,
        applyButtonEnabled: false,
    },
};

function initialFormData(): FormData<FormKeys> {
    const initial = createEmptyFormData(FormKeys);
    initial.tripType = TripType.DOMESTIC;
    initial.needHotel = NeedHotel.NONE;
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
            return nextState(state, action.key, action.value);
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
