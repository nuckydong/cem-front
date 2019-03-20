import routesContainer from '@/common/components/routesContainer'

//模块part 声明导入
import modulePart1 from "../modulePart/modulePart1/routes"
import modulePart2 from "../modulePart/modulePart2/routes";
import modulePart3 from "../modulePart/modulePart3/routes";
import vueLife from "../modulePart/vueLife/routes";
import vueStart from "../modulePart/vueStart/routes";
import vueDemo from "../modulePart/vueDemo/routes";

const innerRoutes = [
  ...modulePart1,
  ...modulePart2,
  ...modulePart3,
  ...vueLife,
  ...vueStart,
  ...vueDemo

];


//导入路由声明
export default [
  { path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item,
    })),
  },
]
