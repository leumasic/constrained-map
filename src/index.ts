type KeyValuePair<K, V> = {
  key: K
  value: V
}
type KeyValuePairList<K = any, V = any> = KeyValuePair<K, V>[]

type ExtractKeys<T extends KeyValuePairList> = T[number]['key']
type ExtractValues<T extends KeyValuePairList, K> = T extends KeyValuePairList<
  infer Key,
  infer Value
>
  ? K extends Key
    ? Value
    : never
  : never

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
