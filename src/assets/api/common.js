let url = '/proxy';

export default {
	isLogin: url + '/api/isLogin',
	logout: url + '/api/logout',
	getClassByTeacher: url + '/basic/teacher/class',
	getDepartment: url + '/basic/school/department', // 获取学校下部门
	getTeacher: url + '/basic/department/teacher', // 获取部门下教职工
	getClass: url + '/basic/grade/class', // 获取年级下班级
	getSubject: url + '/basic/grade/course', // 获取年级下学科信息
	upload: url + '/upload/file', // 上传
	getChild: url + '/basic/parent/student', // 获取孩子
	uplodaPhoto: url + '/account/photo', // 上传头像
	accountreset: url + '/account/reset', // 修改密码
	accountreset: url + '/account/reset', // 修改密码
	cardPassword: url + '/iocapi/m1/excesspwd', // 查询卡密码
}