import { ElInputNumber } from 'element-plus'
import { DeepKey, InstanceOf, Into, VPropDef, VTransfer, VueProps } from '../types';
import type { VBaseItem } from '.';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'



// #region input-number
type InputNumberProps = VueProps<typeof ElInputNumber>
export interface VInputNumberItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 input-number
   */
  /**
   * `element-plus InputNumber`的属性
   */
  props?: VPropDef<T, InputNumberProps>
}

registerRender({
  type: 'InputNumber',
  render(props, item) {
    // @ts-ignore
    return <ElInputNumber {...mergeProps(props.form, item.props)}
      // v-model:value={props.form[item.dataIndex as any]}
      modelValue={getWithTransfer(props.form, item.dataIndex)}
      // @ts-ignore
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e)}
    // v-model:value={props.form[item.dataIndex]}
    />
  }
})
// #endregion





