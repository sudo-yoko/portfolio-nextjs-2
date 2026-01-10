import Menu from '@/presentation/menu/mvvm/views/menu';
import { Bars3Icon } from '@heroicons/react/16/solid';

export default function Page() {
    return (
        <div>
            <Menu />
            <div className="h-full bg-white">
                <div className="h-10"></div>
                <div className="flex items-center">
                    右上のハンバーガーメニューボタン[
                    <Bars3Icon className="h-4 w-4" />
                    ]を押してください。
                </div>
            </div>
        </div>
    );
}
