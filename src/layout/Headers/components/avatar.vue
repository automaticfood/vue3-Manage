<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()

  const squareUrl = ref(
    'data:image/jpeg;base64,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'
  )

  const logout = () => {
    store.dispatch('app/logout')
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-dropdown-menu__item {
    white-space: nowrap;
  }
</style>
