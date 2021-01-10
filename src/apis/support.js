import { URL_BASE } from './'
import axios from 'axios'

// notice: 공지사항
// new: 
export const getPosts = async (page, category) => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/post/list/${category}?page=${page}&keyword=`,
    headers: {}
  });

  return data;
};

// 해당 게시글 정보 가져오기
export const getPost = async (id) => {
  let {status, data} = await axios({
    method: "GET",
    url: `${URL_BASE}/post?id=${id}`,
    headers: {}
  });

  return data;
};