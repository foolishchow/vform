import { ElTransfer } from 'element-plus'
import type { DeepKey, Into, VPropDef, VTransfer, VueProps } from '../types';
import { registerRender } from '../register'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { VBaseItem } from '.';

//#region rate
type TransferProps = VueProps<typeof ElTransfer>
export interface VTransferItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型 rate
   */
  /**
   * `element-plus {@link ElRate}`的属性
   */
  props?: VPropDef<T, TransferProps>
  slots?: {
    /**
     * 自定义数据项的内容， 参数为 { option }
     */
    default?: (param: { option: any }) => (JSX.Element | JSX.Element[] | string)
    /**
     * 左侧列表底部的内容
     */
    "left-footer"?: () => (JSX.Element | JSX.Element[] | string)
    /**
     * 右侧列表底部的内容
     */
    "right-footer"?: () => (JSX.Element | JSX.Element[] | string)
  },
  transfer?: VTransfer<Into<T, Key>, string | number>
}

registerRender({
  type: 'Transfer',
  render(props, item) {
    return <ElTransfer {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any, item?.transfer)}
      v-slots={item.slots ?? {}} />
  }
})
//#endregion





