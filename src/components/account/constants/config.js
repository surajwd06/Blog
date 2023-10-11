export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading',
        message: 'Data is being loaded please wait '
    },
    success: {
        title: 'Success',
        message: 'Data is successfully loaded '
    },
    responseFailure: {
        title: "Error",
        message: 'An error accured while fatching response from the server plase try again'
    },
    requestFailure: {
        title: 'Error',
        message: "An error occured passing request data"
    },
    networkError: {
        title: "Error",
        message: "unable to connect with the server plase checked internet connection"
    }
}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' }
}