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
    ItemCleared: 'itemCleared',
    ProcessStarted: 'processStarted',
    IdleEntered: 'idleEntered',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.ItemSelected; item: Item }
    | { type: typeof ActionType.ItemCleared }
    | { type: typeof ActionType.ProcessStarted }
    | { type: typeof ActionType.IdleEntered };

export function itemSelect(dispatch: React.Dispatch<Action>, item: Item): void {
    dispatch({ type: ActionType.ItemSelected, item });
}

export function itemClear(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.ItemCleared });
}

export function startProcess(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.ProcessStarted });
}

export function toIdle(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.IdleEntered });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ItemSelected:
            return {
                ...state,
                selectedItem: action.item,
            };
        case ActionType.ItemCleared:
            return initialState;
        case ActionType.ProcessStarted:
            return {
                ...state,
                step: Step.Processing,
            };
        case ActionType.IdleEntered:
            return {
                ...state,
                step: Step.Idle,
            };
        default:
            return state;
    }
};
