/**
 * 存放base子页面路由
 */
export default [
  {
    path: 'stuHomework',
    name: 'stuHomework',
    component: () => import('@/pages/homework/StuHomework.vue'),
  },
  {
    path: 'stuHomeworkDetail/:teacherHomeworkId',
    name: 'stuHomeworkDetail',
    component: () => import('@/pages/homework/StuHomeworkDetail.vue'),
    props: true,
  },
  {
    path: 'stuNotice/',
    name: 'stuNotice',
    component: () => import('@/pages/notice/StuNoticePage.vue'),
  },
  {
    path: 'stuRateEach/:rateParam',
    name: 'stuRateEach',
    component: () => import('@/pages/homework/StuRateEach.vue'),
    props: true,
  },
  {
    path: 'StuRateDetail/:rateParam/:homeworkParam',
    name: 'stuRateDetail',
    component: () => import('@/pages/homework/StuRateDetail.vue'),
    props: true,
  },
  {
    path: 'studentFolderManage',
    name: 'studentFolderManage',
    component: () => import('@/pages/courseFolder/studentFolderManage.vue'),
    props: true,
  },
  // TODO: 每新增一个base页面的子页面，在这里添加
]
