import { defineStore } from 'pinia'
export const mySpaceStore = defineStore('mySpace', {
 state: () => ({
  id:'',
  content:{
    title:'',
    imgArr:[]
  },
  statu:'',
  createTime:''
 }),
})