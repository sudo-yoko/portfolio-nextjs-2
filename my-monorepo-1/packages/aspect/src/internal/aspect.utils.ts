import { Aspect, AspectAsync } from '#aspect/internal/aspect.types'

/**
 * 引数に渡された各アスペクトを連結して実行する
 *
 * @param subject -
 * @param aspects - 共通処理（アスペクト）の配列。配列の左から順にsubjectをラップして実行する
 * @returns
 */
export function chainAspects<T>(subject: () => T, aspects: Aspect[]) {
    const chained = aspects.reduce((acc, aspect) => aspect(acc), subject);
    return chained();
}

export async function chainAspectsAsync<T>(subject: () => Promise<T>, aspects: AspectAsync[]) {
    const chained = aspects.reduce((acc, aspect) => aspect(acc), subject);
    return await chained();
}
