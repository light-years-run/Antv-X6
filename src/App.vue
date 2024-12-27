<template>
    <router-view></router-view>
    <el-dialog
            v-model="showDialog"
            :title="dialogTitle"
            width="40%"
            @close="clickedCancel"
    >
        <component :is="dialogComponents[dialogTitle]" :params="dialogParams" @onCancel="clickedCancel"
                   @onConfirm="clickedConfirm"></component>
    </el-dialog>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import createNew from "@/components/dialogs/create-new.vue";
import openXml from "@/components/dialogs/open-xml.vue";
import saveXml from "@/components/dialogs/save-xml.vue";
import linkType from "@/components/dialogs/link-type.vue"
import { useHeaderHandlerStore } from '@/vendor/headerHandler'

const showDialog = ref(false) // 是否显示弹窗
const dialogTitle = ref('') // 调用弹窗时配置的标题
let dialogParams = reactive({}) // 调用弹窗时配置的入参
const dialog = ref()
// 所有弹窗组件都从这里罗列出来
const dialogComponents = {
    "新建图元": createNew,
    "打开": openXml,
    "保存": saveXml,
    "配置链接": linkType,
}


onMounted(async() => {
    const headerHandle = useHeaderHandlerStore()
    headerHandle.showGlobalDialog  = showGlobalDialog
    document.oncontextmenu = new Function("event.returnValue=false")    
})

// 点击弹窗的取消按钮
const clickedCancel = (params: any) => {
    showDialog.value = false
    onReject.value(params)
}
// 点击了弹窗的确认按钮
const clickedConfirm = (params: any) => {
    showDialog.value = false
    onResolve.value(params)
}
// 引出promise的状态器
let onResolve = ref()
let onReject = ref()
// 弹出全局弹窗
const showGlobalDialog: DialogFunctionType = (type, params) => {
    dialogTitle.value = type
    dialogParams = params
    showDialog.value = true
    return new Promise((resolve, reject) => {
        onResolve.value = resolve
        onReject.value = reject
    })
}
defineExpose({
  'showGlobalDialog':showGlobalDialog
})

</script>
<style scoped>
</style>
