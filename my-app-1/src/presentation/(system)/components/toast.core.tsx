//
// トースト通知
//
'use client';

import { useEffect, useState } from 'react';

export type Props = {
    message: string[];
    bgColor: string;
    textColor: string;
};

export function ToastCore(props: Props) {
    const [open, setOpen] = useState(false);

    // ふわっと表示
    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 10);
    });

    function handleClose() {
        setOpen(false);
    }

    return (
        // TODO: center-4というクラスは存在しない。TailWindCSSのlintをセットアップする
        <div className="center-4 center-4 fixed" onClick={handleClose}>
            <div className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
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
