import { ElCascader } from 'element-plus'
import type { CascaderProps, CascaderValue } from 'element-plus'
import type { VBaseItem } from '.'
import { registerRender } from '../register'
import type { DeepKey, Into, ValueOf, VPropDef, VTransfer, VueProps } from '../types'
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type Node from 'element-plus/lib/components/cascader-panel/src/node'
// #region cascader
type VCascaderProps = Omit<VueProps<typeof ElCascader>, 'props'> & {
  props?: Omit<CascaderProps, 'expandTrigger'> & {
    expandTrigger?: 'click' | 'hover'
  }
}
export interface VCascaderItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * 类型  cascader
   */
  props?: VPropDef<T, VCascaderProps>,
  slots?: {
    /**
     * 自定义展示模板
     */
    default?(data: { node: Node, data: any }): (JSX.Element | JSX.Element[] | string)
    /**
     * 无匹配选项时的内容
     */
    empty?(): (JSX.Element | JSX.Element[] | string)
  }
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, CascaderValue>
}

registerRender({
  type: 'Cascader',
  render: (props, item) => {
    return <ElCascader {...mergeProps(props.form, item.props) as Omit<VCascaderProps, 'props'>}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any, item?.transfer)}
      v-slots={item.slots}
    />
  }
})

//  #endregion
