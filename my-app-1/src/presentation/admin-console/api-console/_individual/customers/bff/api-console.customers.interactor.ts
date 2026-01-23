import 'server-only';

import logger from '@/presentation/_system/logging/logging.core.winston';
import { invalid, okData } from '@/presentation/_system/result/result.core.factories';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { send } from '@/presentation/admin-console/api-console/_individual/customers/bff/api-console.customers.client';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import { validate } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.validator';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

const logPrefix = 'api-console.customers.interactor.ts: ';

export async function execute(formData: FormData<FormKeys>): Promise<ApiResult<FormKeys>> {
    logger.info(logPrefix + `formdata=${JSON.stringify(formData)}`);

    const violations = validate(formData);
    if (hasError(violations)) {
        return invalid(violations);
    }
    const result = await send(formData);
    return okData(result);
}
