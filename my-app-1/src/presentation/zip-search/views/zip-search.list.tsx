'use client';

import { ZipCloudResult } from '@/presentation/backend-lib/zipcloud/zipcloud.types';

export default function AddressList({ addresses }: { addresses: ZipCloudResult[] }) {
    return (
        <div>
            {addresses.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th className="border border-gray-300">郵便番号</th>
                            <th className="border border-gray-300">住所</th>
                            <th className="border border-gray-300">住所カナ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addresses.map((address, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300">{address.zipcode}</td>
                                <td className="border border-gray-300">
                                    {address.address1 + address.address2 + address.address3}
                                </td>
                                <td className="border border-gray-300">
                                    {address.kana1 + address.kana2 + address.kana3}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
