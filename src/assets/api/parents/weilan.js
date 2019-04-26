let url = '/proxy';

export default {
	weilan: url + '/iocapi/fence', // 围栏操作
	showWeilan: url + '/iocapi/fence/show', // 显示围栏
	listen: url + '/iocapi/listen', // 启动监听（新）
	call: url + '/iocapi/call', //反向呼叫（新）
}