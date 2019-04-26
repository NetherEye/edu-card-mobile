let url = '/proxy';

export default {
	getList: url + '/teacher/praises', // 获取表扬榜
	getCardList: url + '/teacher/praisesCard', // 获取表扬卡
	getStudent: url + '/teacher/studentByClassId', // 学生列表
	card: url + '/teacher/praisesCard', // 表扬卡操作
}