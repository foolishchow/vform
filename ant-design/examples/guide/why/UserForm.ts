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

  rate?: number
}

export function getSexOpt() {
  return new Promise<{ label: string, value: number }[]>(resolve => {
    resolve([
      { label: '保密', value: 0 },
      { label: '帅哥', value: 1 },
      { label: '美女', value: 2 },
    ])
  })
}