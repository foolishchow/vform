import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey } from '../types';

/**
 * 类型 custom
 */
export interface VCustomItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends Partial<VBaseItem<T, Key>> {
  /**
   * 自定义渲染
   * @param data
   */
  customRender(data: T): JSX.Element
}
registerRender({
  type: 'Custom',
  render(props, item) {
    // @ts-ignore
    return item.customRender(props.form)
  }
})