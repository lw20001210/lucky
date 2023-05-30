import { defineStore } from 'pinia'
export const mySpaceStore = defineStore('mySpace', {
 state: () => ({
   id:'',
  uid:'',
  content:{
    title:'',
    imgArr:[]
  },
  position:'',
  statu:'',
  createTime:''
 }),
})