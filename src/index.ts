// Graciously taken from https://github.com/sindresorhus/type-fest/tree/main
type ArrayTail<T> = T extends readonly [unknown, ...infer Tail] ? Tail : [];

export type KeyValuePair<K, V> = {
  key: K
  value: V
}
type KeyValuePairList<K = any, V = any> = KeyValuePair<K, V>[]

type ExtractKeys<T extends KeyValuePairList> = T[number]['key']
type ExtractValues<T extends KeyValuePairList, K> = T[0] extends KeyValuePair<K, infer Value> ? Value : T[0] extends undefined ? never : ExtractValues<ArrayTail<T>, K>

export class ConstrainedMap<T extends KeyValuePairList> extends Map<
  ExtractKeys<T>,
  ExtractValues<T, ExtractKeys<T>>
> {
  get<K extends ExtractKeys<T>>(key: K): ExtractValues<T, K> | undefined {
    return super.get(key) as ExtractValues<T, K> | undefined
  }

  set<K extends ExtractKeys<T>>(key: K, value: ExtractValues<T, K>): this {
    return super.set(key, value)
  }
}
