import type { CascaderOption } from 'element-plus'

export interface BaseInfo {
  /**
   * 姓名
   */
  name?: string
  /**
   * 性别
   */
  sex?: number
  /**
   * 出生日期
   */
  brithday?: number
  /**
   *
   */
  age?: number

  city?: string,

  address?: string,
  publicAddress?: boolean

  progress?: number

  hobits?: number[]

  choices?:number[]

  friuts:number[]
  rate?: number
}

/**
 * 请求body
 */
export interface CreateForm {
  baseInfo?: BaseInfo

}

export function getSexOpt() {
  return new Promise<any[]>(resolve => {
    resolve([
      { label: '保密', value: 0 },
      { label: '帅哥', value: 1 },
      { label: '美女', value: 2 },
    ])
  })
}
export const CascaderOptions: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];