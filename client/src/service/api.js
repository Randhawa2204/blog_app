import axios from 'axios'
import { API_NOTIFICATION_MESSAGES , SERVICE_URLS } from '../constants/config'
import { getAccessToken , getType} from '../utils/common-utils'

const APP_URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL : APP_URL,
    timeout : 8000,
    headers : {
        "Accept" : "application/json",
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        if(config.Type.params){
            config.params = config.Type.params
        }else if(config.Type.query){
            config.url = config.url + '/' + config.Type.query
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function (res) {
        //Global loader can be stopped here
        return processResponse(res)
    },
    function (error) {
        //Global loader can be stopped here
        return Promise.reject(processResponseError(error))
    }
)

///Response Functions
const processResponse = (res) => {
    if (res?.status === 200) {
        return {isSuccess : true , data : res.data}
    }else {
        return {
            isFaliure : true,
            status : res?.status,
            msg : res?.msg,
            code : res?.code
        }
    }
}

const processResponseError = (error) => {
    if(error.response){
        //request made and server responded with status code
        // that falls out of the range 2.x.x
        console.log('ERROR IN RESPONSE' , error.toJSON())
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFaliure,
            code : error.response.status
        }
    }else if(error.request){
        //Request made but no response was received
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.requestFailure,
            code : ""
        }
    }else{
        //Something happeded to setting up the request that triggers an error
        return {
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.networkFaliure,
            code : ""
        }
    }
}

//////////////////////////
///////----------////////

const API = {}

for (const [key,value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body , showUploadProgress , showDownloadProgress) => 
        axiosInstance({
            method : value.method,
            url : value.url,
            data : value.method === 'DELETE' ? {} : body,
            responseType : value?.responseType,
            headers : {authorization : getAccessToken(), ...value?.headers},
            Type : getType(value , body),
            onUploadProgress : function(progressEvent) {
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress : function (progressEvent) {
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
}

export {API} ;