import { ElRadioGroup, ElRadioButton, ElRadio } from 'element-plus'
import type { VBaseItem } from '.'
import { registerRender } from '../register'
import type { DeepKey, DynamicDef, Into, VPropDef, VTransfer, VueProps } from '../types'
import { dotGet, getDynamic, getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import { VCommonOption, VCommonOptionConfig, DefaultOptionConfig } from './common'

type VRadioGroupProps = VueProps<typeof ElRadioGroup>

export interface VRadioGroupItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>,
  > extends VBaseItem<T, Key> {
  /**
   * 类型  cascader
   */
  props?: VPropDef<T, VRadioGroupProps>,
  /**
   * 是否是 RadioButton
   */
  isButton?: DynamicDef<T, boolean>
  /**
   * 是否展示border
   *
   * 只有`isButton`为`false`生效
   */
  border?: DynamicDef<T, boolean>
  /**
   * 选项 默认是 {@link VCommonOption}
   *
   * 为了ts验证，所以使用了any
   */
  options?: DynamicDef<T, VCommonOption[]> | DynamicDef<T, any[]>
  /**
   * 可选项配置
   */
  optionConfig?: VCommonOptionConfig
  /**
   * 插槽
   */
  slots?: {
    /**
     * 自定义展示模板
     */
    default?(): (JSX.Element | JSX.Element[] | string)
    /**
     * 无匹配选项时的内容
     */
    option?(option: any): (JSX.Element | JSX.Element[] | string)
  }
  /**
   * 数据转换
   */
  transfer?: VTransfer<Into<T, Key>, any>
}

registerRender({
  type: 'RadioGroup',
  render: (props, item) => {
    const isButton = getDynamic(props.form, item.isButton)
    let optionsNodes: JSX.Element[] | null = null
    const options = getDynamic(props.form, item.options) ?? []
    const optionProps = {
      ...DefaultOptionConfig,
      ...(item.optionConfig ?? {})
    }
    if (isButton) {
      optionsNodes = options.map((option, index) => {
        return <ElRadioButton
          key={index}
          label={dotGet(option, optionProps.label as any)}
          disabled={dotGet(option, optionProps.disabled as any)}
          name={dotGet(option, optionProps.name as any)}
        >
          {item.slots?.option ? item.slots?.option(option) : dotGet(option, optionProps.label as any)}
        </ElRadioButton>
      })
    } else {
      const border = getDynamic(props.form, item.border) == true
      optionsNodes = options.map((option, index) => {
        return <ElRadio
          border={border}
          key={index}
          label={dotGet(option, optionProps.value as any)}
          name={dotGet(option, optionProps.name as any)}
          disabled={dotGet(option, optionProps.disabled as any)}
        >
          {item.slots?.option ? item.slots?.option(option) : dotGet(option, optionProps.label as any)}
        </ElRadio>
      })
    }
    return <ElRadioGroup {...mergeProps(props.form, item.props) as VRadioGroupProps}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any, item?.transfer)}
    >
      {optionsNodes}
      {item.slots?.default?.()}
    </ElRadioGroup>
  }
})

//  #endregion
