<template>
  <div class="home-wrapper">
    <div
      class="header"
      :style="{ height: expandInfo.showTop ? 'auto' : '35px' }"
    >
      <home-header @clickedHeaderItem="clickedHeaderItem"></home-header>
    </div>
    <div class="content">
      <div
        class="left-tool"
        :style="{ width: expandInfo.showLeft ? '280px' : '0px' }"
      >
        <home-left @startDrag="startDrag"></home-left>
      </div>
      <div class="work-space">
        <div class="x6-space">
          <div id="x6graphcontainer"></div>
        </div>
        <div class="footer">
          <div class="footer-switch-icons">
            <div class="footer-switch-item">
              <el-icon>
                <CaretLeft />
              </el-icon>
            </div>
            <div class="footer-switch-item">
              <el-icon>
                <CaretRight />
              </el-icon>
            </div>
          </div>
          <div class="footer-graph-pages-wrapper">
            <div
              class="footer-graph-page-item"
              v-for="(graphItem, index) in graphPages"
              :key="graphItem.id"
              :style="{
                backgroundColor:
                  showGraphPageIndex === index ? '#fff' : 'transparent',
              }"
              @click="clickedGraphPage(index)"
            >
              <div>{{ graphItem.pageName }}</div>
              <el-icon>
                <CloseBold />
              </el-icon>
            </div>
          </div>
          <div class="footer-add-graph">
            <el-icon>
              <Plus />
            </el-icon>
          </div>
        </div>
      </div>
      <div
        class="right-tool"
        :style="{ width: expandInfo.showRight ? '280px' : '0px' }"
      >
        <home-right data=""></home-right>
      </div>
    </div>
    <right-btn-menu :rightBtnMenuData="rightBtnMenuData"></right-btn-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref, provide } from "vue";
import HomeHeader from "@/views/layout/home-header.vue";
import HomeLeft from "@/views/layout/home-left.vue";
import HomeRight from "@/views/layout/home-right.vue";
import RightBtnMenu from "@/views/components/right-btn-menu.vue";
import { GraphManager } from "@/views/core/graphManager";
import { getToolsBtnState, triggerPorts, getRightBtnMenu } from "@/views/core/eventManager";
import { ElMessageBox } from "element-plus";
const graphManager: Ref<GraphManager | undefined> = ref();
const selectedCell = ref([]);
const toolbarState = ref();
const rightBtnMenuData = ref();

//调用graph上的方法
const invoke = (handleName: string, option?: any) => {
  return graphManager.value!.invoke(handleName, option);
}
//注入到子组件
provide("invoke", invoke);
provide("barState", toolbarState);
provide("selectedCell", selectedCell);

onMounted(() => {
  graphManager.value = new GraphManager("x6graphcontainer", "lndndcontainer");
  onMouseEvent()
});
//
const onMouseEvent = ()=>{
    graphManager.value!.onNodeSelected((args: any, eventKey: string) => {
        rightBtnMenuData.value = { show: false }
        toolbarState.value = getToolsBtnState(args, eventKey);
        const cells = invoke("getSelectedCells");
        if (cells.length > 0 ) {
            selectedCell.value = cells;
        }
    });
    graphManager.value!.onCellMouseMove((args: any, eventKey: string) => {
        triggerPorts(args, eventKey)
    });
    graphManager.value!.onClickedGraphBlank((args: any, eventKey: string) => {
        rightBtnMenuData.value = { show: false }
        toolbarState.value = getToolsBtnState(args, eventKey);
        if (selectedCell.value.length > 0) {
            selectedCell.value = [];
        }
    });
    graphManager.value!.onClickMouseRightBtn((args: any, eventKey: string) => {
        rightBtnMenuData.value = getRightBtnMenu(args, eventKey)
    });
}

const startDrag = (obj: any) => {
  graphManager.value?.dndStartDrag(obj.e, obj.item);
};

const showGraphPageIndex = ref(0);
const clickedGraphPage = (index: number) => {
  showGraphPageIndex.value = index;
};

const graphPages = reactive([
  {
    pageName: "图形1",
    id: "cl",
  },
  {
    pageName: "图形2",
    id: "jl",
  },   
]);

// 顶部/左侧/右侧工具栏 是否显示
const expandInfo = reactive({
  showTop: true,
  showLeft: true,
  showRight: true,
});
const clickedHeaderItem = (name: string) => {
  ElMessage.error('wechat: 676750993')
  if (name === "顶部") {
    expandInfo.showTop = !expandInfo.showTop;
  }
  if (name === "左侧") {
    expandInfo.showLeft = !expandInfo.showLeft;
  }
  if (name === "右侧") {
    expandInfo.showRight = !expandInfo.showRight;
  }
};
</script>

<style scoped lang="scss">
.home-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .header {
    min-height: 35px;
    overflow: hidden;
    background-color: #f2f3f4;
    transition-property: height;
    transition-timing-function: ease-in-out;
    transition-duration: 0.3s;
  }

  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .left-tool {
      width: 280px;
      overflow: hidden;
      transition-property: width;
      transition-timing-function: ease-in-out;
      transition-duration: 0.5s;
    }

    .work-space {
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f8f9fa;

      .x6-space {
        flex: 1;
        overflow: hidden;

        #x6graphcontainer {
          width: 100%;
          height: 100%;
        }
      }

      .footer {
        height: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #f1f2f3;

        .footer-add-graph {
          display: flex;
          align-items: center;
          justify-content: center;
          border-left: 1px solid #999;
          border-right: 1px solid #999;
          font-size: 16px;
          font-weight: 600;
          padding: 0px 4px;
        }

        .footer-graph-pages-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;

          .footer-graph-page-item {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            padding: 0px 8px;
            font-size: 14px;
            color: #444;

            div {
              margin-right: 6px;
            }
          }
        }

        .footer-switch-item:nth-child(1) {
          border-right: 1px solid #999;
        }

        .footer-switch-icons {
          display: flex;
          align-items: center;

          .footer-switch-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            font-size: 20px;
          }
        }
      }
    }

    .right-tool {
      width: 200px;
      overflow: hidden;
      background-color: #fff;
      transition-property: width;
      transition-timing-function: ease-in-out;
      transition-duration: 0.5s;
    }
  }
}
</style>
