import { Button } from '@/presentation/_system/components/button.decorator.simple';
import Header from '@/presentation/_system/header/mvvm/views/header';
import { Bars3Icon } from '@heroicons/react/16/solid';

export default function Page() {
    return (
        <div>
            <Header />
            <div className="h-full bg-white">
                <div className="h-10"></div>
                <div className="flex items-center">
                    右上のハンバーガーメニューボタン[
                    <Bars3Icon className="h-4 w-4" />
                    ]を押してください。
                </div>
                <div className="flex items-center gap-1">
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                    <Button>aaaaa</Button>
                </div>
            </div>
        </div>
    );
}
