
import { DeepKey, DynamicDef, ValueOf, VValidateTrigger } from '../types';

import type { VCustomItem } from './custom';
import type { VColumnItem } from './column';
import type { VAutoCompleteItem } from './autocomplete';
import type { VCascaderItem } from './cascader'
import type { VCheckboxGroupItem } from './checkbox-group'
import type { VDatePickerItem } from './date-picker'
import type { VDateRangePickerItem } from './date-range-picker'
import type { VInputItem } from './input'
import type { VInputNumberItem } from './input-number'
import type { VRateItem } from './rate'
import type { VSelectItem } from './select'
import type { VSliderItem } from './slider'
import type { VSwitchItem } from './switch'
import type { VTimePickerItem } from './time-picker'
import type { VRadioGroupItem } from './radio-group'
import { RuleObject } from 'ant-design-vue/lib/form';

export * from './custom'
export * from './column'
export * from "./autocomplete"
export * from './cascader'
export * from './checkbox-group'
export * from './date-picker'
export * from './date-range-picker'
export * from './input'
export * from './input-number'
export * from './rate'
export * from './select'
export * from "./slider"
export * from "./switch"
export * from "./time-picker"
export * from "./radio-group"


export interface VBaseFormItem<T extends object> { }

/**
 * 基础类型
 */
export interface VBaseItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
>
  extends VBaseFormItem<T> {
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
  rule?: DynamicDef<T, RuleObject | RuleObject[]>
  /**
   * 验证触发时机 默认不主动触发 `''`
   */
  validateTrigger?: VValidateTrigger | VValidateTrigger[]
  /**
   * 是否渲染
   */
  vIf?: DynamicDef<T, boolean>
}

/**
 * 注册类型
 */
export interface VFormItemTypes<
  T extends object = any,
  Key extends DeepKey<T> = DeepKey<T>
> {
  build: never
  form: never
  merge: never
  Input: VInputItem<T, Key>
  Cascader: VCascaderItem<T, Key>
  InputNumber: VInputNumberItem<T, Key>
  Rate: VRateItem<T, Key>
  Select: VSelectItem<T, Key>
  Slider: VSliderItem<T, Key>
  Switch: VSwitchItem<T, Key>
  TimePicker: VTimePickerItem<T, Key>
  RadioGroup: VRadioGroupItem<T, Key>
  AutoComplete: VAutoCompleteItem<T, Key>
  CheckboxGroup: VCheckboxGroupItem<T, Key>
  DatePicker: VDatePickerItem<T, Key>
  DateRangePicker: VDateRangePickerItem<T, Key>
  Custom: VCustomItem<T, Key>
  Column: VColumnItem<T, Key>
}


/**
 * 已注册的类型
 */
export type RegistedTypes = keyof VFormItemTypes;

/**
 * 注册类型 包含type
 */
export type RegistedItemType<
  T extends object = any,
  Key extends DeepKey<T> = DeepKey<T>
> = {
    [ItemType in RegistedTypes]: VFormItemTypes<T, Key>[ItemType] & { type: ItemType }
  }
export type RegistedItem<
  Type extends RegistedTypes, Opt
> = {
  type: Type
} & Opt

export type VFormItem<
  T extends object,
  Key extends DeepKey<T> = DeepKey<T>
> = ValueOf<RegistedItemType<T, Key>>



