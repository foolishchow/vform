import type { FormItemRule as ValidationRule } from 'element-plus'
import type { VAutoCompleteItem } from './input-autocomplete';
import type { VColumnItem } from './column';
import type { VCustomItem } from './custom';
import type { VInputItem } from './input';
import type { VInputNumberItem } from './input-number';
import type { VRateItem } from './rate';
import type { VSelectItem } from './select';
import type { VSelectV2Item } from './select-v2';
import type { DeepKey, DynamicDef, ValueOf } from '../types';
import type { VCascaderItem } from './cascader';
import type { VCheckboxGroupItem } from './checkbox-group';
import type { VColorPickerItem } from './color-picker';
import type { VDatePickerItem } from './date-picker';
import type { VDateRangePickerItem } from './date-range-picker';
import type { VRadioGroupItem } from './radio-group';
import type { VSliderItem } from './slider';
import type { VSwitchItem } from './switch';
import type { VTimePickerItem } from './time-picker';
import type { VTimeSelectItem } from './time-select';
import type { VTransferItem } from './transfer';
import type { VUploadItem } from './upload';

// import './cascader'
// import './checkbox-group'
// import './color-picker'
// import './date-picker'
// import './input'
// import './input-number'
// import './input-autocomplete'
// import './radio-group'
// import './rate'
// import "./select"
// import './slider'
// import './switch'
// import './time-picker'

// import './custom'
// import './column'


export * from './cascader'
export * from './checkbox-group'
export * from './color-picker'
export * from './date-picker'
export * from './date-range-picker'
export * from './input'
export * from './input-number'
export * from './input-autocomplete'
export * from './radio-group'
export * from './rate'
export * from "./select"
export * from './select-v2'
export * from './slider'
export * from './switch'
export * from './time-picker'
export * from './time-select'
export * from './transfer'
export * from './upload'

export * from './custom'
export * from './column'


export type RegistedItem<Type, Config> = {
  type: Type
} & Config

export interface VBaseFormItem<T extends object> { }

/**
 * 基础类型
 */
export interface VBaseItem<T extends object, Key extends DeepKey<T> = DeepKey<T>> extends VBaseFormItem<T> {
  /**
   * 占用多个区域
   */
  colSpan?: number
  /**
   * 对应的字段
   */
  dataIndex: Key
  /**
   * label
   */
  label: DynamicDef<T, string>
  /**
   * 验证规则
   */
  rule?: DynamicDef<T, ValidationRule[]>
  /**
   * 是否渲染
   */
  vIf?: DynamicDef<T, boolean>
}

/**
 * 注册类型
 */
export interface VFormItemTypes<T extends object = any, Key extends DeepKey<T> = DeepKey<T>> {
  /**
   * reserved type
   */
  form: never
  /**
   * reserved type
   */
  build: never

  Cascader: VCascaderItem<T, Key>
  CheckboxGroup: VCheckboxGroupItem<T, Key>
  /**
   * 颜色选择
   */
  ColorPicker: VColorPickerItem<T, Key>
  /**
   * 时间选择
   */
  DatePicker: VDatePickerItem<T, Key>

  /**
   * 时间区间选择
   */
  DateRangePicker: VDateRangePickerItem<T, Key>
  Input: VInputItem<T, Key>
  InputNumber: VInputNumberItem<T, Key>

  RadioGroup: VRadioGroupItem<T, Key>
  Rate: VRateItem<T, Key>

  Select: VSelectItem<T, Key>
  SelectV2: VSelectV2Item<T, Key>
  Slider: VSliderItem<T, Key>
  Switch: VSwitchItem<T, Key>
  TimePicker: VTimePickerItem<T, Key>
  TimeSelect: VTimeSelectItem<T, Key>
  Transfer: VTransferItem<T, Key>
  Upload: VUploadItem<T, Key>

  AutoComplete: VAutoCompleteItem<T, Key>

  Column: VColumnItem<T, Key>
  Custom: VCustomItem<T, Key>
}



/**
 * 已注册的类型
 */
export type RegistedTypes = keyof VFormItemTypes;

/**
 * 注册类型 包含type
 */
export type RegistedItemType<T extends object = any, Key extends DeepKey<T> = DeepKey<T>> = {
  [ItemType in RegistedTypes]: RegistedItem<ItemType, VFormItemTypes<T, Key>[ItemType]>
}

export type VFormItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
  > = ValueOf<RegistedItemType<T, Key>>



