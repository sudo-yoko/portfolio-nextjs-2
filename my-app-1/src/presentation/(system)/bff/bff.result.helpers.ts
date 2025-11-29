//////////////////////////
// 型解析、型ガード関数
//////////////////////////
import { Aborted, BffResult, Completed, Ok, Rejected } from '@/presentation/(system)/bff/bff.result.types';

export function parseBffResult<RESULT, REASON>(text: string): BffResult<RESULT, REASON> | null {
  try {
    const parsed = JSON.parse(text);
    return isBffResult<RESULT, REASON>(parsed) ? parsed : null;
  } catch (_e) {
    return null;
  }
}

function isBffResult<RESULT, REASON>(text: unknown): text is BffResult<RESULT, REASON> {
  if (text === null) {
    return false;
  }
  // プリミティブ型の場合
  if (typeof text !== 'object') {
    return false;
  }

  const tag = (text as BffResult<RESULT, REASON>).tag;
  if (tag === 'ok') {
    return true;
  }
  if (tag === 'reject') {
    return true;
  }
  if (tag === 'abort') {
    return true;
  }
  return false;
}

export function isOk<RESULT = void, REASON = never>(result: BffResult<RESULT, REASON>): result is Ok<RESULT> {
  return result.tag === 'ok';
}

export function isReject<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Rejected<REASON> {
  return result.tag === 'reject';
}

export function isAbort<RESULT = void, REASON = never>(result: BffResult<RESULT, REASON>): result is Aborted {
  return result.tag === 'abort';
}

export function isComplete<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Completed<RESULT, REASON> {
  return result.tag === 'ok' || result.tag === 'reject';
}
