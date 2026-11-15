//
// 申請フォーム 状態モデル
//
import { NeedHotel, TripType } from '@/presentation/apply-form/models/apply-form.const';
import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import { CheckBox, FormData } from '@my/validation';

export type State = {
    formData: FormData<FormKeys>;
    uiState: {
        passportNumberVisible: boolean;
        hotelRankEnabled: boolean;
        noteDetailEnabled: boolean;
        applyButtonEnabled: boolean;
    };
};

export function nextState(currentState: State, actionKey: FormKeys, actionValue: string): State {
    const nextFormData: State['formData'] = { ...currentState.formData, [actionKey]: actionValue };
    const nextUiState: State['uiState'] = { ...currentState.uiState };

    if (actionKey === FormKeys.tripType) {
        if (actionValue === TripType.DOMESTIC) {
            nextFormData.passportNumber = '';
            nextUiState.passportNumberVisible = false;
        } else if (actionValue === TripType.OVERSEAS) {
            nextUiState.passportNumberVisible = true;
        }
    }

    if (actionKey === FormKeys.needHotel) {
        if (actionValue === NeedHotel.NONE) {
            nextFormData.hotelRank = '';
            nextUiState.hotelRankEnabled = false;
        } else if (actionValue === NeedHotel.DESIRED) {
            nextUiState.hotelRankEnabled = true;
        }
    }

    if (actionKey === FormKeys.specialNote) {
        if (actionValue.trim().length === 0) {
            nextFormData.noteDetail = '';
            nextUiState.noteDetailEnabled = false;
        } else {
            nextUiState.noteDetailEnabled = true;
        }
    }

    if (actionKey === FormKeys.isAgreed) {
        if (actionValue === CheckBox.On) {
            nextUiState.applyButtonEnabled = true;
        } else {
            nextUiState.applyButtonEnabled = false;
        }
    }

    return {
        ...currentState,
        formData: nextFormData,
        uiState: nextUiState,
    };
}
