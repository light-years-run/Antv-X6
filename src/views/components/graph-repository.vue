<template>
    <div class="graph-repository-wrapper">
        <div class="title"><p>图元库</p></div>
        <div class="repository-content">
            <div class="left">
                <el-tree
                        :props="treeNodeProps"
                        :data="leftPannelData"
                        :filter-node-method="filterNode"
                        ref="treeFilterRef"
                        show-checkbox
                        :expand-on-click-node="false"
                        @node-click="clickedLeft"
                />
            </div>
            <div class="right">
                <div class="right-cell-item" v-for="item in rightPannelData" :key="item.uuid" v-show="!item.isDir">
                    <el-popover placement="right" trigger="hover">
                        <template #reference>
                            <img
                                    :src="item.img || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202108%2F05%2F20210805211949_e77e4.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681869337&t=18509730555e491db1e38c72b4facad0'">
                        </template>
                        <div>
                            <h4>这是图元名称</h4>
                            <p>这是图元描述这是图元描述这是图元描述这是图元描述这是图元描述</p>
                        </div>
                    </el-popover>
                    <p class="right-item-title">{{ item.name }}</p>
                </div>
                <div class="right-cell-item" style="height: 0px" v-for="(i, index) in  20" :key="index+999"></div>
            </div>
        </div>
        <div class="bottom-actions">
            <el-button type="info" @click="clickedCancel">取消</el-button>
            <el-button type="primary" @click="clickedConfirm">应用</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, nextTick} from "vue";


const emits = defineEmits(['shouldHideRepository'])
const treeNodeProps = {
    children: 'children',
    label: 'name',
}
const treeFilterRef = ref()
const filterNode = (value: string, data: NodeModel) => {
    return data.isDir
}
// 点击左侧选项,展示右侧图标
const clickedLeft = (itemChild: NodeModel) => {
    if (itemChild.uuid === rightPannelParentId.value) {
        // 重复选中不重复操作
        return
    }
    rightPannelParentId.value = itemChild.uuid!
    rightPannelData.value = itemChild.children || []
}

// 当前展示的右侧数据的父节点uuid
const rightPannelParentId = ref("")
// 右侧图元数组
const rightPannelData = ref(new Array<NodeModel>())
// 左侧分类数据
const leftPannelData = ref(new Array<NodeModel>())

const loadGraphAll = () => {
    graphGetAll().then((res: ResultData) => {
        if (res.code === 200) {
            leftPannelData.value = res.data
            // 执行 过滤操作
            nextTick(() => {
                treeFilterRef.value.filter()
            })
        }
    }).catch((err: any) => {
        ElMessage.error("加载数据失败!")
    })
}
const clickedCancel = () => {
    emits('shouldHideRepository')
}
const clickedConfirm = () => {
    // 过滤掉文件节点和 不包含子节点的文件节点
    const selectedDirNodes: NodeModel[] = treeFilterRef.value.getCheckedNodes().filter((i: NodeModel) => i.isDir && i.children && i.children.length > 0)
    emits('shouldHideRepository', selectedDirNodes)
}

</script>

<style scoped>
.right-cell-item img {
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
}

.right-cell-item .right-item-title {
    white-space: nowrap;
}

.right-cell-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    margin-left: 6px;
    margin-right: 6px;
    width: 60px;
    height: 80px;
}

.right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 12px;
    overflow-x: hidden;
    overflow-y: scroll;
}

.main-category .secondary-category {
    height: 35px;
    background-color: #fff;
    padding: 0px 0px 0px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1rem;
}

.main-category .main-title {
    height: 40px;
    background-color: #f5f5f5;
    padding: 0px 0px 0px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.14rem;
    font-weight: bold;
}

.main-category {
    width: 100%;
}

.repository-content .right {
    flex-grow: 1;
    flex-shrink: 1;
}

.repository-content .left {
    width: 200px;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}

.repository-content {
    flex-shrink: 1;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: calc(100% - 80px);
}

.title {
    flex-shrink: 0;
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.14rem;
}

.bottom-actions {
    height: 40px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #f5f5f5;
}

.graph-repository-wrapper {
    width: 50vw;
    height: 60vh;
    min-width: 300px;
    min-height: 250px;
    max-width: 50vw;
    max-height: 60vh;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>