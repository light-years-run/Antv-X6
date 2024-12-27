<template>
  <div class="home-header-wrapper">
    <div class="main-options">
      <div class="items-wrapper">
        <div class="item" v-for="mainItem in mainOptions[0]" :key="mainItem.name" @click="clickedItem(mainItem.name)">
          <p>{{ mainItem.name }}</p>
        </div>
      </div>
      <div class="items-wrapper">
        <div class="item" v-for="subItem in mainOptions[1]" :key="subItem.name" @click="clickedItem(subItem.name)">
          <p>{{ subItem.name }}</p>
        </div>
      </div>
    </div>
    <el-row class="top-head-toolbar">
    <div class="top-head-drop-item" :class="barItem.enable?'':'disable'" v-for="(barItem,index) in state.actionsData" :key="index">
          <el-dropdown v-show="barItem.canDrop">
            <div class="drop-icon-text">
              <i class="iconfont left-icon" :class="barItem.icon" v-show="barItem.type===1||barItem.type===3" @click.stop="clickedBarItem(barItem)"></i>
              <p class="left-title" v-show="barItem.type>1">{{barItem.title}}</p>
              <el-icon style="margin-left:8px;" color="#999999" v-show="barItem.canDrop"><CaretBottom /></el-icon>
            </div>
            <template #dropdown v-if="barItem.canDrop  && barItem.enable">
              <el-dropdown-menu>
                <el-dropdown-item v-for="(dropItem, i) in barItem.dropItems" :key="i" @click="clickedDropItem(dropItem, index)">
                  <i class="iconfont left-icon" :class="dropItem.icon">
                  </i>{{dropItem.title}}<i v-if="dropItem.title === barItem.title">√</i></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="drop-icon-text" v-show="!barItem.canDrop" @click="clickedBarItem(barItem)">
            <i class="iconfont left-icon" :class="barItem.icon" v-show="barItem.type===1||barItem.type===3"></i>
            <p class="left-title" v-show="barItem.type>1">{{barItem.title}}</p>
            <el-icon style="margin-left:8px;" color="#999999" v-show="barItem.canDrop"><CaretBottom /></el-icon>
          </div>
          <div class="split-line" v-show="barItem.isSplit"></div>
    </div></el-row>
  </div>
</template>

<script setup lang="ts">
import settings from "@/views/core/settings";
import { reactive, inject, watch ,onMounted} from "vue";
import actionsData from '@/views/core/toolbarData'
import { useHeaderHandlerStore } from '@/vendor/headerHandler'
const headerHandle = useHeaderHandlerStore()

const emit = defineEmits(['clickedHeaderItem'])
const barState:any = inject('barState')
const invoke:any = inject('invoke')
const selectedCell:any = inject('selectedCell')
const state = reactive({
  actionsData
})

onMounted(() => {
    const headerHandle = useHeaderHandlerStore()
    headerHandle.toolsStrategy  = toolsStrategy
})

watch(barState, (barState:any)=>{
  if(!barState) return
  state.actionsData.forEach((item:any,i:number) =>{
    state.actionsData[i].enable = barState.includes(item.title)?true:false
  })
})

const mainOptions = [
  [
    {
      name: "文件",
      icon: "",
    },
    {
      name: "编辑",
      icon: "",
    },
    {
      name: "视图",
      icon: "",
    },
    {
      name: "帮助",
      icon: "",
    },
  ],
  [
    {
      name: "顶部",
      icon: ""
    },
    {
      name: "左侧",
      icon: ""
    },
    {
      name: "右侧",
      icon: ""
    },
  ]
]

const toolsStrategy = (title: string) => {
  const todo = {
    新建: () => {
      headerHandle.showGlobalDialog('新建图元',null)
    },
    打开: () => {
      headerHandle.showGlobalDialog('打开',null)
    },
    保存: () => {
      headerHandle.showGlobalDialog('保存',null)
    },
    删除: () => {
      if (selectedCell.value.length > 0) {
        selectedCell.value.forEach((item: any) => {
          item.remove();
        });
      }
    },
    复制: () => {
      const cells = invoke("getSelectedCells", "");
      if (cells.length) {
        invoke("copy", cells);
      }
    },
    粘贴: () => {
      if (!invoke("isClipboardEmpty")) {
        const cells = invoke("paste", { offset: 32 });
        if (cells.length) {
          invoke("cleanSelection", "");
          invoke("select", cells);
        }
      }
    },
    撤销: () => {
      invoke("undo", "");
    },
    重做: () => {
      invoke("redo", "");
    },
    放大: () => {
      invoke("zoom", settings.graphOptions.zoomIn);
    },
    缩小: () => {
      invoke("zoom", settings.graphOptions.zoomOut);
    },
    漫游: () => {
      if (invoke("isPannable")) {
        invoke("disablePanning");
        invoke("enableSelection");
      } else {
        invoke("enablePanning");
        invoke("disableSelection");
      }
    },
    文字: () => {},
    加粗: () => {},
    斜体: () => {},
    画笔: () => {
      invoke("drawPolyline");
    },
  };
  todo[title as keyof typeof todo] && todo[title as keyof typeof todo]();
};

const clickedItem = (name:string) => {
  emit('clickedHeaderItem', name)
}
const clickedDropItem = (dropItem:{title:string,icon:string},i:number) => {
  state.actionsData[i].title = dropItem.title
  state.actionsData[i].icon = dropItem.icon
}
const clickedBarItem = (barItem:{title:string,enable?:boolean}) => {
  if(!barItem.enable) return
  toolsStrategy(barItem.title)
}
</script>

<style scoped lang="scss">
.home-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  .main-options {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    font-size: 14px;
    line-height: 14px;
    color: #333;
    padding: 0px 12px;
    .items-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .item {
        margin: 0px 24px;
      }
    }
  }
  .top-head-toolbar {
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-left-color: transparent;
    border-right-color: transparent;
    padding: 6px 12px;
    .top-head-drop-item {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      cursor: pointer;
      .drop-icon-text {
        font-size: 1rem;
        color: #333;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin: 6px 6px;
        .left-icon {
          font-size: 20px;
        }
      }
    }
    .disable {
      cursor: not-allowed;
      .drop-icon-text {
        color: #ccc;
      }
    }
    .top-head-drop-item:hover:not(.disable){
      background-color: #eee;
      border-radius: 8px;
    }
  }
}
</style>