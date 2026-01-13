'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { Fade } from '@/presentation/(system)/components/fade';
import {
    Action,
    processStart,
    State,
    Step,
} from '@/presentation/(system)/header/mvvm/view-models/header.reducer';
import {
    handlePopover,
    handleSidePeek,
    useHeader,
} from '@/presentation/(system)/header/mvvm/view-models/header.reducer.hooks';
import {
    BellAlertIcon,
    BuildingOfficeIcon,
    EnvelopeIcon,
    Squares2X2Icon,
    UserCircleIcon,
    UserGroupIcon,
    UserIcon,
    WrenchIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Header() {
    const { state, dispatch } = useHeader();

    return (
        <div>
            {/* サイドピーク */}
            <SidePeek state={state} dispatch={dispatch} />
            {/* ヘッダー */}
            <header className="fixed top-0 right-0 z-10 flex h-10 w-full bg-indigo-200">
                <div className="mx-5 flex h-full w-full flex-row items-center">
                    <div className="basis-1/2"></div>
                    <div className="flex basis-1/2 items-center justify-end gap-4">
                        {/* ======== */}
                        <div className="relative">
                            <Squares2X2Icon
                                onClick={() => handlePopover(state, dispatch)}
                                className="h-7 w-7 cursor-pointer active:scale-90"
                            />
                            {/* ポップオーバー */}
                            <Popover state={state} className="absolute top-12 right-0" />
                        </div>
                        {/* ======== */}
                        <UserCircleIcon
                            onClick={() => handleSidePeek(state, dispatch)}
                            className="h-7 w-7 cursor-pointer active:scale-90"
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

/**
 * サイドピーク
 */
function SidePeek({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    return (
        <aside
            className={`fixed top-0 right-0 z-10 h-full w-80 ${state.isSidePeek ? 'translate-x-0' : 'translate-x-full'} transform bg-indigo-100 transition-transform duration-300 ease-out`}
        >
            <div className="mx-3 mt-15">
                <div className="h-8">あなたのプロフィール</div>
                <div className="flex h-8 items-center gap-2">
                    <BuildingOfficeIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.header.profile.orgName}</div>}
                </div>
                <div className="flex h-8 items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.header.profile.userName}</div>}
                </div>
                <div className="flex h-8 items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.header.profile.mailAddress}</div>}
                </div>
                <div className="flex h-8 items-center">
                    <Button onClick={() => processStart(dispatch)}>リロード</Button>
                </div>
            </div>
        </aside>
    );
}

function SkeletonText() {
    return (
        <div className="animate-pulse">
            <div className="h-4 w-50 rounded bg-indigo-200"></div>
        </div>
    );
}

/**
 * 機能メニューポップオーバー
 */
function Popover({ state, className }: { state: State; className: string }) {
    // 注１：透明なレイヤーが残って背面のボタンなどが押せなくなる。
    // 注２：state.isPopover && <Popover> のように書くと、終了アニメーションが終わる前にコンポーネントがアンマウントされてしまう。
    // 注３：フェードアウトのアニメーションが終わってからコンポーネントをDOMから削除すること。

    // このコンポーネントがDOMに存在するかどうかを管理するstate。
    const [render, setRender] = useState(false);

    if (state.isPopover && !render) {
        setRender(true);
    }

    // コンポーネントをレンダリングしない
    if (!render) return null;

    // コンポーネントをレンダリング
    return (
        <div className={className}>
            <Fade open={state.isPopover} onExit={() => setRender(false)}>
                <div className={`h-30 w-100 rounded-xl bg-amber-100 shadow-xl`}>
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
            </Fade>
        </div>
    );
}
