import React, { useEffect, useState } from 'react'

const TyperWriter = ({dataArray, delay}) => {

    const [text,setText] = useState('')
    const [isDelete, setIsDelete] = useState(false);
    const [loop, setLoop] = useState(0);
    const changeTextValue= async() =>{
        const i = loop % dataArray.length

        const currentWord = dataArray[i]

        if (!isDelete) {
            setText(currentWord.substring(0, text.length + 1));
        }else{

            setText(currentWord.substring(0, text.length - 1));
        }
        
        
        if(currentWord == text){
            await new Promise(resolve => setTimeout(resolve, delay ));
            setIsDelete(true)
        }
        else if(isDelete && text==''){
            setTimeout(() => {
                setIsDelete(false);
                setLoop(loop + 1);
            }, delay/2);
        }
    }
    

    useEffect(() => {
        const initialRun = setTimeout(changeTextValue, delay /12);

        return () => {
            clearTimeout(initialRun);
        };
    }, [text, isDelete, loop]);
  return (
    <>
      {text}
    </>
  )
}

export default TyperWriter
