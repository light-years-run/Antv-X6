<template>
  <div class="form-color-wrap">
    <el-row>
        <el-col :span="6" :offset="1">
            <!-- <el-checkbox v-model="state.fillstate" label="填充" size="small" /> -->
            <label>背景</label>
        </el-col>
        <el-col :span="17">
            <el-row>
                <el-col :span="14">
                    <el-input v-model="background.color" placeholder="#333333" />
                </el-col>
                <el-col :span="10">
                    <el-color-picker v-model="background.color" />
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="6" :offset="1">
            <el-checkbox v-model="grid.visible" label="网格" size="small" />
        </el-col>
        <el-col :span="17">
            <el-row>
                <el-col :span="14">
                    <el-input v-model="grid.args.color"  />
                </el-col>
                <el-col :span="10">
                    <el-color-picker v-model="grid.args.color" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-input type="number" v-model="grid.size" :min="0" :max="20" />
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-select v-model="grid.type" class="m-2" placeholder="选择" size="small">
                        <el-option label="dot" value="dot"></el-option>
                        <el-option label="mesh" value="mesh"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, inject } from 'vue'
const invoke = inject('invoke')

const background = reactive({
    color: "#f5f5f5"
})

const grid = reactive({
    size: 10,
    visible: true,
    type: 'dot',
    args: {
        color: "#eeeeee"
    }
})

watch(background,(background)=>{
    invoke('drawBackground',background)
})
watch(grid,(grid)=>{
    invoke('drawGrid',grid)
})

</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>
<style>
.form-color-wrap .el-color-picker--small .el-color-picker__trigger {
    width: 51px;
}
</style>
