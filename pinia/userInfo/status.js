import {
	defineStore
} from 'pinia';
import request from "@/utils/request.js"
import {
	showMsg
} from '../../utils/Toast';
export const statusStore = defineStore('status', {
	state: () => ({
		userList:[],//好友列表
		socket:null,
		avatar:'',//chat界面朋友头像,
		groupUserIds:[],//群聊成员id
	}),
})