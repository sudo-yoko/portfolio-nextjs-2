'use client';

import React, { Reducer } from 'react';

export type State = {
    isSidePeek: boolean;
    isPopover: boolean;
};

export const initialState: State = {
    isSidePeek: false,
    isPopover: false,
};

export const ActionType = {
    SidePeekOpen: 'sidePeekOpen',
    SidePeekClose: 'sidePeekClose',
    PopoverOpen: 'popoverOpen',
    PopoverClose: 'popoverClose',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.SidePeekOpen }
    | { type: typeof ActionType.SidePeekClose }
    | { type: typeof ActionType.PopoverOpen }
    | { type: typeof ActionType.PopoverClose };

export function sidePeekOpen(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.SidePeekOpen });
}

export function sidePeekClose(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.SidePeekClose });
}

export function popoverOpen(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.PopoverOpen });
}

export function popoverClose(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.PopoverClose });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SidePeekOpen:
            return {
                ...state,
                isSidePeek: true,
            };
        case ActionType.SidePeekClose:
            return {
                ...state,
                isSidePeek: false,
            };
        case ActionType.PopoverOpen:
            return {
                ...state,
                isPopover: true,
            };
        case ActionType.PopoverClose:
            return {
                ...state,
                isPopover: false,
            };
        default:
            return state;
    }
};
