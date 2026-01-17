'use client';

import { Item } from '@/presentation/admin-console/api-console/models/api-console.types';
import {
    Action,
    initialState,
    itemClear,
    itemSelect,
    reducer,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import React, { useReducer } from 'react';

export function useConsole() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch };
}

export function handleItemSelect(dispatch: React.Dispatch<Action>, item: Item) {
    itemSelect(dispatch, item);
}

export function handleItemClear(dispatch: React.Dispatch<Action>) {
    itemClear(dispatch);
}
