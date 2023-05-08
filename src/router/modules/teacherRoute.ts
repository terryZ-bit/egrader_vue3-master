// @ts-ignore
export default [
  {
    path: 'teacherHomework',
    name: 'teacherHomework',
    component: () => import('@/pages/homework/TeacherHomework.vue'),
  },
  {
    path: 'teacherCourse',
    name: 'teacherCourse',
    component: () => import('@/pages/course/TeacherCourse.vue'),
  },
  {
    path: 'teacherNoticePage',
    name: 'teacherNoticePage',
    component: () => import('@/pages/notice/TeacherNoticePage.vue'),
  },
  {
    path: 'teacherFolderManage',
    name: 'teacherFolderManage',
    component: () => import('@/pages/courseFolder/teacherFolderManage.vue'),
  },
  {
    path: 'teacherNewHomework',
    name: 'teacherNewHomework',
    component: () => import('@/pages/homework/TeacherNewHomework.vue'),
  },
  {
    path: 'teacherHomeworkDetail/:teacherHomeworkId',
    name: 'teacherHomeworkDetail',
    component: () => import('@/pages/homework/TeacherHomeworkDetail.vue'),
    props: true,
  },
  {
    path: 'teacherStudentManage',
    name: 'teacherStudentManage',
    component: () => import('@/pages/course/TeacherStudentManage.vue'),
  },
  {
    path: 'teacherUserInfo',
    name: 'teacherUserInfo',
    component: () => import('@/pages/userInfo/teacherUserInfo.vue'),
  },
  {
    path: 'teacherWatchHomework/:teacherHomeworkName/:teacherHomeworkId',
    name: 'teacherWatchHomework',
    component: () => import('@/pages/homework/TeacherWatchHomework.vue'),
    props: true,
  },
  {
    path: 'teacherScoreHomework/:studentName/:homeworkId',
    name: 'teacherScoreHomework',
    component: () => import('@/pages/homework/TeacherScoreHomework.vue'),
    props: true,
  },
  {
    path: 'teacherWatchReliability/:teacherHomeworkId',
    name: 'teacherWatchReliability',
    component: () => import('@/pages/homework/TeacherWatchReliability.vue'),
    props: true,
  },
  {
    path: 'teacherCheckStuRate/:studentName/:studentId/:teacherHomeworkId',
    name: 'teacherCheckStuRate',
    component: () => import('@/pages/homework/TeacherCheckStuRate.vue'),
    props: true,
  },
]
