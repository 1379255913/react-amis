import schema2component from "@/utils/schema2component";


const schema = {
    type: 'page',
    title: 'Dashboard',
    body: [
        {
            "type": "grid",
            "className": "m-t-lg",
            "columns": [
                {
                    "type": "card",
                    "name": "browser",
                    "header": {
                        "title": "GitHub 源码",
                    },

                    href: "https://github.com/iceqing/react-amis-admin",
                    "body": "https://github.com/iceqing/react-amis-admin"
                },
                {
                    "type": "card",
                    "name": "browser",
                    href: "https://amis.iceq.cc/",
                    "header": {
                        "title": "项目演示地址",
                    },
                    "body": "https://amis.iceq.cc/"
                },
                {
                    "type": "card",
                    "name": "browser",
                    href: "https://baidu.github.io/amis/zh-CN/docs/index",
                    "header": {
                        "title": "Amis文档",
                    },
                    "body": "https://baidu.github.io/amis"
                },
                {
                    "type": "card",
                    "name": "browser",
                    href: "https://github.com/baidu/amis",
                    "header": {
                        "title": "Amis GitHub",
                    },
                    "body": "https://github.com/baidu/amis"
                }
            ]
        },
    ]
};

export default schema2component(schema);
