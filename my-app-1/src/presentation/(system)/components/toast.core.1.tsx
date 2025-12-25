//
// トースト通知
//
'use client';

import { useEffect, useRef, useState } from 'react';

export type Props = {
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
};

export function ToastCore(props: Props) {
    const [open, setOpen] = useState(false);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // ふわっと表示
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 10);

        // コンポーネントがアンマウントするときにタイマーを削除する
        return () => {
            clearTimeout(timer);
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        };
    }, []);

    // ふわっと消す
    function handleClose() {
        if (!open) return; // 連打防止
        setOpen(false);
        closeTimerRef.current = setTimeout(() => {
            props.onClose();
        }, 1000);
    }

    return (
        <div title="閉じる" className="fixed animate-bounce cursor-pointer" onClick={handleClose}>
            <div className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                    {props.message.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

//center-4 center-4 fixed rounded ${props.bgColor} px-4 py-2 shadow-lg
//<div className={`center-4 center-4 fixed rounded ${className}  shadow-lg ${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
//center-4 center-4 fixed ${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500
/*
            <div className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                    {props.message.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </div>
            */
/*
                        {open && (
                <div className={`opacity-100 transition-opacity duration-500`}>
                    <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                        {props.message.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                </div>
            )}
            {!open && (
                <div className={`opacity-0 transition-opacity duration-500`}>
                    <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                        {props.message.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                </div>
            )}
                */
