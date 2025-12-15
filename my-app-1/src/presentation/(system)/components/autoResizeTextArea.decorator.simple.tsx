/**
 * 自動サイズ調整機能付きテキストエリア用デコレーション
 */
'use client';

import { AutoResizeTextAreaCore } from '@/presentation/(system)/components/autoResizeTextArea.core';
import { Violation } from '@/presentation/(system)/validation/validation.types';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  violation?: Violation;
};

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
