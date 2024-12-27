import {defineStore} from 'pinia'

const useHeaderHandlerStore = defineStore('headerHandler', () => {

    const showGlobalDialog: DialogFunctionType = (type, params) => {};
    const toolsStrategy =  (title: string) => {}

    return {
        showGlobalDialog,
        toolsStrategy,
    };
});

export { useHeaderHandlerStore };