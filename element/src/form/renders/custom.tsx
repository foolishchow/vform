import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey } from '../types';

//#region custom
/**
 * 自定义渲染item
 */
export interface VCustomItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends Partial<VBaseItem<T, Key>> {
  /**
   * 类型 custom
   */
  /**
   * 自定义渲染
   */
  customRender(data: T): JSX.Element
}
registerRender({
  type: 'Custom',
  render(props, item) {
    // @ts-ignore
    return () => {
      return item.customRender(props.form)
    }
  }
})
//#endregion






