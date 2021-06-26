import request from '@/utils/request'

export function getCategoryList () {
  return request({
    url: '/category/getCategoryList',
    method: 'get',
  })
}

export function addCategory (category) {
  console.log(category)
  return request({
    url: '/category/addCategory',
    method: 'post',
    data: category
  })
}

export function getCategoryNum(nickname) {
  return request({
    url: '/category/getCategoryNum',
    method: 'get',
    params: {
      nickname: nickname
    }
  })
}