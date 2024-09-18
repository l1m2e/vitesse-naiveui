import type { FormItemProps } from 'naive-ui'
import type { JSX } from 'vue/jsx-runtime'
import type { FromComponentType } from './formItem'

export interface FormSchema {
  /** 标题内容 */
  label?: string
  /** 表单项的key */
  field?: string
  /** 表单默认值 */
  value?: any
  /** 组件或者使用tsx返回一个虚拟dom */
  component: ((form: Record<string, any>) => JSX.Element) | FromComponentType
  /** 是否隐藏 */
  hidden?: ((form: Record<string, any>) => boolean) | boolean | globalThis.ComputedRef<boolean>
  /** 组件插槽 */
  slots?: Record<string, (form: Record<string, any>) => JSX.Element | string>
  /** 组件属性 */
  props?: Record<string, any>
  /** formItem的属性 */
  formItemProps?: Partial<FormItemProps> & { labelPosition?: string }
  /** 表单项大小 默认24 独占一行 */
  span?: ((form: Record<string, any>) => number) | number | globalThis.ComputedRef<number>
  /** 表单验证 */
  rule?: Array<Record<string, any>> | ((form: Record<string, any>) => Array<Record<string, any>>)
}

export interface Props {
  schema: FormSchema[]
  xGap?: number
  yGap?: number
  labelPlacement?: 'left' | 'top'
  defaultSpan?: number
}
