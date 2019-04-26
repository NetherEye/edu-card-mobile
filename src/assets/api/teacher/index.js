let url = '/proxy';

export default {
	getApps: url + '/shortcut/mine', // 获取我的快捷方式
	getAllApps: url + '/shortcut/all', // 获取全部应用
	addApps: url + '/shortcut', // 保存app
	notice: url + '/iocapi/notice', // 通知
}