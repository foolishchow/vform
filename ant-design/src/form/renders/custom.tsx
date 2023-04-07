import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, FormRenderExtra } from '../types';

/**
 * 类型 custom
 */
export interface VCustomItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> extends Partial<VBaseItem<T, Key>> {
  /**
   * 自定义渲染
   * @param data
   */
  customRender(data: T, extra?: FormRenderExtra): JSX.Element
}
registerRender({
  type: 'Custom',
  render(props, item, extra) {
    // @ts-ignore
    return item.customRender(props.form, extra)
  }
})