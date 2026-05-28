import 'client-only';

import { State } from '@/presentation/_system/pagination/standard/hooks/pagination.reducer';
import { getInitialState } from '@/presentation/_system/pagination/standard/models/pagination.helpers';
import { initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { FormKeys, User } from '@/presentation/users/standard/models/users.types';

export const initialPage = 1;
export const perPage = 4;

/**
 * 状態管理の初期値
 */
// NOTE: constで定義すれば、useReducerでコンポーネントが再レンダーされるたびに再計算されないので、無駄な再計算を減らせる
export const initialState: State<User[], FormKeys> = (() => {
    const initial = initialFormDataCore(FormKeys); // TODO: Coreの名前再検討
    return getInitialState(initial, []);
})();
