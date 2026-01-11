'use client';

import { MenuInfo } from '@/presentation/(system)/menu/mvvm/models/menu.types';
import React, { Reducer } from 'react';

export const Step = {
    Idle: 'idle',
    Processing: 'processing',
    Abort: 'abort',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export type State = {
    step: Step;
    isSidePeek: boolean;
    isPopover: boolean;
    menuInfo: MenuInfo;
};

export const initialState: State = {
    step: Step.Idle,
    isSidePeek: false,
    isPopover: false,
    menuInfo: {
        profile: {
            userName: '',
            orgName: '',
            mailAddress: '',
        },
    },
};

export const ActionType = {
    SidePeekOpened: 'sidePeekOpened',
    SidePeekClosed: 'sidePeekClosed',
    PopoverOpened: 'popoverOpened',
    PopoverClosed: 'popoverClosed',
    ProcessStarted: 'processStarted',
    ProcessAborted: 'processAborted',
    ProfileLoaded: 'ProfileLoaded',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.SidePeekOpened }
    | { type: typeof ActionType.SidePeekClosed }
    | { type: typeof ActionType.PopoverOpened }
    | { type: typeof ActionType.PopoverClosed }
    | { type: typeof ActionType.ProcessStarted }
    | { type: typeof ActionType.ProcessAborted }
    | { type: typeof ActionType.ProfileLoaded; menuInfo: MenuInfo };

export function sidePeekOpen(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.SidePeekOpened });
}

export function sidePeekClose(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.SidePeekClosed });
}

export function popoverOpen(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.PopoverOpened });
}

export function popoverClose(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.PopoverClosed });
}
export function processStart(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.ProcessStarted });
}

export function processAbort(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.ProcessAborted });
}

export function setProfile(dispatch: React.Dispatch<Action>, menuInfo: MenuInfo): void {
    dispatch({ type: ActionType.ProfileLoaded, menuInfo });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SidePeekOpened:
            return {
                ...state,
                isSidePeek: true,
            };
        case ActionType.SidePeekClosed:
            return {
                ...state,
                isSidePeek: false,
            };
        case ActionType.PopoverOpened:
            return {
                ...state,
                isPopover: true,
            };
        case ActionType.PopoverClosed:
            return {
                ...state,
                isPopover: false,
            };
        case ActionType.ProcessStarted:
            return {
                ...state,
                step: Step.Processing,
            };
        case ActionType.ProcessAborted:
            return {
                ...state,
                step: Step.Abort,
            };
        case ActionType.ProfileLoaded:
            return {
                ...state,
                step: Step.Idle,
                menuInfo: action.menuInfo,
            };
        default:
            return state;
    }
};
