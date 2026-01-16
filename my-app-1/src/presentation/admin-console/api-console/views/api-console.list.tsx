'use client';

import { ItemListButton } from '@/presentation/admin-console/(shared)/views/admin-console.buttons';
import { apiList } from '@/presentation/admin-console/api-console/models/api-console.data';

export default function ApiList({ className }: { className: string }) {
    return (
        <div className={className}>
            <div className="flex h-full flex-col space-y-4">
                <div className="px-2">
                    <h2 className="text-xs font-bold tracking-widest text-indigo-300/40 uppercase">
                        Endpoints
                    </h2>
                </div>

                {/* 3. 一覧を表示するコンテナ */}
                <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
                    <div className="flex flex-col gap-2">
                        {apiList.map((item) => {
                            return <ItemListButton key={item.id} item={item} isSelected={item.id === '1'} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
