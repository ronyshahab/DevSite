import React from 'react'

const ShowPost = ({content}) => {
  return (
    <div className='showPostContainer' dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default ShowPost
