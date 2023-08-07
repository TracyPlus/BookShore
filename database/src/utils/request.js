import axios from "axios"
import Cookies from 'js-cookie'
// import { Mutex, MutexInterface } from 'async-mutex';

// import { message } from "antd";

// axios.defaults.baseURL = import.meta.env.VITE_API_SERVER
axios.defaults.baseURL = 'http://localhost:5174'
// axios.defaults.withCredentials=true

class ApiError extends Error {
  constructor(status, body) {
    super(`Api call failed: ${status}`)
    this.status = status
    this.body = body
  }
}

export function post(url, data = {}, config = {}) {
  let formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })
  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          sid: localStorage.getItem("sid"),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status < 200 || res.status >= 400) {
          // throw new ApiError(res.status, result.data)
          reject({ status: res.status, data: result.data })
        } else {
          // resolve(JSON.stringify(res.data))
          resolve(res.data)
        }
      })
      .catch((err) => {
        if (err.response) {
          // throw new ApiError(err.response.status, err.response.data)
          reject({ status: err.response.status, data: err.response.data })
        } else if (err.request) {
          // send error
          // throw new ApiError("request success, reponse fail", err.request)
          reject({ status: "request success, reponse fail", data: err.request })
        } else {
          // throw new ApiError("request fail", err.message)
          reject({ status: "request fail", data: err.message })
        }
      })
  })
}

export function get(url, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          sid: localStorage.getItem("sid"),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status < 200 || res.status >= 400) {
          reject(new ApiError(res.status, result.data))
        } else {
          resolve(res.data)
        }
      })
      .catch((err) => {
        if (err.response) {
          reject(new ApiError(err.response.status, err.response.data))
        } else if (err.request) {
          // send error
          reject(new ApiError("request success, reponse fail", err.request))
        } else {
          reject(new ApiError("request fail", err.message))
        }
      })
  })
}

export async function request(path, body = {}, operation = null) {
  if (operation) {
    body.operation = operation
  }
  return fetch(API_SERVER + path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      sid: localStorage.getItem("sid"),
    },
  })
    .then(async (response) => ({
      response,
      body: await response.json(),
    }))
    .then((result) => {
      if (result.response.status < 200 || result.response.status >= 400) {
        throw new ApiError(result.response.status, result.body)
      }
      return result.body
    })
    .catch((ex) => {
      if (ex instanceof ApiError) {
        message.error(ex.body.errMsg)
      }
      throw ex
    })
}
