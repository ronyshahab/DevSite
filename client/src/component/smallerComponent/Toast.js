'use client'

import {toast} from 'react-toastify'
export  {ToastContainer} from 'react-toastify'

export const Alert = ( type ,data, duration='3000', theme ='light') => toast (data, {
    type: type,
    autoClose:duration,
    hideProgressBar: false,
    closeOnClick : true,
    pauseOnHover: true,
    draggable: true,
    theme: theme  
})

