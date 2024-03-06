import React from 'react'
// import { deleteUser } from '../../function/commonFunctions'
const Actions = ({data, getUserData, updateUser}) => {
    // console.log(data)
  
    const handleDeleteClick = async() =>{
      console.log("Delete")
        // const res = await deleteUser(data[0])
        // console.log(res)
        // if(res){
        //     getUserData()
        // }
    }

    const handleUpdateClick =() =>{
        console.log("hi")
        // const res = updateUser(data)
        // if(res){
        //     getUserData()
        // }
    }

  return (
    <>
      <i className ="fa-solid fa-trash" style={{color:"red"}} onClick={handleDeleteClick} ></i>
      <i className ="fa-solid fa-pencil" style={{color:"#319ee8"}} onClick={handleUpdateClick} ></i> 
    </>
  )
}

export default Actions
