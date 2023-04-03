<!-- eslint-disable vue/valid-v-model -->
<template>
  <div>
    <el-card>
      <el-row :gutter="20" class="header">
        <el-col :span="7">
          <el-input
            :placeholder="'请输入搜索内容'"
            clearable
            v-model="queryform.query"
          ></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="initGetUsersList"
          >搜索</el-button
        >
        <el-button type="primary" @click="handleDialogVale(null)"
          >添加用户</el-button
        >
      </el-row>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-for="(item, index) in options"
          :key="index"
          align="center"
        >
          <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
            <el-switch v-model="row.mg_state" @change="changeState(row)" />
          </template>
          <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
            {{ $dayformate(row.create_time) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              size="small"
              type="primary"
              @click="handleDialogVale(row)"
              >Edit</el-button
            >
            <el-button size="small" type="warning">Setting</el-button>
            <el-button size="small" type="danger" @click="delUser(row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="queryform.pagesize"
          :page-size="queryform.pagesize"
          :page-sizes="[2, 5, 10, 15]"
          :small="'small'"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tatal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <Dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :dialogTitle="dialogTitle"
      @initUserList="initGetUsersList"
      :dialogTableValue="dialogTableValue"
    ></Dialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { getUsers, changeUserState, deleteUser } from '@/api/users'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import Dialog from './components/dialog.vue'

  const background = ref(false)
  const disabled = ref(false)
  const queryform = ref({
    query: '',
    pagenum: 1,
    pagesize: 10
  })
  const tatal = ref(0)
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const dialogTableValue = ref({})

  const options = [
    {
      label: 'id',
      prop: 'id',
      width: 120
    },
    {
      label: '用户名',
      prop: 'username'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '创建时间',
      prop: 'create_time'
    },
    {
      label: '电话号码',
      prop: 'mobile'
    },
    {
      label: '角色',
      prop: 'role_name'
    },
    {
      label: '状态',
      prop: 'mg_state'
    },
    {
      label: '操作',
      prop: 'action',
      width: 200
    }
  ]
  const tableData = ref([])

  const initGetUsersList = async () => {
    await getUsers(queryform.value).then((res) => {
      tatal.value = res.total
      tableData.value = res.users
    })
  }
  initGetUsersList()

  const handleSizeChange = (pageSize) => {
    queryform.value.pagenum = 1
    queryform.value.pagesize = pageSize
    initGetUsersList()
  }
  const handleCurrentChange = (pageNum) => {
    queryform.value.pagenum = pageNum
    initGetUsersList()
  }
  const changeState = async (info) => {
    await changeUserState(info.id, info.mg_state).then((res) => {
      console.log(res)
    })

    ElMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  const handleDialogVale = (row) => {
    console.log(row)
    if (!row) {
      dialogTitle.value = '添加用户'
      dialogTableValue.value = {}
    } else {
      dialogTitle.value = '编辑用户'
      dialogTableValue.value = JSON.parse(JSON.stringify(row))
    }
    dialogVisible.value = true
  }

  const delUser = (row) => {
    ElMessageBox.confirm('确定删除用户？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await deleteUser(row.id)
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除'
        })
      })
  }
</script>

<style lang="scss" scoped>
  .header {
    padding-bottom: 16px;
    box-sizing: border-box;
  }

  ::v-deep .el-pagination {
    float: right;
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    text-align: right;
  }
</style>
