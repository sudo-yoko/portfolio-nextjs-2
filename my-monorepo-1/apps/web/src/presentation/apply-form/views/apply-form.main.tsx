'use client';

import React, { useReducer } from 'react';

import { FormKeys } from '@/presentation/apply-form/models/apply-form.types';
import {
    Action,
    initialState,
    reducer,
    setValue,
    State,
} from '@/presentation/apply-form/view-actions/apply-form.control-reducer';

/**
 * 申請フォーム コンポーネント
 */
export function ApplyForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="mx-auto my-8 max-w-xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <h2 className="mb-6 border-b pb-3 text-2xl font-bold text-gray-800">出張申請フォーム</h2>

            <form className="space-y-6">
                {/* 1. 申請種別（セレクトボックス：表示切替のトリガー） */}
                {/* tripType */}
                <div>
                    <MyLabel>1. 申請種別</MyLabel>
                    <MySelect
                        dispatch={dispatch}
                        formKey={FormKeys.tripType}
                        state={state}
                        value={state.formData.tripType}
                    >
                        <option value="domestic">国内出張</option>
                        <option value="overseas">海外出張（※パスポート欄が表示されます）</option>
                    </MySelect>
                </div>

                {/* 2. 出張先・目的地（テキストボックス） */}
                {/* destination */}
                <div>
                    <MyLabel>
                        2. 出張先・目的地 <span className="text-red-500">*</span>
                    </MyLabel>
                    <MyInputText
                        dispatch={dispatch}
                        formKey={FormKeys.destination}
                        placeholder="例：ニューヨーク支社"
                        state={state}
                        value={state.formData.destination ?? ''}
                    />
                </div>

                {/* 3. パスポート番号（※選択ボックスの選択値に応じて表示／非表示が切り替わるコントロール） */}
                {/* passportNumber */}
                <InteractiveDiv visible={state.passportNumberVisible}>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <label className="mb-1 block text-sm font-medium text-blue-900">
                            3. パスポート番号 <span className="text-red-500">*</span>
                            <span className="ml-2 text-xs font-normal text-blue-600">
                                （「海外出張」選択時のみ表示）
                            </span>
                        </label>
                        <MyInputText
                            dispatch={dispatch}
                            formKey={FormKeys.passportNumber}
                            placeholder="例：TK1234567"
                            state={state}
                            value={state.formData.passportNumber}
                        />
                        {/* <input
                            type="text"
                            value={state.formData.passportNumber}
                            onChange={(e) => setValue(dispatch, FormKeys.passportNumber, e.target.value)}
                            placeholder="例：TK1234567"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        /> */}
                    </div>
                </InteractiveDiv>

                {/* 4 & 5. 宿泊手配 ＆ 希望宿泊ランク */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    {/* 4. 宿泊手配の有無（選択ボックス：活性切替のトリガー） */}
                    {/* needHotel */}
                    <div>
                        <MyLabel>4. 宿泊手配の希望</MyLabel>
                        <MySelect
                            dispatch={dispatch}
                            formKey={FormKeys.needHotel}
                            state={state}
                            value={state.formData.needHotel}
                        >
                            <option value="none">希望しない</option>
                            <option value="desired">希望する（※ランク選択が有効になります）</option>
                        </MySelect>
                    </div>

                    {/* 5. 希望宿泊ランク（※選択ボックスの選択値に応じて活性／非活性が切り替わるコントロール） */}
                    {/* hotelRank */}
                    <div>
                        <InteractiveLabel disabled={!state.hotelRankEnabled}>
                            5. 希望宿泊ランク{' '}
                            <span className="text-xs">（宿泊手配「希望する」時のみ活性）</span>
                        </InteractiveLabel>

                        <InteractiveSelect
                            disabled={!state.hotelRankEnabled}
                            state={state}
                            formKey={FormKeys.hotelRank}
                            value={state.formData.hotelRank}
                            dispatch={dispatch}
                        >
                            <option value=""></option>
                            <option value="standard">スタンダード (ビジネスホテル)</option>
                            <option value="deluxe">デラックス (駅近・広め)</option>
                        </InteractiveSelect>
                    </div>
                </div>

                {/* 6 & 7. 特記事項の入力連動エリア */}
                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    {/* 6. 特記事項の有無（テキストボックス：活性切替のトリガー） */}
                    {/* specialNote */}
                    <div>
                        <MyLabel>6. 特記事項の有無（理由を入力すると詳細欄が活性化します）</MyLabel>
                        <MyInputText
                            dispatch={dispatch}
                            formKey={FormKeys.specialNote}
                            placeholder="例：特になし / 機材搬入のため"
                            state={state}
                            value={state.formData.specialNote}
                        />
                    </div>

                    {/* 7. 特記事項詳細（※テキストボックスの入力内容に応じて活性／非活性が切り替わるコントロール） */}
                    {/* noteDetail */}
                    <div>
                        <InteractiveLabel disabled={!state.noteDetailEnabled}>
                            7. 特記事項詳細{' '}
                            <span className="text-xs">（上記に文字入力がある場合のみ有効）</span>
                        </InteractiveLabel>
                        <InteractiveInputText
                            disabled={!state.noteDetailEnabled}
                            dispatch={dispatch}
                            formKey={FormKeys.noteDetail}
                            state={state}
                            value={state.formData.noteDetail ?? ''}
                            placeholder="詳細な理由を入力してください"
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
                        value={state.formData.isAgreed}
                        onChange={(e) => setValue(dispatch, FormKeys.isAgreed, e.target.checked ? '1' : '0')}
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
                    <InteractiveButton
                        disabled={!state.applyButtonEnabled}
                        buttonText="10. 申請を提出する"
                    ></InteractiveButton>
                </div>
            </form>
        </div>
    );
}

/**
 * 表示／非表示を指定可能なdiv
 */
function InteractiveDiv(props: { visible: boolean; children: React.ReactNode }) {
    return props.visible && <div>{props.children}</div>;
}

/**
 * ラベル
 */
function MyLabel(props: { children: React.ReactNode }) {
    return <InteractiveLabel disabled={false}>{props.children}</InteractiveLabel>;
}

/**
 * 活性／非活を指定可能なラベル
 */
function InteractiveLabel(props: { disabled: boolean; children: React.ReactNode }) {
    return props.disabled ? (
        <label className="mb-1 block text-sm font-medium text-gray-400">{props.children}</label>
    ) : (
        <label className="mb-1 block text-sm font-medium text-gray-700">{props.children}</label>
    );
}

/**
 * 選択ボックス
 */
function MySelect(props: {
    state: State;
    formKey: FormKeys;
    value: string;
    dispatch: React.ActionDispatch<[action: Action]>;
    children: React.ReactNode;
}) {
    return (
        <InteractiveSelect
            disabled={false}
            state={props.state}
            dispatch={props.dispatch}
            formKey={props.formKey}
            value={props.value}
        >
            {props.children}
        </InteractiveSelect>
    );
}

/**
 * 活性／非活を指定可能な選択ボックス
 */
function InteractiveSelect(props: {
    disabled: boolean;
    state: State;
    formKey: FormKeys;
    value: string;
    dispatch: React.ActionDispatch<[action: Action]>;
    children: React.ReactNode;
}) {
    const commonProps = {
        value: props.value,
    };
    return props.disabled ? (
        <select
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            {props.children}
        </select>
    ) : (
        <select
            {...commonProps}
            onChange={(e) => setValue(props.dispatch, props.formKey, e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            // className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            {props.children}
        </select>
    );
}

function MyInputText(props: {
    state: State;
    formKey: FormKeys;
    value: string;
    placeholder: string;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    return (
        <InteractiveInputText
            disabled={false}
            dispatch={props.dispatch}
            formKey={props.formKey}
            placeholder={props.placeholder}
            state={props.state}
            value={props.value}
        ></InteractiveInputText>
    );
}

/**
 * 活性／非活を指定可能なテキストボックス
 */
function InteractiveInputText(props: {
    disabled: boolean;
    state: State;
    formKey: FormKeys;
    value: string;
    placeholder: string;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    const commonProps = {
        type: 'text' as const,
        value: props.value,
        placeholder: props.placeholder,
    };
    return props.disabled ? (
        <input
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-400"
        />
    ) : (
        <input
            {...commonProps}
            onChange={(e) => setValue(props.dispatch, props.formKey, e.target.value)}
            // className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-700"
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    );
}

/**
 * 活性／非活を指定可能なボタン
 */
function InteractiveButton(props: { disabled: boolean; buttonText: string }) {
    const commonProps = {
        type: 'button' as const,
    };
    return props.disabled ? (
        <button
            {...commonProps}
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-gray-400"
        >
            {props.buttonText}
        </button>
    ) : (
        <button
            {...commonProps}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700"
        >
            {props.buttonText}
        </button>
    );
}
