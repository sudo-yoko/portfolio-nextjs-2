//
// トースト通知
//
'use client';

import { useEffect, useState } from 'react';

export type Props = {
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
};

export function ToastCore(props: Props) {
    const [open, setOpen] = useState(false);

    // ふわっと表示
    useEffect(() => {
        const id = requestAnimationFrame(() => setOpen(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // CSSアニメーション終了時
    // 引数の型を調べたい場合は、React の公式リファレンスのイベントハンドラーに関するセクションを参考
    // https://react.dev/reference/react-dom/components/common
    function handleTransitionEnd(e: React.TransitionEvent) {
        if (open) {
            return;
        }
        if (e.propertyName !== 'opacity') {
            return;
        }
        props.onClose();
    }

    // トーストを閉じる
    function handleClose() {
        if (!open) return; // 連打防止
        setOpen(false);
    }

    // TODO: アニメーション付き開閉を共通コンポーネント化
    return (
        <div title="閉じる" className="fixed cursor-pointer" onClick={handleClose}>
            {/* onTransitionEndイベント使った開閉制御 */}
            <div
                className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                    {props.message.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
