import request from '@/utils/request'

export function logout () {
  return request({
    url: '/user/logout',
    method: 'put'
  })
}

export function getUserInfo () {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}

export function getUserInfoByNickname (nickname) {
  return request({
    url: '/user/getUserByNickname',
    method: 'get',
    params: {
      nickname: nickname
    }
  })
}