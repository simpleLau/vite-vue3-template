<template>
  <div @click="exportFile">下载</div>
</template>

<script setup name="XlsxExample">
import { utils, writeFileXLSX } from 'xlsx'
import MergeCell from './MergeCell.js'

const mergedCells = [
  {
    name: '导出说明：',
    children: [
      {
        prop: 'vtsCode',
        name: '指标代码',
        width: 180,
        slots: {
          header: 'id_header'
        },
        treeNode: true,
        fixed: 'left'
      },
      {
        prop: 'vtsName',
        name: '指标名称',
        width: 200,
        fixed: 'left'
      },
      {
        prop: 'indexLevel',
        name: '指标级别',
        width: 80,
        slots: {
          default: 'indexLevel_edit'
        }
      },
      {
        prop: 'concept',
        name: '主/客观(Sv/Sd/O)',
        width: 70,
        slots: {
          default: 'concept_edit'
        },
        fixed: 'left'
      },
      {
        prop: 'applyModel',
        name: '能源类型',
        width: 160,
        slots: {
          default: 'applyModel_edit'
        }
      },
      {
        prop: 'units',
        name: '单位',
        width: 60,
        slots: {
          default: 'units_edit'
        }
      },
      {
        prop: 'standardWay',
        name: '达标方式',
        width: 80,
        slots: {
          default: 'standardWay_edit'
        }
      },
      {
        prop: 'configParme',
        name: '目标设定参考原则',
        width: 120,
        editRender: {
          autofocus: '.vxe-input--inner'
        },
        slots: {
          edit: 'configParme_edit',
          default: 'configParme_default'
        }
      },
      {
        prop: 'isPlatformControl',
        name: '是否平台管控',
        width: 60,
        slots: {
          default: 'isPlatformControl_default'
        }
      },
      {
        name: '平台带宽',
        children: [
          {
            prop: 'bandwidthMin',
            name: '平台带宽-',
            width: 100
          },
          {
            prop: 'bandwidthMax',
            name: '平台带宽+',
            width: 100
          }
        ]
      },
      {
        prop: 'latbSwitch',
        name: '商品性设定目标',
        width: 100,
        slots: {
          default: 'latbSwitch_default'
        }
      },
      {
        prop: 'latb',
        name: '商品性目标',
        width: 100,
        editRender: {
          autofocus: '.vxe-input--inner'
        },
        slots: {
          edit: 'latb_edit',
          default: 'latb_default'
        }
      },
      {
        prop: 'recommendValue',
        name: '智能推荐值',
        width: 100,
        slots: {
          default: 'recommendValue_default'
        }
      },
      {
        name: '目标G6',
        children: [
          {
            name: 'ICE 1.5T MT',
            prop: 'targetValue0',
            editRender: {
              autofocus: '.vxe-input--inner',
              autoselect: true
            },
            width: 110,
            slots: {
              edit: 'content_edit',
              default: 'content_default',
              index: 0,
              type: 'powertrain',
              showEnergy: '1'
            }
          }
        ]
      },
      {
        name: '基础车',
        children: [
          {
            name: 'ICE 2.5T MT',
            prop: 'baseValue0',
            width: 130,
            slots: {
              default: 'base_default',
              baseId: 722,
              index: 0,
              type: 'base',
              showEnergy: '1'
            }
          }
        ]
      },
      {
        name: '对标车',
        children: [
          {
            name: '测试测试车型 ICE 1 MT',
            prop: 'beachValue',
            editRender: {
              autofocus: '.vxe-input--inner',
              autoselect: true
            },
            width: 130,
            slots: {
              edit: 'beach_edit',
              default: 'beach_default',
              modelId: 31,
              type: 'beach',
              showEnergy: '1'
            }
          }
        ]
      },
      {
        prop: 'managerName',
        name: '专业经理(开发)',
        width: 90
      },
      {
        prop: 'domainName',
        name: '性能工程师',
        width: 90
      },
      {
        prop: 'deptName',
        name: '责任部门',
        width: 80
      },
      {
        prop: 'designCriteria',
        name: '设计标准',
        width: 80
      },
      {
        prop: 'labelName',
        name: '标签',
        width: 150,
        slots: {
          default: 'labelName_default'
        }
      }
    ]
  },
  {
    prop: 'labelName',
    name: '标签',
    width: 150,
    slots: {
      default: 'labelName_default'
    }
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
