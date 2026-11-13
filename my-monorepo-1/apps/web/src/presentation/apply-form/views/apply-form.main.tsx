export function BusinessTripFormMock() {
    return (
        <div className="mx-auto my-8 max-w-xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <h2 className="mb-6 border-b pb-3 text-2xl font-bold text-gray-800">出張申請フォーム</h2>

            <form className="space-y-6">
                {/* 1. 申請種別 */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">1. 申請種別</label>
                    <select
                        defaultValue="domestic"
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="domestic">国内出張</option>
                        <option value="overseas">海外出張</option>
                    </select>
                </div>

                {/* 2. 出張先・目的地 */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        2. 出張先・目的地 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="例：東京都千代田区 / ニューヨーク"
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* 3. パスポート番号（条件付き表示枠） */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <label className="mb-1 block text-sm font-medium text-blue-900">
                        3. パスポート番号 <span className="text-red-500">*</span>
                        <span className="ml-2 text-xs font-normal text-blue-600">（海外出張時のみ表示）</span>
                    </label>
                    <input
                        type="text"
                        placeholder="例：TK1234567"
                        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* 4 & 5. 移動手段 ＆ レンタカー運転者氏名（条件付き活性化） */}
                <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            4. 主要移動手段
                        </label>
                        <select
                            defaultValue="shinkansen"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="shinkansen">新幹線・電車</option>
                            <option value="flight">飛行機</option>
                            <option value="rental_car">レンタカー</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-400">
                            5. レンタカー運転者氏名
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder="レンタカー選択時のみ有効"
                            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
                        />
                    </div>
                </div>

                {/* 6 & 7. 規定リンク（ハイパーリンク） ＆ 同意チェックボックス */}
                <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm text-gray-700">
                        申請前に必ず{' '}
                        <a
                            href="#"
                            className="rounded px-1 text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            6. 出張旅費規程ガイドライン
                        </a>{' '}
                        をご確認ください。
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="agreePolicy"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="agreePolicy"
                            className="cursor-pointer text-sm font-medium text-gray-800"
                        >
                            7. 上記の規程内容に同意する <span className="text-red-500">*</span>
                        </label>
                    </div>
                </div>

                {/* 送信ボタン */}
                <div className="pt-2">
                    <button
                        type="button"
                        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
                    >
                        申請を提出する
                    </button>
                </div>
            </form>
        </div>
    );
}
