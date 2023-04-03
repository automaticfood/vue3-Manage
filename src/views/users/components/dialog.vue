<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="30%"
    @close="handleClose"
  >
    <el-form ref="FormRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密 码" prop="password" type="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="邮 箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="电话号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { addUser, editUser } from '@/api/users'
  import { ref, defineEmits, reactive, defineProps, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  const dialogVisible = ref(false)
  const props = defineProps({
    dialogTitle: {
      type: String,
      default: '',
      required: true
    },
    dialogTableValue: {
      type: Object,
      default: () => {}
    }
  })
  const form = reactive({
    username: '',
    password: '',
    email: '',
    mobile: ''
  })

  watch(
    () => props.dialogTableValue,
    () => {
      form.value = props.dialogTableValue
    },
    { deep: true, immediate: true }
  )
  const rules = ref({
    username: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ],
    email: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ],
    mobile: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ]
  })

  const emits = defineEmits(['update:modelValue', 'initUserList'])

  const handleClose = (done) => {
    emits('update:modelValue', false)
  }
  const handleConfirm = async () => {
    if (!FormRef.value) return
    await FormRef.value.validate(async (valid) => {
      if (valid) {
        props.dialogTitle === '添加用户'
          ? await addUser(form)
          : await editUser(form)
        await addUser(form)
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        emits('initUserList')
        handleClose()
      } else {
        console.log('error submit!')
      }
    })
  }
  const FormRef = ref(null)
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
