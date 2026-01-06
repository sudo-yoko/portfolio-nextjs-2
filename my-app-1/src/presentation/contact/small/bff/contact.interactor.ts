//
// お問い合わせの送信 バックエンド呼び出しのユースケース
//
import 'server-only';

import logger from '@/presentation/(system)/logging/logger.s';
import { invalid, okEmpty } from '@/presentation/(system)/result/result.core.factories';
import { hasError } from '@/presentation/(system)/validation/validation.helpers';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/contact/small/bff/contact.webToCase-client';
import { ContactResult, FormKeys } from '@/presentation/contact/small/models/contact.types';
import { validate } from '@/presentation/contact/small/models/contact.validator';

const logPrefix = 'contact.interactor.ts: ';

/**
 * バックエンド呼び出しユースケースの実行
 */
export async function execute(formData: FormData<FormKeys>): Promise<ContactResult<FormKeys>> {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    //
    // バリデーション
    //
    const violations = validate(formData);
    if (hasError(violations)) {
        logger.info(logPrefix + `validation error. ${JSON.stringify(violations)}`);
        //return reject(REJECTION_LABELS.VIOLATION, violations);
        return invalid(violations);
    }
    // 不正なRESULTを返すコード
    // return {
    // tag: Tag.Invalid,
    // violations: [],
    // };
    //
    // 送信
    //
    await send({ ...formData });
    return okEmpty();
}
