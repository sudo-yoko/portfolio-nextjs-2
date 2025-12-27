//
// トースト通知
// （開閉アニメーションなし）
//
'use client';

export type Props = {
    message: string[];
    bgColor: string;
    textColor: string;
    onClose: () => void;
};

export function ToastCore(props: Props) {
    // トーストを閉じる
    function handleClose() {
        props.onClose();
    }

    return (
        <div title="閉じる" className="fixed cursor-pointer" onClick={handleClose}>
            <div className={`rounded ${props.bgColor} px-4 py-2 ${props.textColor} shadow-lg`}>
                {props.message.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}
