//
// 申請フォーム 共通コンポーネント
//
'use client';

import { FormKeys } from '@/presentation/apply-form/models//apply-form.types';
import { State } from '@/presentation/apply-form/models/apply-form.state';
import { Action, setValue } from '@/presentation/apply-form/view-actions/apply-form.control-reducer';

/**
 * 表示／非表示を指定可能なdiv
 */
export function ReactiveDiv(props: { visible: boolean; children: React.ReactNode }) {
    return props.visible && <div>{props.children}</div>;
}

/**
 * 活性／非活を指定可能なラベル
 */
export function ReactiveLabel(props: { disabled: boolean; children: React.ReactNode }) {
    return props.disabled ? (
        <label className="mb-1 block text-sm font-medium text-gray-400">{props.children}</label>
    ) : (
        <label className="mb-1 block text-sm font-medium text-gray-700">{props.children}</label>
    );
}

/**
 * 活性／非活を指定可能な選択ボックス
 */
export function ReactiveSelect(props: {
    disabled: boolean;
    state: State;
    formKey: FormKeys;
    value: string;
    dispatch: React.ActionDispatch<[action: Action]>;
    children: React.ReactNode;
}) {
    const commonProps = {
        value: props.value,
    };
    return props.disabled ? (
        <select
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            {props.children}
        </select>
    ) : (
        <select
            {...commonProps}
            onChange={(e) => setValue(props.dispatch, props.formKey, e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            // className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            {props.children}
        </select>
    );
}

/**
 * 活性／非活を指定可能なテキストボックス
 */
export function ReactiveInputText(props: {
    disabled: boolean;
    state: State;
    formKey: FormKeys;
    value: string;
    placeholder: string;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    const commonProps = {
        type: 'text' as const,
        value: props.value,
        placeholder: props.placeholder,
    };
    return props.disabled ? (
        <input
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
        />
    ) : (
        <input
            {...commonProps}
            onChange={(e) => setValue(props.dispatch, props.formKey, e.target.value)}
            // className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-700"
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    );
}

/**
 * 活性／非活を指定可能なボタン
 */
export function ReactiveButton(props: { disabled: boolean; buttonText: string }) {
    const commonProps = {
        type: 'button' as const,
    };
    return props.disabled ? (
        <button
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-gray-400"
        >
            {props.buttonText}
        </button>
    ) : (
        <button
            {...commonProps}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
        >
            {props.buttonText}
        </button>
    );
}

/**
 * ラベル
 */
export function MyLabel(props: { children: React.ReactNode }) {
    return <ReactiveLabel disabled={false}>{props.children}</ReactiveLabel>;
}

/**
 * 選択ボックス
 */
export function MySelect(props: {
    state: State;
    formKey: FormKeys;
    value: string;
    dispatch: React.ActionDispatch<[action: Action]>;
    children: React.ReactNode;
}) {
    return (
        <ReactiveSelect
            disabled={false}
            state={props.state}
            dispatch={props.dispatch}
            formKey={props.formKey}
            value={props.value}
        >
            {props.children}
        </ReactiveSelect>
    );
}

export function MyInputText(props: {
    state: State;
    formKey: FormKeys;
    value: string;
    placeholder: string;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    return (
        <ReactiveInputText
            disabled={false}
            dispatch={props.dispatch}
            formKey={props.formKey}
            placeholder={props.placeholder}
            state={props.state}
            value={props.value}
        ></ReactiveInputText>
    );
}
