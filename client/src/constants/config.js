 //API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : "Loading...",
        message : 'Data is being loading. Please Wait.'
    },
    success : {
        title : "Success",
        message : "Data Successfully Loaded"
    },
    responseFaliure : {
        title : "Error",
        message : "An Error occured while fetching the data from the server. Please Try Again."
    },
    requestFailure : {
        title : "Error",
        message : "An error occured while parsing request data."
    },
    networkFaliure : {
        title : "Error",
        message : "Unable to connect to the server. Please check your network conncetivity and try again later."
    }
}


//Service call example --> SERVICE_CALL : { url : '' , method : 'GET/POST/PUT/DELETE' , params : true/false , query : true/false}
export const SERVICE_URLS = {
    userSignup : { url : '/signup' , method : "POST"},
    userLogin : { url : '/login' , method : "POST"},
    uploadFile : {url : '/file/upload' , method : "POST" , headers : {"content-type" : "multipart/form-data"}},
    postSubmit : {url : '/create' , method  : "POST"},
    getAllPosts : {url : '/posts' , method : "GET" , params : true},
    getPostById : {url : '/post' , method : "GET" , query : true },
    updatePost : {url : '/update' , method : "PUT" , query : true},
    deletePost : {url : '/delete' , method : "DELETE" , query : true},
    addComment : {url : '/add/comment' , method : "POST"},
    getComments : {url : '/comments' , method : "GET" , query : true},
    deleteComment : {url : '/remove/comment' , method : "DELETE" , query : true }
}