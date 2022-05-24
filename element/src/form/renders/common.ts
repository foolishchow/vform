export const DefaultOptionConfig = {
  label: 'label',
  value: 'value',
  name: 'name',
  disabled: 'disabled',
  children:'children'
}
export interface VCommonOption {
  /**
   * 展示的文字
   */
  label: string
  /**
   * 值
   */
  value: any
  /**
   * 禁用状态
   */
  disabled?: boolean
}

export interface VCommonOptionConfig {
  /**
   * label 字段名
   */
  label?: string
  /**
   * value 字段名
   */
  value?: string
  /**
   * 原生name字段名
   */
  name?: any
  /**
   * 禁用字段名
   */
  disabled?: string
}

export interface VSelectOptionConfig{
  /**
   * label 字段名
   */
   label?: string
   /**
    * value 字段名
    */
   value?: string
   /**
    * 原生child字段名
    */
   children?: string
   /**
    * 禁用字段名
    */
   disabled?: string
}