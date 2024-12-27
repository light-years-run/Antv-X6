<template>
  <div class="content-layout">
    <div class="lint-layout">
      <p>选择链接</p>
      <el-radio-group v-model="currentType" @change="changeType" class="list-layout">
        <el-radio v-for="(item, index) in linkTypes" :key="index" :label=item.value>{{item.label}}</el-radio>
      </el-radio-group>
    </div>
    <div class="setting-layout">
      <div class="line-layout">
        <p class="line-title">链接名称</p>
        <p class="content-name">{{currentType}}</p>
      </div>
      <div class="line-layout">
        <p class="line-title">数据库类型</p>
        <el-select class="line-input-wrapper" v-model="data.sqltype" placeholder="请选择" size="large">
          <el-option style="width: 100%"
                     v-for="item in cellTypes"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
          />
        </el-select>
      </div>
      <div class="line-layout">
        <p class="line-title">数据库地址</p>
        <el-input class="line-input" v-model="data.sqltype" placeholder="请输入图元名"/>
      </div>
      <div class="actions-wrapper">
        <el-button type="danger" size="large" @click="clickedCancel">取消</el-button>
        <el-button type="primary" size="large" @click="clickedConfirm">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

    import {reactive, ref} from "vue";

    const props = defineProps(['params'])
    const emits = defineEmits(['onCancel', 'onConfirm'])

    const clickedCancel = () => {
        emits('onCancel', cellTypes)
    }
    const clickedConfirm = () => {
        emits('onConfirm', cellTypes)
    }

    const linkTypes = [
        {
            label: '链接1',
            value: '1',
        },
        {
            label: '链接2',
            value: '2'
        },
        {
            label: '链接3',
            value: '3'
        },
        {
            label: '链接4',
            value: '4'
        },

    ];
    const cellTypes = [
        {
            label: 'PI数据库',
            value: 'PISQL',
        },
        {
            label: 'PE数据库',
            value: 'PESQL'
        }
    ];
    const currentType = ref(1);
    const data = reactive({
        sqltype: '',
    })
    const changeType = () => {
        console.log(currentType + "111");
    }
</script>

<style scoped>
  .content-layout {
    display: flex;
    width: 672px;
    flex-direction: row;
  }
  
  .lint-layout {
    display: flex;
    width: 40%;
    flex-direction: column;
  }
  
  .setting-layout {
    display: flex;
    width: 60%;
    flex-direction: column;
  }
  
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    color: var(--el-color-primary);
  }
  
  .list-layout {
    margin-top: 10px;
    max-height: 100px;
  }
  
  .content-name {
    margin-top: 5px;
    padding-bottom: 5px;
  }
  
  .line-title {
    margin: 0px 10px 0px 0px;
  }
  
  .line-layout {
    display: flex;
    flex-direction: column;
    padding: 12px 0px;
  }
  
  .line-input-wrapper {
    height: 40px !important;
    margin-top: 10px;
    width: 75% !important;
  }
  .line-input {
    margin-top: 10px;
    height:40px !important;
    width: 75% !important;
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 20px;
    margin-right: 100px;
  }
</style>