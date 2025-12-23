/**
 * 自動サイズ調整機能付きテキストエリア用デコレーター
 */
'use client';

import { AutoResizeTextAreaCore, Props } from '@/presentation/(system)/components/autoResizeTextArea.core';

export function AutoResizeTextAreaSimple(props: Props) {
    return (
        <div className="w-80">
            <AutoResizeTextAreaCore
                value={props.value}
                onChange={props.onChange}
                violation={props.violation}
                className="h-full w-full border-2 border-black"
            />
        </div>
    );
}
