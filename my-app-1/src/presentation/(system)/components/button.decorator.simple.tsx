/**
 * ボタンに共通デザインを適用するデコレーター
 */
'use client';

import { ComponentPropsWithoutRef } from 'react';

// buttonのプロパティ
type ButtonProps = ComponentPropsWithoutRef<'button'>;

//
type Props = Omit<ButtonProps, 'type' | 'className'>;

export function Button(props: Props) {
    return (
        <button
            {...props}
            type="button"
            className="cursor-pointer rounded-lg bg-indigo-300 px-4 py-2 transition-all hover:brightness-95 active:scale-95"
        />
    );
}
