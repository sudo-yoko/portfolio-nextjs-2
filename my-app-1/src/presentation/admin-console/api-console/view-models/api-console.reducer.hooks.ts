'use client';

import {
    Action,
    initialState,
    itemClear,
    itemSelect,
    reducer,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import React, { useReducer } from 'react';
import { Item } from '../models/api-console.types';

export function useApiConsole() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch };
}

export function handleItemSelect(dispatch: React.Dispatch<Action>, item: Item) {
    itemSelect(dispatch, item);
}

export function handleItemClear(dispatch: React.Dispatch<Action>) {
    itemClear(dispatch);
}
