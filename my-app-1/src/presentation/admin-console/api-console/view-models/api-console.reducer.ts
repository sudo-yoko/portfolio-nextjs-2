'use client';

import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';
import React, { Reducer } from 'react';

export const Step = {
    Idle: 'idle',
    Processing: 'processing',
    Abort: 'abort',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export type State = {
    step: Step;
    selectedItem?: Item;
};

export const initialState: State = {
    step: Step.Idle,
};

export const ActionType = {
    ItemSelected: 'itemSelected',
};
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action = { type: typeof ActionType.ItemSelected; item: Item };

export function itemSelect(dispatch: React.Dispatch<Action>, item: Item): void {
    dispatch({ type: ActionType.ItemSelected, item });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ItemSelected:
            return {
                ...state,
                selectedItem: action.item,
            };
        default:
            return state;
    }
};
