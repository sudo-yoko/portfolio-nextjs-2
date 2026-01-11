'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import {
    Action,
    popoverClose,
    State,
    Step,
} from '@/presentation/(system)/menu/mvvm/view-models/menu.reducer';
import {
    handlePopover,
    handleSidePeek,
    useMenu,
} from '@/presentation/(system)/menu/mvvm/view-models/menu.reducer.hooks';
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

export default function Menu() {
    const { state, dispatch } = useMenu();

    return (
        <div>
            {/* サイドピーク */}
            <SidePeek state={state} />
            {/* ヘッダー */}
            <Header state={state} dispatch={dispatch} />
        </div>
    );
}

/**
 * サイドピーク
 */
function SidePeek({ state }: { state: State }) {
    return (
        <aside
            className={`fixed top-0 right-0 z-10 h-full w-80 ${state.isSidePeek ? 'translate-x-0' : 'translate-x-full'} transform bg-indigo-100 transition-transform duration-300 ease-out`}
        >
            <div className="mx-3 mt-15">
                <div className="h-8">あなたのプロフィール</div>
                <div className="flex h-8 items-center gap-2">
                    <BuildingOfficeIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.menuInfo.profile.orgName}</div>}
                </div>
                <div className="flex h-8 items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.menuInfo.profile.userName}</div>}
                </div>
                <div className="flex h-8 items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5" />
                    {state.step === Step.Processing && <SkeletonText />}
                    {state.step === Step.Idle && <div>{state.menuInfo.profile.mailAddress}</div>}
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
 * ヘッダー
 */
function Header({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    return (
        <header className="fixed top-0 right-0 z-30 flex h-10 w-full bg-indigo-200">
            <div className="mx-5 flex h-full w-full flex-row items-center">
                <div className="basis-1/2"></div>
                <div className="flex basis-1/2 items-center justify-end gap-4">
                    {/* ======== */}
                    <div className="relative">
                        <Squares2X2Icon
                            onClick={() => handlePopover(state, dispatch)}
                            className="h-7 w-7 cursor-pointer active:scale-90"
                        />
                        <div className="absolute top-12 right-0">
                            {/* ポップオーバー */}
                            <Popover state={state} dispatch={dispatch} />
                        </div>
                    </div>
                    {/* ======== */}
                    <UserCircleIcon
                        onClick={() => handleSidePeek(state, dispatch)}
                        className="h-7 w-7 cursor-pointer active:scale-90"
                    />
                </div>
            </div>
        </header>
    );
}

/**
 * 機能メニューポップオーバー
 */
function Popover({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
    return (
        <Fade open={state.isPopover} onExit={() => popoverClose(dispatch)}>
            <div className={`z-20 h-30 w-100 rounded-xl bg-amber-100 shadow-xl`}>
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
    );
}
