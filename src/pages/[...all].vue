<!-- <script lang="ts" setup>
const OPENAPIURL = ref('http://xl-dev-api.aicomin.cn/trickle/api-docs')
const MOCKURL = ref('https://apifoxmock.com/m1/4895776-0-default')

const openapi = ref()
const path = ref()
const queryList = ref([])
const apiList = ref([])

const { data, onFetchFinally } = useFetch<string>(OPENAPIURL)
onFetchFinally(() => {
  openapi.value = JSON.parse(data.value)
  apiList.value = Object.keys(openapi.value.paths).flatMap(key => Object.keys(openapi.value.paths[key]).map(item => ({
    path: key,
    method: item,
    label: `${item} ${openapi.value.paths[key][item].summary}`,
    value: `${item}#${key}`,
    ...openapi.value.paths[key][item],
  })))
})

function selectChange(val: Array<string>) {
  queryList.value = val.map((i) => {
    const [method, path] = i.split('#')
    const responsesRef = openapi.value.paths[path][method].responses[200].content['*/*'].schema.$ref
    return {
      method,
      path,
      responsesRef,
    }
  })
}

async function queryMock() {
  try {
    const requestApis = queryList.value.map(({ method, path }) => fetch(`${MOCKURL.value}${path}`, { method }))
    const responses = await Promise.all(requestApis)
    const dataArray = await Promise.all(responses.map(r => r.json()))
    const extractedData = dataArray.map(({ data }) => data)
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<template>
  <el-card>
    <h1 class="mb-10 text-center text-24 font-700">
      设置数据模型
    </h1>
    <el-select-v2 v-model="path" filterable :options="apiList" class="w-500" multiple @change="selectChange" />
    <el-button class="ml-10" @click="queryMock">
      请求
    </el-button>
  </el-card>
</template> -->
