import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import type { VBaseItem } from '.';
import { registerRender } from '../register'
import type { DeepKey, DynamicDef, InstanceOf, Into, VPropDef, VTransfer, VueProps } from '../types'
import { dotGet, mergeProps, getWithTransfer, setWithTransfer, getDynamic } from '../utils'
import { DefaultOptionConfig, VSelectOptionConfig } from './common';

export interface VSelectGroupOption {
  label: string;
  children?: VSelectOptions[];
  disabled?: boolean;
}

export interface VSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type VSelectOptions = VSelectGroupOption | VSelectOption;

function isGroupOption<T extends object>(item: VSelectItem<T>, option: VSelectOptions): option is VSelectGroupOption {
  // @ts-ignore
  return dotGet(option, item.optionConfig?.children ?? "children") != undefined;
}
/**
 *  select props
 */
type VSelectProps = VueProps<typeof ElSelect>
/**
 *  select
 */
export interface VSelectItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  /**
   * props
   */
  props?: VPropDef<T, VSelectProps>
  /**
   * options defalut is {@link VSelectOptions}[]
   */
  option?: DynamicDef<T, any[]>
  /**
   * option
   */
  optionConfig?: VSelectOptionConfig
  transfer?: VTransfer<Into<T, Key>, string | number>
  slots?: {
    /**
     * slot for render option
     */
    option?: (option: any, index: number) => JSX.Element | JSX.Element[] | string
    /**
     * slot for render group option
     */
    optionGroup?: (option: any, index: number) => string

    prefix?: () => JSX.Element | JSX.Element[] | string

    empty?: () => JSX.Element | JSX.Element[] | string
  }
}


registerRender({
  type: 'Select',
  render: (props, item) => {
    const optionConfig: Required<VSelectOptionConfig> = {
      ...DefaultOptionConfig,
      ...(item.optionConfig ?? {})
    }
    const options = getDynamic(props.form, item.option)
    return <ElSelect
      {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex, item?.transfer)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any, item?.transfer)}
    >

      {renderOptions(item, optionConfig, options)}
    </ElSelect>
  }
})


function renderOptions<T extends object>(item: VSelectItem<T>, optionConfig: Required<VSelectOptionConfig>, options?: VSelectOptions[]) {
  if (!options) return

  return options.map((option, index) => renderOption(item, index, optionConfig, option))
}

function renderOption<T extends object>(item: VSelectItem<T>, index: number, optionConfig: Required<VSelectOptionConfig>, option?: VSelectOptions) {
  if (!option) return
  if (isGroupOption(item, option)) {
    const label = item.slots?.optionGroup ? item.slots?.optionGroup(option, index) : dotGet(option as any, optionConfig.label as any)
    return <ElOptionGroup label={label} key={index}>
      {renderOptions(item, optionConfig, dotGet(option, item.optionConfig?.children ?? 'children'))}
    </ElOptionGroup>
  }
  if (item.slots?.option) {
    const label = dotGet(option as any, optionConfig.label as any)
    const value = dotGet(option as any, optionConfig.value as any)
    const disabled = dotGet(option as any, optionConfig.disabled as any)
    return <ElOption label={label} value={value}
      disabled={disabled} key={index}
      v-slots={{
        default() {
          return item.slots?.option?.(option, index)
        }
      }}>

    </ElOption>
  }
  const label = dotGet(option as any, optionConfig.label as any)
  const value = dotGet(option as any, optionConfig.value as any)
  const disabled = dotGet(option as any, optionConfig.disabled as any)
  return <ElOption label={label} value={value}
    disabled={disabled} key={index}>

  </ElOption>
}