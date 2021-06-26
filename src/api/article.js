import request from '@/utils/request'

// 查询博客列表
export function listArticle (nickname, pageNo, pageSize) {
  return request({
    url: '/article/listArticle/' +nickname,
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}

// 根据id查询博客
export function getArticleById(id) {
  return request({
    url: '/article/getArticle/' + id,
    method: 'get'
  })
}

export function addArticle(article) {
  return request({
    url: '/article/addArticle',
    method: 'post',
    data: article
  })
}

export function getArticleNum(nickname) {
  return request({
    url: '/article/getArticleNum',
    method: 'get',
    params: {
      nickname: nickname
    }
  })
}

export function searchArticle(name) {
  return request({
    url: '/article/searchArticle',
    method: 'get',
    params: {
      name: name
    }
  })
}