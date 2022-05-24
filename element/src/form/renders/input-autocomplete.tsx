import { ElAutocomplete } from 'element-plus'
import type { VBaseItem } from '.';
import { registerRender } from '../register';
import type { DeepKey, VPropDef, VueProps } from '../types';
import { getWithTransfer, mergeProps, setWithTransfer } from '../utils'
import type { InputProps } from './input';

type AutocompleteProps = InputProps & VueProps<typeof ElAutocomplete>
//#region auto-complete
export interface VAutoCompleteItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseItem<T, Key> {
  props?: VPropDef<T, AutocompleteProps>
  slots?: {
    prefix?: JSX.Element | { (): JSX.Element }
    suffix?: JSX.Element | { (): JSX.Element }
    prepend?: JSX.Element | { (): JSX.Element | string }
    append?: JSX.Element | { (): JSX.Element | string }
    default?: { (scope: { item: any }): JSX.Element | JSX.Element[] | string }
  }
}

registerRender({
  type: 'AutoComplete',
  render(props, item) {
    return <ElAutocomplete {...mergeProps(props.form, item.props)}
      modelValue={getWithTransfer(props.form, item.dataIndex)}
      onUpdate:modelValue={e => setWithTransfer(props.form, item.dataIndex, e as any)}
      v-slots={item.slots}
    />
  }
})
//#endregion



