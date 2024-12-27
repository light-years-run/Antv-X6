<template>
  <div class="home-left-wrapper">
    <el-tabs v-model="showTabName" stretch @tab-click="clickedTab">
      <el-tab-pane label="原图库" name="原图库">
        <div class="meta-cells-wrapper">
          <!-- <el-input v-model="searchText" placeholder="搜索图形" suffix-icon="Search" size="large" class="search-area" /> -->
          <div class="cell-items-wrapper">
            <el-collapse v-model="activeNames">
              <el-collapse-item name="1" v-for="cellCategory in cellItems" :key="cellCategory.id"
                :title="cellCategory.name">
                <div class="cell-items">
                  <div class="cell-item" id="lndndcontainer" v-for="cellItem in cellCategory.children" :key="cellItem.id"
                    @mousedown="startDrag($event, cellItem)">
                    <div class="cell-item-img">
                      <svg viewBox="0 0 100 100">
                        <path stroke="#666" stroke-width="4" :fill="cellItem.fillColor" :d="cellItem.path"></path>
                      </svg>
                    </div>
                    <div class="cell-item-info">
                      <p>{{ cellItem.name }}</p>
                    </div>
                  </div>
                  <div class="cell-item cell-item-placeholder" v-for="placeItem in 5"></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-button type="primary" icon="plus" class="add-more-btn"
            @click="showGraphRepository = !showGraphRepository">更多图形
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文件管理" name="文件管理">
        <file-tree :enable-select="false" ref="setTreeDataRef"></file-tree>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="showGraphRepository">
      <graph-repository @shouldHideRepository="shouldHideRepository"></graph-repository>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { TabsPaneContext } from "element-plus";
import { reactive, ref } from "vue";
import FileTree from "@/views/components/file-tree.vue";
import GraphRepository from "@/views/components/graph-repository.vue";

const showTabName = ref("原图库")
// const searchText = ref("")
const setTreeDataRef = ref()
// 是否显示图元库
const showGraphRepository = ref(false)
const emits = defineEmits(["startDrag"])
const startDrag = (e: MouseEvent, item: any) => {
  emits("startDrag", { e, item })
}

let activeNames = ref(["1"]);
 
const shouldHideRepository = (nodes?: any) => {
  showGraphRepository.value = false
  //   添加节点到左侧分类
  cellItems = cellItems.concat(nodes || [])
}
let cellItems = reactive([
  {
    name: "基本图形",
    id: 'common',
    icon: "",
    children: [
      {
        name: "矩形",
        id: 'rect',
        icon: "rect.png",
        width: 100,
        height: 100,
        label: "文本",
        fillColor: "transparent",
        path: "M 15 10 h 70 v 70 h -70 z",
        graph: {
          markup: [{
            tagName: 'rect',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              rx: 6,
              ry: 6,
            }
          }
        }
      },
      {
        name: "圆形",
        id: 'circle',
        width: 100,
        height: 100,
        icon: "circle.png",
        label: "文本",
        fillColor: "transparent",
        path: "M 10 45 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 z",
        graph: {
          markup: [{
            tagName: 'circle',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              refCx: 0.5,
              refCy: 0.5,
              refR: 0.5
            }
          }
        }
      },
      {
        name: "椭圆",
        id: 'ellipse',
        icon: "tuoyuan.png",
        width: 100,
        height: 60,
        label: "文本",
        fillColor: "transparent",
        path: "M 10 34 a 45 30 0 0 1 80 0 a 45 30 0 1 1 -80 0 z",
        graph: {
          markup: [{
            tagName: 'ellipse',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              refCx: 0.5,
              refCy: 0.5,
              refRx: 0.5,
              refRy: 0.5
            }
          }
        }
      },
      {
        name: "立方体",
        id: "path",
        icon: "cube.png",
        width: 100,
        height: 100,
        label: "",
        fillColor: "transparent",
        path: "M49.75,10.285 L14.5,29 L14.5,68 L49.75,86.953 L84.5,68 L84.5,29 z M49.442,47.359 L84.5,29 M49.865,47.581 L14.5,29 M49.5,87 L49.442,47.359",
        graph: {
          markup: [
            {
              tagName: "path",
              selector: "body",
            }
          ],
          attrs: {
            body: {
              stroke: "#8f8f8f",
              strokeWidth: 2,
              fill: "transparent",
              refD: "M49.75,10.285 L14.5,29 L14.5,68 L49.75,86.953 L84.5,68 L84.5,29 z M49.442,47.359 L84.5,29 M49.865,47.581 L14.5,29 M49.5,87 L49.442,47.359"
            }
          }
        }
      },
      {
        name: "平行四边形",
        id: "polygon",
        icon: "rhomboid.png",
        width: 100,
        height: 100,
        label: "",
        fillColor: "transparent",
        path: "M84,79.5 L5,79.5 L16,21.5 L95,21.5z",
        graph: {
          markup: [
            {
              tagName: "polygon",
              selector: "polygon",
            }
          ],
          attrs: {
            polygon: {
              stroke: "#8f8f8f",
              strokeWidth: 2,
              fill: "transparent",
              refPoints: "84,79.5 5,79.5 16,21.5 95,21.5"
            }
          }
        }
      },
      {
        name: "三角形",
        id: "polygon",
        icon: "triangle.png",
        width: 100,
        height: 100,
        label: "",
        fillColor: "transparent",
        path: "M 50,10.5 L5,80.5 L95,80.5 z",
        graph: {
          markup: [
            {
              tagName: "polygon",
              selector: "polygon",
            }
          ],
          attrs: {
            polygon: {
              stroke: "#8f8f8f",
              strokeWidth: 2,
              fill: "transparent",
              refPoints: "50,10.5 5,80.5 95,80.5 "
            }
          }
        }
      },
      {
        name: "六边形",
        id: "polygon",
        icon: "hexagon.png",
        width: 100,
        height: 100,
        label: "",
        fillColor: "transparent",
        path: "M11.166,48.25 L29.881,83.5 L68.881,83.5 L87.834,48.25 L68.881,13.5 L29.881,13.5 z",
        graph: {
          markup: [
            {
              tagName: "polygon",
              selector: "polygon",
            }
          ],
          attrs: {
            polygon: {
              stroke: "#8f8f8f",
              strokeWidth: 2,
              fill: "transparent",
              refPoints: "11.166,48.25 29.881,83.5 68.881,83.5 87.834,48.25 68.881,13.5 29.881,13.5 "
            }
          }
        }
      },
      {
        name: "菱形",
        id: "polygon",
        icon: "rhombus.png",
        width: 100,
        height: 100,
        label: "",
        fillColor: "transparent",
        path: "M50,5 L5,50 L50,95 L95,50z",
        graph: {
          markup: [
            {
              tagName: "polygon",
              selector: "polygon",
            }
          ],
          attrs: {
            polygon: {
              stroke: "#8f8f8f",
              strokeWidth: 2,
              fill: "transparent",
              refPoints: "50,5 5,50 50,95 95,50"
            }
          }
        }
      },
      {
        name: "开关",
        id: 'switch',
        icon: "switch.png",
        width: 100,
        height: 50,
        label: "",
        fillColor: "transparent",
        path: "M 0 50 h 40 l 20 -20 m 0 20 h 40",
        graph: {
          markup: [{
            tagName: 'path',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              refD: 'M 0 50 h 40 l 20 -20 m 0 20 h 40'
            }
          }
        }
      },
      {
        name: "电阻",
        id: 'resistance',
        icon: "resistance.png",
        width: 100,
        height: 20,
        label: "10K",
        fillColor: "#999",
        ports: [],
        path: "M 0 50 h 20 v -5 h 60 v 10 h -60 v -5 M 80 50 h 20",
        graph: {
          markup: [{
            tagName: 'path',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#666',
              strokeWidth: 2,
              fill: '#999',
              refD: 'M 0 50 h 20 v -5 h 60 v 10 h -60 v -5 M 80 50 h 20'
            }
          }
        }
      },
      {
        name: "电源",
        id: 'power',
        icon: "power.png",
        width: 100,
        height: 20,
        label: "",
        fillColor: "transparent",
        ports: [],
        path: "M 0 50 h 45 M 55 50 h 45 M 45 45 v 20 M 55 50 v 10",
        graph: {
          markup: [{
            tagName: 'path',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              refD: 'M 0 50 h 45 M 55 50 h 45 M 45 45 v 20 M 55 50 v 10'
            }
          }
        }
      },
      {
        name: "变压器",
        id: 'trans',
        icon: "trans.png",
        width: 100,
        height: 40,
        label: "",
        fillColor: "transparent",
        ports: [],
        path: "M 0 50 h 20 M 80 50 h 20 M 20 50 a 20 20 0 0 1 40 0 a 20 20 0 1 1 -40 0 z M 40 50 a 20 20 0 0 1 40 0 a 20 20 0 1 1 -40 0 z",
        graph: {
          markup: [{
            tagName: 'path',
            selector: 'body'
          }],
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 2,
              fill: 'transparent',
              refD: 'M 0 50 h 20 M 80 50 h 20 M 20 50 a 20 20 0 0 1 40 0 a 20 20 0 1 1 -40 0 z M 40 50 a 20 20 0 0 1 40 0 a 20 20 0 1 1 -40 0 z'
            }
          }
        }
      }
    ]
  }
])
const clickedTab = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event)
}
</script>

<style scoped lang="scss">
.meta-cells-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .search-area {
    padding: 0px 12px 12px;
    flex: 0;
  }

  .add-more-btn {
    height: 35px;
    margin: 12px;
  }

  .cell-items-wrapper::-webkit-scrollbar {
    display: none;
  }

  .cell-items-wrapper {
    padding: 0px 12px 12px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */

    .cell-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 4px;

      .cell-item {
        margin: 4px;
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #666;

        .cell-item-img {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          object-fit: cover;
          display: flex;
          align-items: center;
          justify-content: top;

          svg {
            width: 100%;
          }
        }

        .cell-item-info {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .cell-item-placeholder {
        height: 0px;
        overflow: hidden;
      }
    }
  }
}

.home-left-wrapper {
  height: 100%;
  width: 280px;

  :deep(.el-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-tabs__content) {
    flex: 1;
    overflow: hidden;
  }

  :deep(.el-tab-pane) {
    height: 100%;
  }

  :deep(.el-dialog__header) {
    display: none !important;
  }

  :deep(.el-dialog__body) {
    padding: 0px !important;
    margin: 0px !important;
  }
}
</style>