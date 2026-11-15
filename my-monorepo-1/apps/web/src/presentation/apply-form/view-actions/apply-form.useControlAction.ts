//
// 申請フォーム 状態管理カスタムフック
//
'use client';

import { useReducer } from 'react';

import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import {
    initialState,
    reducer,
    setValue,
} from '@/presentation/apply-form/view-actions/apply-form.control-reducer';

export function useControlAction() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function updateValue(formKey: FormKeys, value: string) {
        setValue(dispatch, formKey, value);
    }

    return {
        state,
        updateValue,
    };
}
