'use client';

import {
    Squares2X2Icon,
    UserCircleIcon,
    WrenchIcon,
    BellAlertIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function Menu() {
    const [sidePeek, setSidePeek] = useState(false);
    const [popover, setPopover] = useState(false);

    useEffect(() => {}, [sidePeek]);

    function handleSidePeek() {
        setSidePeek(!sidePeek);
    }

    function handlePopover() {
        setPopover(!popover);
    }

    return (
        <div>
            {/* サイドバー */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 ${sidePeek ? 'translate-x-0' : 'translate-x-full'} transform bg-indigo-100 transition-transform duration-300 ease-out`}
            ></aside>
            {/* ヘッダー */}
            <header className="fixed top-0 right-0 flex h-10 w-full bg-indigo-200">
                <div className="mx-5 flex h-full w-full flex-row items-center">
                    <div className="basis-1/2"></div>
                    <div className="flex basis-1/2 items-center justify-end gap-4">
                        {/* ======== */}
                        <div className="relative">
                            <Squares2X2Icon
                                onClick={handlePopover}
                                className="h-7 w-7 cursor-pointer active:scale-90"
                            />
                            {/* ポップオーバー */}
                            <div
                                className={`absolute top-12 right-0 h-30 w-100 rounded-xl bg-amber-100 ${popover ? 'opacity-100' : 'opacity-0'} shadow-xl transition-opacity duration-500`}
                            >
                                <div className="flex items-center">
                                    <WrenchIcon className="h-5 w-5" />
                                    <div>設定メニュー</div>
                                </div>
                                <div className="flex items-center">
                                    <BellAlertIcon className="h-5 w-5" />
                                    <div>お知らせ一覧</div>
                                </div>
                                <div className="flex items-center">
                                    <UserGroupIcon className="h-5 w-5" />
                                    <div>連絡先</div>
                                </div>
                            </div>
                        </div>
                        {/* ======== */}
                        <UserCircleIcon
                            onClick={handleSidePeek}
                            className="h-7 w-7 cursor-pointer active:scale-90"
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

function SidePeek({ sidePeek }: { sidePeek: boolean }) {
    return (
        <aside className="fixed">
            <div
                className={`fixed top-0 right-0 h-full w-80 ${sidePeek ? 'translate-x-0' : 'translate-x-full'} transform bg-indigo-100 transition-transform duration-300 ease-out`}
            ></div>
        </aside>
    );
}
