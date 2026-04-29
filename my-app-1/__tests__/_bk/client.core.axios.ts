import axios from 'axios';

import * as adapter from '@/presentation/_system/client/internal/client.adapter.axios';
import { Client, ValidateStatus } from '@/presentation/_system/client/client.types';
import { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * Axios インスタンス
 */
// NOTE: axiosインスタンスを直接exportしてしまうと、グローバルにimportされ、書き換えできてしまうため
// axiosClient関数にラップして関数をexportする
const axiosInstance = axios.create({ timeout: 10000 });

/**
 * Axios の Client オブジェクトを作成する
 */
// export const createAxiosClient = (logger: Logger, defaultValidateStatus: ValidateStatus): Client => {
//     return adapter.createAxiosClient(axiosInstance, logger, defaultValidateStatus);
// };
