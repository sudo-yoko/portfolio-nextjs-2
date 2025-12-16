//
// BFFのRESULT型 ヘルパー関数
//

//////////////////////////
// 型解析、型ガード関数
//////////////////////////

// export function bffResult<DATA, FIELD extends string>(text: string): BffResult<DATA, FIELD> {
  // try {
    // const result = parseResult(text);
    // return result as BffResult<DATA, FIELD>;
  // } catch (e) {
    // throw parseBffResultError(text, stringify(e).message);
  // }
// }

// function isBffResult<DATA, FIELD extends string>(text: unknown): text is BffResult<DATA, FIELD> {
// if (text === null) {
// return false;
// }
// プリミティブ型の場合
// if (typeof text !== 'object') {
// return false;
// }

// const tag = (text as BffResult<DATA, FIELD>).tag;
// if (tag === Tag.Ok) {
// return true;
// }
// if (tag === 'reject') {
// return true;
// }
// if (tag === Tag.Invalid) {
// return true;
// }
// if (tag === Tag.Aborted) {
// return true;
// }
// return false;
// }

// export function isOk<DATA>(result: BffResult): result is BffResult<DATA, string> {
// return result.tag === Tag.Ok;
// }

// export function isInvalid(result: BffResult): result is Invalid<string> {
// if (result.tag === Tag.Invalid) {
// return true;
// }
// return false;
// }

// export function isAborted(result: BffResult): result is Aborted {
// if (result.tag === Tag.Aborted) {
// return true;
// }
// return false;
// }

// export function isOk<RESULT = void, FIELD extends string = never>(
// result: BffResult<RESULT, FIELD>,
// ): result is Ok<RESULT> {
// return result.tag === 'ok';
// }

// export function isInvalid<RESULT, FIELD extends string>(result: BffResult<RESULT, FIELD>) {
// return result.tag === 'invalid';
// }

// export function isAbort<RESULT = void, FIELD extends string = never>(
// result: BffResult<RESULT, FIELD>,
// ): result is Aborted {
// return result.tag === 'aborted';
// }

// export function isReject<RESULT = void, REASON = never>(
// result: BffResult<RESULT, REASON>,
// ): result is Rejected<REASON> {
// return result.tag === 'reject';
// }

// export function isComplete<RESULT = void, REASON = never>(
// result: BffResult<RESULT, REASON>,
// ): result is Completed<RESULT, REASON> {
// return result.tag === 'ok' || result.tag === 'reject';
// }
