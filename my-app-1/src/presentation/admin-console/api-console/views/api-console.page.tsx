import 'server-only';
import ApiList from './api-console.list';
import TargetApi from './api-console.target';
import ApiResult from './api-console.result';

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div className="text-white">APIコンソール</div>
            <div>
                <div className="flex flex-row gap-5">
                    <ApiList />
                    <div className="flex flex-col gap-5">
                        <TargetApi />
                        <ApiResult />
                    </div>
                </div>
            </div>
        </div>
    );
}
