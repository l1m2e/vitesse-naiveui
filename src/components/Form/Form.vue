<script lang="tsx" setup>
import { isFunction } from 'radash'
import { formItemComponentMap } from './formItem'
import type { FormSchema, Props } from './index'

const {
  schema,
  xGap = 10,
  yGap = 10,
  labelPlacement = 'left',
} = defineProps<Props>()

const model = ref < Record<string, any>>({})

function FormItem(item: FormSchema) {
  const Item = isFunction(item.component) ? item.component : formItemComponentMap[item.component]
  return item.field
    ? <n-form-item label={item.label} path={item.field} {...item.formItemProps}><Item {...item.props} v-model:value={model.value[item.field]} /></n-form-item>
    : <Item {...item.props} />
}
</script>

<template>
  <n-form :model :label-placement>
    <n-grid :x-gap="xGap" :y-gap="yGap">
      <n-gi v-for="item in schema" :key="item.field" :span="item.span as number || 24">
        <FormItem v-bind="item" />
      </n-gi>
    </n-grid>
  </n-form>
</template>
