import { SET_CURRENT_EDUCATION_FORM_DATA, SET_CURRENT_USER_PROFILE_DATA } from "../types/types";


const initialEducationFormData = {
    current:[]
}
const initialUserProfileData ={}


export const setEducationFormDataReducer = (state= initialEducationFormData, action)=>{
    const {payload, type} = action

    switch (type) {
        case SET_CURRENT_EDUCATION_FORM_DATA:
            return {
                ...state,
                current:payload.dataArray
            }
        
        default:
            return state
    }
}
export const setCurrentUserProfileDataReducer = (state= initialUserProfileData, action)=>{
    const {payload, type} = action
    switch (type) {
        case SET_CURRENT_USER_PROFILE_DATA:
            // console.log("hi",payload.data.data)
            state = payload.data.data
            return state
        
        default:
            return state
    }
}


