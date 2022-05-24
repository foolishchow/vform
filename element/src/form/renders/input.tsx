import { ElInput } from 'element-plus'
import type { DeepKey, VPropDef, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

export type InputProps = VueProps<typeof ElInput> & { rows?: number }

// #region input
export interface VInputItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 input
   */
  // type: 'input'
  /**
   * `ant-design-vue Input`的属性
   */
  props?: VPropDef<T, InputProps>
  slots?: {
    prefix?: JSX.Element | { (): JSX.Element }
    suffix?: JSX.Element | { (): JSX.Element }
    prepend?: JSX.Element | { (): JSX.Element | string }
    append?: JSX.Element | { (): JSX.Element | string }
  }
}
registerRender({
  type: 'Input',
  render(props, item) {
    return () => {
      // @ts-ignore
      return <ElInput {...mergeProps(props.form, item.props)}
        modelValue={getWithTransfer(props.form, item.dataIndex)}
        onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any)}
        v-slots={item.slots}
      />
    }
  }
})
// #endregion







