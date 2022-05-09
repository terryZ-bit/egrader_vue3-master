import { request } from '@/utils/request'

export function createHomeworkBody(
  teacherId,
  name,
  homeworkIntroduction,
  scoreMax,
  scoreDetailFlag,
  rateEachFlag,
  endTime,
  classList,
) {
  return request({
    url: 'homework.LATEST/create_homework',
    method: 'POST',
    data: {
      teacher_id: teacherId,
      name: name,
      homework_introduction: homeworkIntroduction,
      score_max: scoreMax,
      rate_each_flag: rateEachFlag,
      score_detail_flag: scoreDetailFlag,
      end_time: endTime,
      class_id_list: classList,
    },
  })
}
