// Graciously taken from https://github.com/sindresorhus/type-fest/tree/main
type ArrayTail<T> = T extends readonly [unknown, ...infer Tail] ? Tail : []

type KeyValuePair<K, V> = [K, V]
type KeyValuePairList<K = any, V = any> = KeyValuePair<K, V>[]

type ExtractKeys<T extends KeyValuePairList> = T[number][0]
type ExtractValues<T extends KeyValuePairList> = T[number][1]

type ExtractValueOfKey<T extends KeyValuePairList, K> = T[0] extends KeyValuePair<K, infer Value>
  ? Value
  : T[0] extends undefined
    ? never
    : ExtractValueOfKey<ArrayTail<T>, K>

export class ConstrainedMap<T extends KeyValuePairList> extends Map<
  ExtractKeys<T>,
  ExtractValues<T>
> {
  constructor(elements?: T)
  constructor(elements?: T[number][])
  constructor(elements?: Iterable<readonly [ExtractKeys<T>, ExtractValues<T>]> | null) {
    super(elements)
  }

  get<K extends ExtractKeys<T>>(key: K): ExtractValueOfKey<T, K> | undefined {
    return super.get(key) as ExtractValueOfKey<T, K> | undefined
  }

  set<K extends ExtractKeys<T>>(key: K, value: ExtractValueOfKey<T, K>): this {
    return super.set(key, value)
  }
}
