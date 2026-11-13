export function BusinessTripFormMock() {
    return (
        <div className="mx-auto my-8 max-w-xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <h2 className="mb-6 border-b pb-3 text-2xl font-bold text-gray-800">出張申請フォーム</h2>

            <form className="space-y-6">
                {/* 1. 申請種別（セレクトボックス：表示切替のトリガー） */}
                {/* tripType */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">1. 申請種別</label>
                    <select
                        defaultValue="overseas"
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="domestic">国内出張</option>
                        <option value="overseas">海外出張（※パスポート欄が表示されます）</option>
                    </select>
                </div>

                {/* 2. 出張先・目的地（テキストボックス） */}
                {/* destination */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        2. 出張先・目的地 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="例：ニューヨーク支社"
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* 3. パスポート番号（※選択ボックスの選択値に応じて表示／非表示が切り替わるコントロール） */}
                {/* passportNumber */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <label className="mb-1 block text-sm font-medium text-blue-900">
                        3. パスポート番号 <span className="text-red-500">*</span>
                        <span className="ml-2 text-xs font-normal text-blue-600">
                            （「海外出張」選択時のみ表示）
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="例：TK1234567"
                        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* 4 & 5. 宿泊手配 ＆ 希望宿泊ランク */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    {/* 4. 宿泊手配の有無（選択ボックス：活性切替のトリガー） */}
                    {/* needHotel */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            4. 宿泊手配の希望
                        </label>
                        <select
                            defaultValue="none"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="none">希望しない</option>
                            <option value="desired">希望する（※ランク選択が有効になります）</option>
                        </select>
                    </div>

                    {/* 5. 希望宿泊ランク（※選択ボックスの選択値に応じて活性／非活性が切り替わるコントロール） */}
                    {/* hotelRank */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-400">
                            5. 希望宿泊ランク{' '}
                            <span className="text-xs text-gray-400">（宿泊手配「希望する」時のみ活性）</span>
                        </label>
                        <select
                            disabled
                            defaultValue="standard"
                            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
                        >
                            <option value="standard">スタンダード (ビジネスホテル)</option>
                            <option value="deluxe">デラックス (駅近・広め)</option>
                        </select>
                    </div>
                </div>

                {/* 6 & 7. 特記事項の入力連動エリア */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    {/* 6. 特記事項の有無（テキストボックス：活性切替のトリガー） */}
                    {/* specialNote */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            6. 特記事項の有無（理由を入力すると詳細欄が活性化します）
                        </label>
                        <input
                            type="text"
                            placeholder="例：特になし / 機材搬入のため"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* 7. 特記事項詳細（※テキストボックスの入力内容に応じて活性／非活性が切り替わるコントロール） */}
                    {/* noteDetail */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-400">
                            7. 特記事項詳細{' '}
                            <span className="text-xs text-gray-400">
                                （上記に文字入力がある場合のみ有効）
                            </span>
                        </label>
                        <input
                            type="text"
                            disabled
                            placeholder="詳細な理由を入力してください"
                            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
                        />
                    </div>
                </div>

                {/* 8. 規程リンク（※ハイパーリンク） */}
                {/*  */}
                <div className="py-2 text-sm text-gray-700">
                    申請前に必ず{' '}
                    <a
                        href="#"
                        className="rounded px-1 font-medium text-blue-600 underline hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        8. 出張旅費規程ガイドライン
                    </a>{' '}
                    をご確認ください。
                </div>

                {/* 9. 同意チェックボックス */}
                {/* isAgreed */}
                <div className="flex items-center space-x-3 pt-2">
                    <input
                        type="checkbox"
                        id="agreePolicy"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="agreePolicy" className="cursor-pointer text-sm font-medium text-gray-800">
                        9. 上記の規程内容および注意事項に同意する <span className="text-red-500">*</span>
                    </label>
                </div>

                {/* 10. 送信ボタン */}
                {/* applyButton */}
                <div className="pt-4">
                    <button
                        type="button"
                        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
                    >
                        10. 申請を提出する
                    </button>
                </div>
            </form>
        </div>
    );
}
