import { ElCol } from 'element-plus';
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey } from '../types';

export interface VColumnItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends Partial<VBaseItem<T, Key>> {
  /**
   * 类型 input
   */
}

registerRender({
  type: 'Column',
  labelRender(props, item, itemSpan, itemIndex) {
    return <ElCol span={itemSpan * (item.colSpan ?? 1)}></ElCol>
  }
})