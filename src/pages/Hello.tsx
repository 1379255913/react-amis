import schema2component from "@/utils/schema2component";
import {fixTypeList, fixType} from "@/constant/fixType";

const schema = {
  "type": "page",
  "title": "hello",
  "data": {
    fixTypeList,
    fixType
  },
  "body": [
    {
      type: "button",
      label: "添加报修",
      actionType: "drawer",
      drawer: {
        type: "form",
        title: "添加报修",
        name: "sample-edit-form",
        api: "/admin/report/add",
        body: {
          type: "form",
          name: "sample-edit-form",
          api: "/admin/report/add",
          body: [
            {
              "name": "phone",
              "label": "联系电话",
              "type": "input-number",
              required: true,
            },
            {
              "name": "type",
              "label": "报修项目",
              "type": "select",
              required: true,
              source: "${fixTypeList}",
            },
            {
              "name": "dormitory_num",
              "label": "宿舍楼",
              "type": "input-text",
              required: true,
            },
            {
              "name": "building_num",
              "label": "宿舍号",
              "type": "input-text",
              required: true,
            },
            {
              "name": "description",
              "label": "问题描述",
              "type": "textarea",
              required: true,
            },
            {
              "name": "img",
              "label": "文件图片",
              "type": "input-image",
              required: true,
            },
            {
              name: "technician_id",
              label: "选择师傅",
              type: "select",
              required: true,
              source: {
                method: "get",
                url: "/admin/technician/list",
                data: {
                  pagenum: 0,
                  pagesize: 9996,
                },
                responseData: {

                }
              }
            }
          ]
        }
      },
    },
    {
      "type": "crud",
      "draggable": true,
      "api": "/admin/report/list?pagenum=${pagenum-1}&pagesize=${pagesize}",
      "perPage": 15,
      "pageField": "pagenum",
      "perPageField": "pagesize",
      "keepItemSelectionOnPageChange": true,
      "maxKeepItemSelectionLength": 11,
      "filter": {
        "title": "条件搜索",
        "submitText": "",
        "body": [
          {
            "type": "input-text",
            "name": "keywords",
            "placeholder": "通过关键字搜索",
            "addOn": {
              "label": "搜索",
              "type": "submit"
            }
          },
          {
            "type": "plain",
            "text": "这里的表单项可以配置多个"
          }
        ]
      },
      "bulkActions": [
        {
          "label": "批量删除",
          "actionType": "ajax",
          "api": "delete:/amis/api/sample/${ids|raw}",
          "confirmText": "确定要批量删除?"
        },
        {
          "label": "批量修改",
          "actionType": "dialog",
          "dialog": {
            "title": "批量编辑",
            "name": "sample-bulk-edit",
            "body": {
              "type": "form",
              "api": "/amis/api/sample/bulkUpdate2",
              "body": [
                {
                  "type": "hidden",
                  "name": "ids"
                },
                {
                  "type": "input-text",
                  "name": "engine",
                  "label": "Engine"
                }
              ]
            }
          }
        }
      ],
      "quickSaveApi": "/amis/api/sample/bulkUpdate",
      "quickSaveItemApi": "/amis/api/sample/$id",
      "filterTogglable": true,
      "columns": [
        {
          name: "id",
          label: "维修单号",
        },
        {
          name: "reporter_id",
          label: "报修人",
        },
        {
          name: "building_num",
          label: "宿舍楼",
        },
        {
          name: "dormitory_num",
          label: "宿舍号",
        },
        {
          name: "type",
          label: "报修类型",
          type: "tpl",
          tpl: "${fixType[type]}",
        },
        {
          name: "description",
          label: "问题描述",
        },
        {
          name: "phone",
          label: "联系电话",
        },
        {
          name: "img_url",
          label: "图片",
          type: "image",
        },
        {
          name: "process",
          label: "报修时间",
          type: "tpl",
          tpl: "${process|toJson|first|pick:time|date:YYYY-MM-DD:x}",
        },
        {
          name: "technician_id",
          label: "维修人",
        }
      ]
    }
  ]
}

export default schema2component(schema);
