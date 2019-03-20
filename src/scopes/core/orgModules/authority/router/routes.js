import routesContainer from '@/common/components/routesContainer'

// 模块part 声明导入
import roleAuthorityManagement from '../modulePart/roleAuthorityManagement/routes'
import authorityAgent from '../modulePart/authorityAgent/routes'
import adminAuthority from '../modulePart/adminAuthority/routes'
import similarAuthority from '../modulePart/similarAuthority/routes'

const innerRoutes = [
  ...roleAuthorityManagement,
  ...authorityAgent,
  ...similarAuthority,
  ...adminAuthority
]

// 导入路由声明
export default [
  { path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item
    }))
  }
]
