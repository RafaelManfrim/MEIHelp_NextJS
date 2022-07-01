import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: any[] = []

export const apiNoAuth = axios.create({
    baseURL: 'http://0.0.0.0:8001/api'
})

export const api = axios.create({
    baseURL: 'http://0.0.0.0:8001/api',
    headers: {
        Authorization: `Bearer ${cookies['meihelp.accessToken']}`
    }
})

api.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        if (error.response?.data?.code === 'token_not_valid') {
            cookies = parseCookies()
            const { 'meihelp.refreshToken': refreshToken } = cookies
            const originalConfig = error.config

            if (!isRefreshing) {
                isRefreshing = true

                api.post('/token/refresh/', { refresh: refreshToken }).then(response => {
                    const newToken = response.data.access

                    setCookie(undefined, 'meihelp.accessToken', newToken, {
                        maxAge: 1000 * 60 * 5,
                        path: '/'
                    })

                    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                    failedRequestsQueue.forEach(req => req.resolve(newToken))
                    failedRequestsQueue = []

                }).catch(err => {
                    failedRequestsQueue.forEach(req => req.reject(err))
                    failedRequestsQueue = []

                }).finally(() => {
                    isRefreshing = false
                })
            }

            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    resolve: (token: string) => {
                        if (originalConfig.headers) {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`
                            resolve(api(originalConfig))
                        }
                    },
                    reject: (err: AxiosError) => {
                        reject(err)
                    }
                })
            })

        } else {
            destroyCookie(undefined, 'meihelp.accessToken')
            destroyCookie(undefined, 'meihelp.refreshToken')
            if (!Router.asPath.startsWith('/login')) {
                Router.push('/login')
            }
        }
    }

    return Promise.reject(error)
})