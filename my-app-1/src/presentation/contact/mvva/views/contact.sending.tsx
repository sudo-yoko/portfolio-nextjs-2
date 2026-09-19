'use client';

import { Processing } from '@/presentation/_system/components/processing';

/**
 * 送信中表示コンポーネント
 */
export default function Sending() {
    // useEffect(() => {
    //     // 書き方その１
    //     void (async () => {
    //         await submit(state, dispatch, () => failed(dispatch));
    //     })();

    //     // 書き方その２
    //     // async function process() {
    //     // await send(state, dispatch, setError);
    //     // }
    //     // void process();

    //     // 書き方その３
    //     // void send(state, dispatch, setError).then(() => {});
    // }, [dispatch, state, state.formData]);

    return <Processing>送信中です。お待ちください・・・</Processing>;
}
