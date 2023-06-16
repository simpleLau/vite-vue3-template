<template>
  <div @click="exportFile">下载</div>
</template>

<script setup name="XlsxExample">
import { utils, writeFileXLSX } from 'xlsx'
import MergeCell from './MergeCell.js'

const mergedCells = [
  {
    name: '序号',
    prop: 'id'
  },
  {
    name: '姓名',
    prop: 'name'
  },
  {
    name: '性别',
    prop: 'sex'
  },
  {
    name: '公司概况',
    children: [
      {
        name: '职位',
        prop: 'jobTitle'
      },
      {
        name: '项目',
        children: [
          {
            name: '项目时长',
            prop: 'projectTime'
          },
          {
            name: '项目描述',
            prop: 'projectDesc'
          },
          {
            name: '金额',
            children: [
              {
                name: '总金额',
                prop: 'total'
              },
              {
                name: '利润',
                prop: 'profit'
              }
            ]
          }
        ]
      },
      {
        name: '公司名称',
        prop: 'companyName'
      }
    ]
  },
  {
    name: '备注',
    prop: 'remark'
  }
]

const list = [
  {
    id: 0,
    name: '张三',
    sex: '男',
    jobTitle: '区域经理',
    projectTime: '3天',
    projectDesc: '暂无描述',
    total: 998,
    profit: 9.98,
    companyName: '阿里巴巴',
    remark: '暂无'
  },
  {
    id: 1,
    name: '李四',
    sex: '女',
    jobTitle: 'CEO',
    projectTime: '30天',
    projectDesc: '稳了',
    total: 998,
    profit: 9.98,
    companyName: '中石油',
    remark: '暂无'
  }
]

// 导出多表头结构
function exportFile() {
  const ws = utils.json_to_sheet([])
  const { headerValue, headerMerge, bodyValue, deep } = new MergeCell(
    mergedCells,
    list
  )
  ws['!merges'] = headerMerge
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  utils.sheet_add_aoa(ws, headerValue, { origin: 'A1' }) // 将js数据转换为工作表
  utils.sheet_add_aoa(ws, bodyValue, { origin: `A${deep + 2}` }) // 将js数据转换为工作表
  writeFileXLSX(wb, `${+new Date()}.xlsx`)
}
</script>
