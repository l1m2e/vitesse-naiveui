<script lang="tsx" setup>
import SwaggerParser from '@apidevtools/swagger-parser'
import type { DataTableColumns } from 'naive-ui'

const emit = defineEmits<{ save: [mockData: any, dataSchema: any] }>()

const swaggerParser = new SwaggerParser()

const docURL = ref('http://xl-dev-api.aicomin.cn/trickle/api-docs')
const MOCKURL = ref('https://apifoxmock.com/m1/4895776-0-default')

const show = ref(false)
const apiOptions = ref<any>([])
const doc = ref()

async function getDoc() {
  doc.value = await swaggerParser.dereference(docURL.value)
  apiOptions.value = Object.keys(doc.value.paths).flatMap(key => Object.keys(doc.value.paths[key]).map(item => ({
    path: key,
    method: item,
    label: `${item} ${doc.value.paths[key][item].summary}`,
    value: `${item}#${key}`,
    ...doc.value.paths[key][item],
  })))
}
getDoc()

const tableList = ref(
  [{ key: 1, dataSource: 'get#/trickle/system/user/profile', fieldName: 'patInfo' }, { key: 2, dataSource: 'get#/trickle/system/systemInfo/getInfo', fieldName: 'sysInfo' }],
)

const columns: DataTableColumns = [
  { title: '键', key: 'fieldName', render: (_row, index) => <n-input v-model:value={tableList.value[index].fieldName} placeholder="请输入字段名" />, width: 500 },
  { title: '数据源', key: 'dataSource', render: (_row, index) => <n-select v-model:value={tableList.value[index].dataSource} options={apiOptions.value} filterable placeholder="请选择数据源" />, width: 500 },
]

function add() {
  tableList.value.push({ key: tableList.value.length + 1, dataSource: '', fieldName: '' })
}

interface ApiList {
  method: string
  path: string
  schema: any
  fieldName: string

}
async function queryMock() {
  try {
    const apiList = tableList.value.map(({ dataSource, fieldName }) => {
      const [method, path] = dataSource.split('#')
      const schema = doc.value.paths[path][method].responses[200].content['*/*'].schema
      return {
        method,
        path,
        schema,
        fieldName,
      }
    })
    const mockData = await fetchMockData(apiList)
    const dataSchema = getDataSchema(apiList)
    emit('save', mockData, dataSchema)
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function fetchMockData(apiList: ApiList[]) {
  const result: Record<string, any> = {}
  for (const { method, path, fieldName } of apiList) {
    const response = await fetch(`${MOCKURL.value}${path}`, { method })
    const { data } = await response.json()
    result[fieldName] = data
  }
  return result
}

function getDataSchema(apiList: ApiList[]) {
  const result: Record<string, any> = {}
  for (const { schema, fieldName } of apiList) {
    result[fieldName] = schema
  }
  return result
}

function open() {
  show.value = true
}

defineExpose({ open })
</script>

<template>
  <n-modal v-model:show="show">
    <n-card class="w-1200px" title="模态框">
      <n-data-table :columns="columns" :data="tableList" />
      <n-button class="mt-xl w-full" dashed type="primary" @click="add">
        新增数据源
      </n-button>,
      <template #footer>
        <n-space justify="end">
          <n-button @click="show = false">
            关闭
          </n-button>
          <n-button type="primary" class="ml-10px" @click="queryMock">
            确认
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
