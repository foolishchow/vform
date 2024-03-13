import { ElSelectV2 } from 'element-plus'
import type { VBaseItem } from '.';
import { registerRender } from '../register'
import type { DeepKey, VPropDef, VueProps } from '../types'
import { dotGet, mergeProps, getWithTransfer, setWithTransfer } from '../utils'


/**
 *  select props
 */
type VSelectV2Props = VueProps<typeof ElSelectV2>
/**
 *  select
 */
export interface VSelectV2Item<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * props
   */
  props?: VPropDef<T, VSelectV2Props>

  slots?: {
    /**
     * slot for render option
     * 自定义 Option 模板
     */
    default?: (option: any, index: number) => JSX.Element | JSX.Element[] | string

    prefix?: () => JSX.Element | JSX.Element[] | string

    empty?: () => JSX.Element | JSX.Element[] | string
  }
}


registerRender({
  type: 'SelectV2',
  render: (props, item) => {
    return <ElSelectV2
      {...mergeProps(props.form, item.props) as any}
      modelValue={getWithTransfer(props.form, item.dataIndex)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any)}
      v-slots={item.slots}
    />
  }
})

