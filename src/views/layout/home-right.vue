<template>
  <div class="home-right-wrapper">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick" v-show="selectedCells.length === 0">
      <el-tab-pane label="画布" name="first">
        <graph-style></graph-style>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" stretch @tab-click="handleClick" v-show="selectedCells.length === 1">
      <el-tab-pane label="样式" name="first"><div>{{ cellDetails }}</div></el-tab-pane>
      <el-tab-pane label="文本" name="second">文本</el-tab-pane>
      <el-tab-pane label="调整图形" name="third">调整图形</el-tab-pane>
    </el-tabs>
  </div>
  
</template>
<script lang="ts" setup>
import { ref, inject, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import GraphStyle from '@/views/components/graph-style.vue'

const activeName = ref('first')
const selectedCells:any = inject('selectedCell')

const cellDetails = ref()

watch(selectedCells, (selectedCells:any)=>{
  
  if(Array.isArray(selectedCells) && selectedCells.length===1){
    cellDetails.value = JSON.stringify(selectedCells[0].attrs) 
  }
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const getNodeCoord = (node:any)=>{
  if(!node.position) return
  return node.position()
}

const setNodeCoord = (node:any, x:number, y:number)=>{
  if(!node.position) return
  node.position(x,y)
}

</script>
<style scoped lang="scss">
.home-right-wrapper {
  height: 100%;
  width: 280px;
}
</style>
