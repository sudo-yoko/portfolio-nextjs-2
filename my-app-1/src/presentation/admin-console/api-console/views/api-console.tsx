'use client';

import { Fade } from '@/presentation/_system/components/fade';
import { ProcessingModalB } from '@/presentation/_system/components/processing.modal.b';
import { AdminConsoleHeader } from '@/presentation/admin-console/_shared/views/admin-console.header';
import { IndividualFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';
import {
    Action,
    State,
    Step,
} from '@/presentation/admin-console/api-console/view-models/api-console.reducer';
import { useConsole } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import InputPanel from '@/presentation/admin-console/api-console/views/api-console.input';
import ListPanel from '@/presentation/admin-console/api-console/views/api-console.list';
import ApiResult from '@/presentation/admin-console/api-console/views/api-console.result';

/**
 * APIコンソール
 */
export default function Console() {
    const { state, dispatch } = useConsole();

    return (
        <Fade
            open={true}
            onExit={() => {
                return;
            }}
        >
            {state.step === Step.Processing && <ProcessingModalB />}
            <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                    <div className="flex flex-col gap-5">
                        <AdminConsoleHeader />
                        <div className="flex flex-row gap-5">
                            <div className="w-1/3">
                                <ListPanel state={state} dispatch={dispatch} />
                            </div>
                            <div className="flex w-2/3 flex-col gap-5">
                                <div className="flex-1">
                                    <InputPanel state={state}>
                                        {state.selectedItem && (
                                            <IndividualForm
                                                state={state}
                                                dispatch={dispatch}
                                                individualFormFactory={
                                                    state.selectedItem.individualFormFactory
                                                }
                                            />
                                        )}
                                    </InputPanel>
                                </div>
                                <div className="flex-1">
                                    <ApiResult />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

function IndividualForm({
    state,
    dispatch,
    individualFormFactory,
}: {
    state: State;
    dispatch: React.Dispatch<Action>;
    individualFormFactory: IndividualFormFactory;
}) {
    // コンポーネントを生成
    const individualForm = individualFormFactory(state, dispatch);
    return individualForm;
}
