'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { requestAddress } from '@/presentation/backend-lib/zipcloud/zipcloud.client';
import { isError, isOk } from '@/presentation/backend-lib/zipcloud/zipcloud.helper';
import { ZipCloudRequest, ZipCloudResult } from '@/presentation/backend-lib/zipcloud/zipcloud.types';
import { FormKeys } from '@/presentation/zip-search/models/zip-search.types';
import AddressList from '@/presentation/zip-search/views/zip-search.list';

export function Main() {
    const [formData, setFormData] = useState<FormData<FormKeys>>({ zipcode: '' });
    const [addresses, setAddresses] = useState<ZipCloudResult[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        void _();
        async function _() {
            if (formData.zipcode.length === 7) {
                const req: ZipCloudRequest = { zipcode: formData.zipcode };
                const result = await requestAddress(req);
                if (isOk(result)) {
                    if (result.results.length === 0) {
                        setMessage('該当なし');
                    } else {
                        setAddresses(result.results);
                    }
                }
                if (isError(result)) {
                    setMessage(result.message);
                }
            }
        }
    }, [formData.zipcode]);

    return (
        <div>
            <div className="flex flex-col gap-10">
                <div>
                    <div>郵便番号を入力してください</div>
                    <div className="flex flex-row items-center gap-1">
                        <input
                            type="text"
                            value={formData.zipcode}
                            onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                            className="w-40 border-2 border-gray-400 text-center"
                        />
                        <Button>検索</Button>
                        <Button>リセット</Button>
                    </div>
                </div>
                {message && <div className="text-red-500">{message}</div>}
                <div>
                    {formData.zipcode}
                    <AddressList addresses={addresses} />
                </div>
            </div>
        </div>
    );
}
