import axios from 'axios'
import { storage } from '@/utils/storage'
import { start, close } from '@/utils/nprogress'

export const request = (options: any) => {
  return new Promise((resolve, reject) => {
    const service = axios.create({
      baseURL: 'https://1862232491914219.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy',
      timeout: 80000,
    })

    // 请求拦截器
    service.interceptors.request.use(
      (config: any) => {
        start()
        const token: string = storage.get('E-Token')
        if (token) {
          config.headers['E-Token'] = token
          config.headers.Authorization = +token
        }
        return config
      },
      (error) => {
        console.log('出错了!', error)
        Promise.reject(error).then((r) => console.log(r))
      },
    )

    // 响应拦截器
    service.interceptors.response.use(
      (response) => {
        close()
        const token = response.headers['e-token']
        if (token) {
          storage.set('E-Token', token)
        }
        return response
      },
      (error) => {
        close()
        console.log('err' + error)
        return Promise.reject(error)
      },
    )

    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
