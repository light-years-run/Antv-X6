<template>
  <div>
    <el-upload
        v-model:file-list="fileList"
        action="#"
        multiple
        drag
        accept=".xml"
        :auto-upload="false"
        :on-change="onFileChange"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        拖拽文件到这里或 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          打开本地文件当期仅支持打开.xml文件
        </div>
      </template>
    </el-upload>
  </div>
  <div class="actions-wrapper">
    <el-button type="danger" size="large" @click="clickedCancel">取消</el-button>
    <el-button type="primary" size="large" @click="clickedConfirm">确定</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps(['params'])
const emits = defineEmits(['onCancel', 'onConfirm'])
const fileList = ref(new Array())

const onFileChange = (file: File, files: File[]) => {
  if (!(/\.xml$/.test(file.name))) {
    files.pop()
    ElMessage({
      message: '仅支持打开.xml类型的文件!',
      type: 'warning',
    })
    return;
  }
  console.log(file, 111, files)
}
const clickedCancel = () => {
  emits('onCancel', fileList.value)
}
const clickedConfirm = () => {
  emits('onConfirm', fileList.value)
}
</script>

<style scoped>
.actions-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 12px;
}

:deep(.el-upload-dragger) {
  padding: 20px 10px;
}
</style>