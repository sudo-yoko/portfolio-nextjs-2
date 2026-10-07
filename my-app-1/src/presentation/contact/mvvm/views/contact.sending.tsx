import { Processing } from '@/presentation/_system/components/processing';

/** 送信処理は ViewModel が開始する。このコンポーネントは表示のみ。 */
export default function Sending() {
    return <Processing>送信中です。お待ちください・・・</Processing>;
}
