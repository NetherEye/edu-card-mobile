let url = '/proxy';

export default {
	notice: url + '/iocapi/notice', // 通知
	noReadCount: url + '/iocapi/notice/unread', // 未阅读数量
	allRead: url + '/iocapi/notice/oneread',
	delNotice: url + '/iocapi/notice/del', // 删除通知
}