/* eslint-disable @typescript-eslint/no-explicit-any */
import { func, number, array, oneOf, oneOfType, string, object, bool, any, VueTypeValidableDef } from 'vue-types'

export const PropTypes = {
  /**
   * `Boolean` 类型
   */
  get bool() {
    return bool()
  },
  /**
   * `Number` 类型
   */
  get number() {
    return number()
  },
  /**
   * `String` 类型
   */
  get string() {
    return string()
  },
  /**
   * `String` 类型 但是可以置顶为特定类型
   * @example
   * ```
   * PropTypes.stringLiterial<'name'|'age'>()
   * ```
   */
  stringLiterial<T extends string>() {
    return string() as any as VueTypeValidableDef<T>
  },
  /**
   *  `Object` 类型
   */
  object<T extends { [key: string]: any; }>() {
    return object<T>()
  },
  /**
   *  `Function` 类型
   */
  // eslint-disable-next-line no-unused-vars
  func<T extends (...args: any[]) => any>() {
    return func<T>()
  },
  /**
   *  `Function` 类型
   */
  any<T = any>() {
    return any() as any as VueTypeValidableDef<T>
  },
  array,
  oneOf,
  oneOfType,
}
