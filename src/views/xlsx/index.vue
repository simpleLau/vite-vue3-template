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
        field: 'vtsCode',
        name: '指标代码',
        width: 180,
        slots: {
          header: 'id_header'
        },
        treeNode: true,
        fixed: 'left'
      },
      {
        field: 'vtsName',
        name: '指标名称',
        width: 200,
        fixed: 'left'
      },
      {
        field: 'concept',
        name: '主/客观(Sv/Sd/O)',
        width: 70,
        slots: {
          default: 'concept_edit'
        },
        fixed: 'left'
      },
      {
        field: 'indexLevel',
        name: '指标级别',
        width: 80,
        slots: {
          default: 'indexLevel_edit'
        }
      },
      {
        field: 'applyModel',
        name: '能源类型',
        width: 160,
        slots: {
          default: 'applyModel_edit'
        }
      },
      {
        field: 'units',
        name: '单位',
        width: 60,
        slots: {
          default: 'units_edit'
        }
      },
      {
        field: 'standardWay',
        name: '达标方式',
        width: 80,
        slots: {
          default: 'standardWay_edit'
        }
      },
      {
        field: 'configParme',
        name: '目标设定参考原则',
        width: 140,
        editRender: {
          autofocus: '.vxe-input--inner'
        },
        slots: {
          edit: 'configParme_edit',
          default: 'configParme_default'
        }
      },
      {
        field: 'isPlatformControl',
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
            field: 'bandwidthMin',
            name: '带宽-',
            width: 75
          },
          {
            field: 'bandwidthMax',
            name: '带宽+',
            width: 75
          }
        ]
      },
      {
        field: 'latb',
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
        field: 'recommendValue',
        name: '智能推荐值',
        width: 100,
        slots: {
          default: 'recommendValue_default'
        }
      },
      {
        name: '目标(G6)',
        children: [
          {
            name: 'ICE 1.5T MT',
            field: 'targetValue0',
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
        name: '目标(G5)',
        children: [
          {
            name: 'ICE 1.5T MT',
            field: 'targetValue0',
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
        field: 'managerName',
        name: '专业经理(开发)',
        width: 90
      },
      {
        field: 'domainName',
        name: '性能工程师',
        width: 90
      },
      {
        field: 'deptName',
        name: '责任部门',
        width: 80
      },
      {
        field: 'designCriteria',
        name: '设计标准',
        width: 80
      },
      {
        field: 'labelName',
        name: '标签',
        width: 150,
        slots: {
          default: 'labelName_default'
        }
      },
      {
        name: '评估结果(G3)',
        children: [
          {
            name: 'ICE 1.5T MT',
            children: [
              {
                field: 'targetValue0',
                name: '目标值',
                width: 110,
                slots: {
                  default: 'content_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'simulationTest0',
                name: '仿真/试验结果',
                width: 150,
                slots: {
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'evalValue0',
                name: '评估结果',
                width: 120,
                slots: {
                  default: 'evalValue_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'reach0',
                name: '是否达成',
                width: 120,
                slots: {
                  default: 'reach_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'risk0',
                name: '风险说明',
                width: 120,
                slots: {
                  default: 'risk_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              }
            ]
          }
        ]
      },
      {
        name: '评估结果(G4)',
        children: [
          {
            name: 'ICE 1.5T MT',
            children: [
              {
                field: 'targetValue0',
                name: '目标值',
                width: 110,
                slots: {
                  default: 'content_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'simulationTest0',
                name: '仿真/试验结果',
                width: 150,
                slots: {
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'evalValue0',
                name: '评估结果',
                width: 120,
                slots: {
                  default: 'evalValue_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'reach0',
                name: '是否达成',
                width: 120,
                slots: {
                  default: 'reach_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              },
              {
                field: 'risk0',
                name: '风险说明',
                width: 120,
                slots: {
                  default: 'risk_default',
                  index: 0,
                  type: 'powertrain',
                  showEnergy: '1'
                }
              }
            ]
          }
        ]
      }
    ]
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
