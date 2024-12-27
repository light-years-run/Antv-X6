<template>
  <div>
    <div class="file-content">
      <p class="line-title">
        Filename
      </p>
      <el-input class="line-input" v-model="saveInfo.fileName" placeholder="请输入保存文件名"/>
    </div>
  </div>
  <div class="actions-wrapper">
    <el-button type="danger" size="large" @click="clickedCancel">取消</el-button>
    <el-button type="primary" size="large" @click="clickedConfirm">确定</el-button>
  </div>
</template>

<script setup lang="ts">
  import {reactive} from "vue";
  const props = defineProps(['params']);
  const emits = defineEmits(['onCancel','onConfirm']);
  const clickedCancel = () =>{
      emits('onCancel', saveInfo);
  }
  const clickedConfirm=()=>{
      emits('onConfirm', saveInfo);
  }
  
  
  const saveInfo = reactive({
      fileName:''
  })
</script>

<style scoped >
  .file-content{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .line-title{
    padding: 5px 0px 12px;
  }
  .line-input{
    height: 40px !important;
    width: 60% !important;
    margin-left: 20px;
  }
  .actions-wrapper{
    display: flex;
    align-items: center;
    padding-top: 12px;
    justify-content: flex-end;
  }
</style>