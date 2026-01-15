'use client';

import { Button } from "@/presentation/(system)/components/button.decorator.simple";

export default function TargetApi({ className }: { className: string }) {
    return (
        <div className={className}>
            <div>選択されたAPI</div>
            <Button>実行する</Button>
        </div>
    );
}
