'use client';

import { Fade } from '@/presentation/(system)/components/fade';
import { AdminConsoleHeader } from '@/presentation/admin-console/(shared)/views/admin-console.header';
import { InputFormFactory } from '@/presentation/admin-console/api-console/models/api-console.types';
import { useApiConsole } from '@/presentation/admin-console/api-console/view-models/api-console.reducer.hooks';
import InputPanel from '@/presentation/admin-console/api-console/views/api-console.input';
import ListPanel from '@/presentation/admin-console/api-console/views/api-console.list';
import ApiResult from '@/presentation/admin-console/api-console/views/api-console.result';

/**
 * APIコンソール
 */
export default function Console() {
    const { state, dispatch } = useApiConsole();

    return (
        <Fade
            open={true}
            onExit={() => {
                return;
            }}
        >
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
                                    <InputPanel state={state} dispatch={dispatch}>
                                        {state.selectedItem && (
                                            <InputForm
                                                inputFormFactory={state.selectedItem?.inputFormFactory}
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

function InputForm({ inputFormFactory }: { inputFormFactory: InputFormFactory }) {
    // コンポーネントを生成
    return inputFormFactory();
}
