<template functional>
  <ta-sub-menu v-on="listeners" v-bind="data.attrs">
    <span slot="title">
      <ta-icon :type="data.attrs.menuInfo.icon|| 'setting'"/>
      <span>{{data.attrs.menuInfo.name}}</span></span>
    <template v-for="item in data.attrs.menuInfo.children">
      <ta-menu-item v-if="!item.children" :key="item.id" :data-item="item">
        <ta-icon :type="item.icon || 'setting'"/>
        <span>{{item.name}}</span>
      </ta-menu-item>
      <sub-menu v-else :menuInfo="item" :key="item.id"  />
    </template>
</ta-sub-menu>
</template>
