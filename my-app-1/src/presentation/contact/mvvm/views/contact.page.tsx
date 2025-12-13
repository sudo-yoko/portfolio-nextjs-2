//
// お問い合わせフォーム ページ
//
import 'server-only';

import { withInterceptionAsync } from '@/presentation/(system)/interceptor/interceptor.server';
import { SearchParams } from '@/presentation/(system)/types/search-params';
import { handleRequest } from '@/presentation/contact/mvvm/view-models/contact.handler.request';
import Steps from '@/presentation/contact/mvvm/views/contact.component.steps';

export default async function Page(props: { searchParams?: SearchParams }) {
  return await withInterceptionAsync(() => func());

  async function func() {
    const _result = handleRequest(props);
    return (
      <>
        <div>
          <Steps />
        </div>
      </>
    );
  }
}
