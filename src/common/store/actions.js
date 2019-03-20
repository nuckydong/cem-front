import { getTemplate, getSlotContent, getStringTypeAttr } from '@/scopes/core/editorModules/onlineModulesManage/modulePart/onlineEditor/template'
export default {
  delComponent (context, id) {
    // 删除前备份一份
    context.commit('setState', { backupComponents: JSON.parse(JSON.stringify(context.state.components)) })

    let components = context.state.components
    let index = components.findIndex(c => c.info.id === id)
    let component = components[index]
    // 从父组件的slots中删除
    if (component.parentId) {
      let parent = components.find(c => c.info.id === component.parentId)
      let slot = parent.slots[component.slot || component.attributes.slot || 'default']
      let i = slot.findIndex(item => item.id === component.info.id)
      // 删除
      slot.splice(i, 1)

      // 递归获取最父级组件
      let getTop = function (_component) {
        if (_component.parentId) {
          let c = components.find(c => c.info.id === _component.parentId)
          return getTop(c)
        } else {
          return _component
        }
      }

      // 更新模板
      let top = getTop(parent)
      top.template = getTemplate(top.info, top.attributes, top.slots).template
    }
    // 删除当前组件所有子组件
    function delChildren (component) {
      let slots = component.slots
      Object.keys(slots).forEach(slot => {
        if (component.slots[slot].length) {
          component.slots[slot].forEach(val => {
            let childIndex = components.findIndex(c => c.info.id === val.id)
            let hasChild
            if (childIndex >= 0) {
              hasChild = Object.keys(components[childIndex].slots).every(slot => {
                return components[childIndex].slots[slot].length > 0
              })
            }
            if (hasChild) { delChildren(components[childIndex]) }
            components.splice(childIndex, 1)
          })
        }
      })
    }
    delChildren(component)

    // 删除自身
    index = components.findIndex(c => c.info.id === id) // components已被更新 重新获取索引
    components.splice(index, 1)

    // 更新
    context.commit('setState', { currentComponent: {}, components })

    return Promise.resolve(components)
  }
}
