import routesContainer from '@/common/components/routesContainer'

//模块part 声明导入
import modulePart1 from "../modulePart/modulePart1/routes"
// import onlineEditor from "../modulePart/onlineEditor/routes"
import onlineCode from "../modulePart/onlineCode/routes"

import templateMg from "../modulePart/templateMg/routes"

const innerRoutes = [
    ...modulePart1,
    // ...onlineEditor,
    ...onlineCode,
    ...templateMg
]
//导入路由声明
export default [
  {
    path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item,
    })
),
},
]
