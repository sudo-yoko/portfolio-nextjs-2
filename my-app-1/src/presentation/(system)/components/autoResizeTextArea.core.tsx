/**
 * 自動サイズ調整機能付きテキストエリア
 */
'use client';

import { Violation } from '@/presentation/(system)/validation/validation.types';
import { useEffect, useRef } from 'react';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  violation?: Violation;
  className?: string;
};

export function AutoResizeTextAreaCore(props: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      resizeTextArea(ref.current);
    }
  }, [props.value, props.violation]); // 入力値が変わった場合と、バリデーションエラーの状態が変わった場合にリサイズする
  // TODO: Retryableの時もリサイズされるので後で調査

  return (
    <textarea
      ref={ref}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={props.className}
    />
  );
}

function resizeTextArea(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
  /*
  const PADDING_Y = 4; // textareaの上下paddingの値＋上下border値
  const lineHeightStr = getComputedStyle(textarea).getPropertyValue('line-height');
  const lineHeight = lineHeightStr.replace(/[^-\d\.]/g, '') as unknown as number;
  const lines = (textarea.value + '\n').match(/\n/g)!.length;
  const elementHeightStr = getComputedStyle(textarea).getPropertyValue('height');
  const elementHeight = elementHeightStr.replace(/[^-\d\.]/g, '') as unknown as number;
  if (elementHeight - PADDING_Y < lineHeight * lines) {
    textarea.style.height = lineHeight * lines + PADDING_Y + 'px';
    
  }*/
}
