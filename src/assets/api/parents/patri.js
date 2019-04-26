let url = '/proxy';

export default {
	classSchedule: url + '/patriarch/classSchedule', // 1.查询课表
	classdutyRoster: url + '/patriarch/dutyRoster', // 2.查询班级值日
	getscore: url + '/officeapi/student/score', // 获取孩子成绩列表
	getranking: url + '/officeapi/student/ranking', // 获取孩子成绩列表
}
	