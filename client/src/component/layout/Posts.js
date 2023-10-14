import React from 'react'
import { Link } from 'react-router-dom'

const Posts = () => {

    return (
    <div>
      <div className="container">
      <div className="postsIntro">

         <h2 className='text-primary'>

         <p >
          Posts
         </p>
         </h2>
         <p><i className="fa-sharp fa-solid fa-people-simple"></i> Welcome to community</p>
         <p className='btn btn-primary' style={{color:"white",width:"100vw",marginRight:"160px"}}>Say something</p>
         <textarea name="" id="" cols="30" rows="5" placeholder='Create Post' style={{width:"90vw", height:"28vh", marginTop:"1em" , padding:"1em"}}></textarea>
         <input type="submit" value="Submit" className='btn btn-primary' />
      </div>
      <div className="postContainer">
        <div className="postImg">
          <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='round-img profileImg' style={{marginTop:"2em"}} alt="" />
          <p className='text-primary'> John Doe</p>
        </div>
        <div className="postDetail">
          <div className="postText">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum doloremque, dolorum mollitia tempore neque cum iusto autem velit impedit aliquam magni voluptatum cupiditate et cumque tenetur. Libero eligendi nisi quasi.</p>
          </div>
          <div className="postCount">
            <button><i class="fa-solid fa-thumbs-up"></i>4</button>
            <button><i class="fa-solid fa-thumbs-down"></i></button>
            <Link to={"/post"}> <button className='btn btn-primary' >Discussion</button> </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Posts
