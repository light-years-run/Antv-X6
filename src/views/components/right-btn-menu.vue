<template>
  <el-card class="right-btn-menu-wrap" :style="{top: (state.position.y-5)+'px', left: (state.position.x-10)+'px', display: state.display}">
    <ul>
      <li class="btnli" v-for="(item, i) in state.menuItem" :key="i"  @click="()=>{headerHandle.toolsStrategy(item.title); state.display = 'none'}">
        <i class="iconfont left-icon" :class="item.icon ? '' :item.icon"></i>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, watch, inject } from 'vue';
import { useHeaderHandlerStore } from '@/vendor/headerHandler'
const headerHandle = useHeaderHandlerStore()

const invoke = inject('invoke');
const props = defineProps(['rightBtnMenuData']);
const menuItem = [
    { title: '缩小', icon: '', handle: '' },
    { title: '放大', icon: '', handle: '' },
    { title: '上移', icon: '', handle: '' },
    { title: '下移', icon: '', handle: '' },
    { title: '旋转', icon: '', handle: '' },
    { title: '删除', icon: '', handle: '' },
  ]
const state = reactive({
  menuItem,
  position:{
    x: 0,
    y: 0
  },
  display: 'none'
});

watch(
  () => props.rightBtnMenuData,
  (menuData) => {
    if(!menuData.show){
      state.display = 'none'
      return
    }
    if(Array.isArray(menuData.menu) && menuData.menu.length > 0){
      state.menuItem = []
      menuItem.forEach(item=>{
        if(menuData.menu.includes(item.title)){
          state.menuItem.push(item)
        }
      })
      
        state.position = coordTransition(menuData.coord)
        state.display = 'block'
    }
  }
);

function coordTransition(coord:{x:number,y:number}) {
  return (invoke as any)('localToPage',coord)
}

</script>
<style scoped lang="scss">
ul {
    list-style-type: none; /* 去除项目符号 */
    padding-left: 0; /* 可选：去除默认的左内边距 */
}
.right-btn-menu-wrap {
  position: fixed;
  top: 200px;
  left: 500px;
  // width: 120px;
  // height: 160px;
  background-color: #fff;
  z-index: 99999;

  .btnli {
    border: 1px solid rgb(220, 223, 230);
    background-color: rgb(255, 255, 255);
    color: rgb(96, 98, 102);
    cursor: pointer;
    padding: 6px 8px;
  }

  .btnli:hover {
    border: 1px solid rgb(198, 226, 255);
    background-color: rgb(236, 245, 255);
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
}
::v-deep .el-card__body{
  padding: 0 !important;
  .el-button--small{
    width: 100%;
  }
}
</style>
