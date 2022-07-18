import { get, set } from 'lodash-es'
import { ComputedGetter, Ref, ref, watchEffect } from 'vue'
import { getType } from './register'
import type { DeepKey, DynamicDef, Into, VPropDef, VTransfer, _DynamicDef } from './types'

export function mergeProps<FormData, Props>(data: FormData, props?: VPropDef<FormData, Props>): Partial<Props> {
  if (!props) return {}
  if (typeof props == 'function') {
    return props(data)
  }
  return props
}

export function wrapDynamic<T, Option>(def: { type: string, config: DynamicDef<T, Option> }) {
  const config = def.config
  if (isDynamic(config)) {
    return (relay: T) => {
      return {
        ...(config(relay)),
        type: getType(def.type)
      }
    }
  }
  return {
    ...config,
    type: getType(def.type)
  }
}
export function isDynamic<T, Option>(def: DynamicDef<T, Option>): def is _DynamicDef<T, Option> {
  return typeof def == 'function'
}
export function getDynamic<T, Option>(form: T, def?: DynamicDef<T, Option> | undefined): Option | undefined {
  if (!def) return undefined
  if (isDynamic(def)) {
    return def(form)
  }
  return def
}

export function getDataIndex(dataIndex?: string, dataIndexPreffix?: (string | number)[]) {
  if (!dataIndex || dataIndex.length == 0) {
    return undefined
  }
  const list = dataIndex.split('.')
  if (dataIndexPreffix) {
    return [...dataIndexPreffix, ...list]
  }
  return list
}


export function getWithTransfer<T extends object, Key extends DeepKey<T>>(
  data: T, key: Key, transfer?: VTransfer<any, any>
): any {
  const val = dotGet(data, key)
  if (transfer?.get) {
    return transfer?.get(val)
  }
  return val
}

export function setWithTransfer<T extends object, Key extends DeepKey<T>>(
  data: T, key: Key, value: Into<T, Key>,
  transfer?: VTransfer<any, any>
) {
  const val = transfer?.set ? transfer.set(value) : value
  dotSet(data, key, val)
}
export function dotGet<T extends object, Key extends DeepKey<T>>(data: T, key: Key): Into<T, Key> {
  return get(data, key)
}
export function dotSet<T extends object, Key extends DeepKey<T>>(data: T, key: Key, value: Into<T, Key>) {
  set(data, key, value)
}

export function lazyComputed<T>(getter: ComputedGetter<T>): Readonly<Ref<T>> {
  const computed = ref<T>()
  watchEffect(() => {
    computed.value = getter()
  })
  // @ts-ignore
  return computed
}
