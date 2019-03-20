// 深度合并
import mergeDeep from '@/scopes/core/editorModules/onlineModulesManage/modulePart/onlineEditor/utils/mergeDeep'

export default {
  increment (state) {
    state.count++
  },
  setState (state, obj) {
    obj = mergeDeep(JSON.parse(JSON.stringify(state)), obj)
    Object.assign(state, obj)

    // 保存本地
    localStorage.store = JSON.stringify(state)
  }
}
