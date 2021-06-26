import request from '@/utils/request'

export function getSMSCode (username) {
  return request({
    url: '/auth/getSMS/' + username,
    method: 'get',
  })
}

export function loginWithSMS (loginForm) {
  return request({
    url: '/auth/loginWithSms',
    method: 'post',
    data: loginForm
  })
}