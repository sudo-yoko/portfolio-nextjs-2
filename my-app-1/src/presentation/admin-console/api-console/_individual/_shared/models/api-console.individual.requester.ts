import 'client-only';

import { FormData } from '@/presentation/_system/validation/validation.types';
import { ApiResult } from '@/presentation/admin-console/api-console/models/api-console.types';

export type SendRequest<FIELD extends string> = {
    (formData: FormData<FIELD>): Promise<ApiResult>;
};
