<template>
  <div>
    <div class="line-wrapper">
      <p class="line-title">图元名</p>
      <el-input class="line-input" v-model="editInfo.cellName" placeholder="请输入图元名"/>
    </div>
    <div class="line-wrapper">
      <p class="line-title">应用类型</p>
      <el-select  class="line-input-wrapper" v-model="editInfo.cellType" placeholder="请选择" size="large">
        <el-option style="width: 100%"
                   v-for="item in cellTypes"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
        />
      </el-select>
    </div>
    <div class="line-wrapper">
      <p class="line-title">类型特性</p>
      <div class="line-input-sub-item">
        <span>端子数：</span>
        <el-input-number  class="line-input-wrapper line-input-wrapper-strtch"
            v-model="editInfo.cellFun"
            :min="1"
            :max="10"
            controls-position="right"
            size="large"
        />
      </div>
    </div>
    <div class="line-wrapper">
      <p class="line-title">图元大小</p>
      <div  class="line-input-sub-item">
      <span  style="white-space: nowrap;">宽度：</span>
      <el-input-number  class="line-input-wrapper"
          v-model="editInfo.cellWidth"
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
      />
      <span  style="white-space: nowrap;padding-left: 12px">高度：</span>
      <el-input-number  class="line-input-wrapper"
          v-model="editInfo.cellHeight"
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
      />
      <span style="white-space: nowrap;padding-left: 12px">单位：</span>
      <el-select  class="line-input-wrapper" v-model="editInfo.cellUnit" placeholder="请选择" size="large">
        <el-option style="width: 100%"
                   v-for="item in cellUnits"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
        />
      </el-select>
      </div>
    </div>
  </div>
  <div class="actions-wrapper">
    <el-button type="danger" size="large" @click="clickedCancel">取消</el-button>
    <el-button type="primary" size="large" @click="clickedConfirm">确定</el-button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const props = defineProps(['params'])
const emits = defineEmits(['onCancel','onConfirm'])
const clickedCancel = () => {
  emits('onCancel', editInfo)
}
const clickedConfirm = () => {
  emits('onConfirm', editInfo)
}
const editInfo = reactive({
  cellName: '',
  cellType: '',
  cellFun: 4,
  cellWidth: 40,
  cellHeight: 40,
  cellUnit: "像素"
})
const cellTypes = [
  {
    label: '常用图元',
    value: 'commonCell',
  },
  {
    label: '笔迹图元',
    value: 'trackCell'
  }
]
const cellUnits = [
  {
    label: '像素',
    value: 'pixel'
  },
  {
    label: '厘米',
    value: 'cm'
  }
]
</script>

<style scoped>
.actions-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 12px;
}
.line-input-wrapper-strtch {
  flex-grow: 1;
}
.line-input-sub-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.line-input {
  height: 40px !important;
  width: 100% !important;
}
.line-wrapper .line-title {
  padding: 0px 0px 12px;
}
.line-wrapper {
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
}
</style>