import type { RenderFunction } from 'vue';
import type { RegistedItem, VFormItem, VFormItemTypes } from './renders';
import type { DeepKey, VFormProps } from './types';

export interface ItemRender<Type extends keyof VFormItemTypes> {
  <T extends object>(
    props: VFormProps<T>,
    item: RegistedItem<Type, VFormItemTypes<T, DeepKey<T>>[Type]>
  ): (JSX.Element | RenderFunction)
}

export interface FormLabelRender<Type extends keyof VFormItemTypes> {
  <T extends object>(
    props: VFormProps<T>,
    item: RegistedItem<Type, VFormItemTypes<T, DeepKey<T>>[Type]>,
    itemSpan: number,
    itemIndex: number,
    renderItem: ItemRender<Type>,
  ): (JSX.Element | RenderFunction)
}

/**
 * 已注册的 item render
 */
const _registeredRender: any = {}
/**
 * 已注册的 label render
 */
const _registeredLabelRender: any = {}

const _registeredTypes: string[] = [];
/**
 * 默认的全局label render
 */
const _defaultLabelRender: { render?: any } = {}

export function getType(type: string) {
  if (_registeredTypes.indexOf(type) > -1) {
    return type
  }
  const kebaCase = type.replace(/[A-Z]/g, w => `-${w.toLowerCase()}`)
  if (_registeredTypes.indexOf(kebaCase) > -1) {
    return kebaCase
  }
  return type
}
type RenderOpt<Type extends keyof VFormItemTypes> = {
  type: Type,
  render: ItemRender<Type>
} | {
  type: Type,
  labelRender: FormLabelRender<Type>
  render?: ItemRender<Type>
}

/**
 * 自定义 render
 * @param opt
 */
export function registerRender<Type extends keyof VFormItemTypes>(
  opt: RenderOpt<Type>
) {
  _registeredTypes.push(opt.type)
  if (opt.render) {
    _registeredRender[opt.type] = opt.render
  }
  // @ts-ignore
  if (opt.labelRender) {
    // @ts-ignore
    _registeredLabelRender[opt.type] = opt.labelRender
  }
}

export function registerDefaultLabelRender(
  render: <T extends object, Key extends DeepKey<T> = DeepKey<T>>(
    props: VFormProps<T>,
    item: VFormItem<T, Key>,
    itemSpan: number
  ) => (JSX.Element | RenderFunction)
) {
  _defaultLabelRender.render = render
}

export function getItemRender<Type extends keyof VFormItemTypes>(
  item: RegistedItem<Type, VFormItemTypes[Type]>
): ItemRender<Type> | undefined {
  return _registeredRender[item.type]
}

export function getLabelRender<Type extends keyof VFormItemTypes>(
  item: RegistedItem<Type, VFormItemTypes[Type]>
): FormLabelRender<Type> | undefined {
  if (_registeredLabelRender[item.type]) {
    return _registeredLabelRender[item.type]
  }
  if (_defaultLabelRender.render) {
    return _defaultLabelRender.render
  }
}
