import axios from '@/utils/requestFile.js'


export const uploadApi = (url,formData,contentType,onUploadProgress,) => {
  return axios({
    url: url,
    method: 'GET',
    data: formData,
    // headers:{
    //   // 'Content-Type': 'multipart/form-data'
      "content-type": contentType,
    //   // 'Content-Length': contentLength
    // },
    onUploadProgress,
    // onUploadProgress, // 上传进度回调函数 onUploadProgress(ev)
  });
};

