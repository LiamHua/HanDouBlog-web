import request from '@/utils/request'

export function getPolicy (username) {
  return request({
    url: '/file/getPolicy',
    method: 'get',
  })
}

export function upload (url, data) {
  return request({
    url: url,
    method: 'post',
    data: data,
    headers: {
      'x-oss-forbid-overwrite': true
    }
  })
}
