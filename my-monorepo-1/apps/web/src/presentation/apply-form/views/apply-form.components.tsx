//
// 申請フォーム 共通コンポーネント
//
'use client';

import { ReactNode } from 'react';

/**
 * 表示／非表示を指定可能なdiv
 */
export function MyDiv(props: { visible?: boolean; children: ReactNode }) {
    return props.visible && props.visible && <div>{props.children}</div>;
}

/**
 * 活性／非活を指定可能なラベル
 */
export function MyLabel(props: { disabled?: boolean; children: ReactNode }) {
    return props.disabled && props.disabled ? (
        <label className="mb-1 block text-sm font-medium text-gray-400">{props.children}</label>
    ) : (
        <label className="mb-1 block text-sm font-medium text-gray-700">{props.children}</label>
    );
}

/**
 * 活性／非活を指定可能な選択ボックス
 */
export function MySelect(props: {
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
    children: ReactNode;
}) {
    const commonProps = {
        value: props.value,
    };
    return props.disabled && props.disabled ? (
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
            onChange={(e) => props.onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            {props.children}
        </select>
    );
}

/**
 * 活性／非活を指定可能なテキストボックス
 */
export function MyInputText(props: {
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    const commonProps = {
        type: 'text' as const,
        value: props.value,
        placeholder: props.placeholder,
    };
    return props.disabled && props.disabled ? (
        <input
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
        />
    ) : (
        <input
            {...commonProps}
            onChange={(e) => props.onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    );
}

/**
 * 活性／非活を指定可能なボタン
 */
export function MyButton(props: { disabled?: boolean; buttonText: string }) {
    const commonProps = {
        type: 'button' as const,
    };
    return props.disabled && props.disabled ? (
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
