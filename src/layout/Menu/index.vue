<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    :unique-opened="true"
  >
    <el-sub-menu
      :index="item.id.toString()"
      v-for="item in menusList"
      :key="item.id"
    >
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
        >{{ it.authName }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
  import { menuList } from '@/api/menu'
  import { ref } from 'vue'

  const defaultActive = ref(sessionStorage.getItem('path') || '/users')
  const savePath = (path) => {
    console.log('path设置')
    sessionStorage.setItem('path', `/${path}`)
  }
  const menusList = ref([])

  const initMenuList = async () => {
    // menusList.value = await menuList().then((res) => {})
    // console.log(menusList.value)
    await menuList().then((res) => {
      menusList.value = res
      console.log(res)
    })
  }
  initMenuList()
</script>

<style lang="scss" scoped></style>
