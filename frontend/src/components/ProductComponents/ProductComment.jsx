import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const ProductComment = () => {
      const [iscommentSectionActive, setIsCommentSectionActive] = useState(false);
  console.log("active",iscommentSectionActive);

  // comment value stored
  const [comment, setComment] = useState("");
  console.log("comment",comment);

  // for like value store

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked,setIsDisliked] = useState(false);
  
  // when liked disliked should be off
  const likingFunction =()=>{
    setIsLiked(true);
    setIsDisliked(false);

  }
  const disLikingFunction =()=>{
    setIsDisliked(true);
    setIsLiked(false);

  }

  // to submit comment by user

  const submitComment = ()=>{

    // Here is where i want to store to the express Database.

    console.log("Data submitted to the mongodb", comment)


  }

  return (
   <div className = "flex flex-col gap-4 border-t-2 border-gray-500 pt-5 ">

  <h3>Comments</h3>

{/* No. of comments  showing  */}

  <span className = "text-sm lg:text-base text-font-light-white">322 comments</span> 
{/* write comment section */}
  <div className = "relative w-full rounded-md bg-tertiary-color dark:bg-dark-secondary-color ">
    {/* profile pic */}
    <div className = " absolute -top-10 left-1/2 -translate-x-1/2 lg:-top-5 lg:-left-12 w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
      <FaUser className = "text-lg lg:text-xl"/>
      {/* <span className ="absolute bottom-0 left-0 ">username</span> */}
    </div>
    <textarea onClick={()=>setIsCommentSectionActive(true)} className = "w-full h-[] text-font-light-white rounded-md outline-none px-5 py-2 resize-none caret-color-teal-500 overflow-y-auto" type="text" name="comment" id='comment'  value={comment} onChange={(e)=>setComment(e.target.value)}  placeholder="Write a comment"/>  
      {/* comment button ko lagi */}

      {iscommentSectionActive &&(
          <div className ={`${iscommentSectionActive?"transition-all duration-300 ease-in  opacity-100":"opacity-0"} w-full flex flex-row gap-5  justify-end pb-2 pr-2`}>
  <button className="text-sm text-font-light-white cursor-pointer">cancel</button>
      <button onClick={submitComment} className=" text-black bg-color-teal-500 dark:text-black px-4 py-2 rounded-md text-xl font-poppins cursor-pointer"><IoMdSend/></button>
    </div>
      )}
 
    {/* /comment button ko lagi */}

    {/* actual comments */}

    <div>
 

    </div>
    
      


  </div>

  {/* /write comment section ends */}

{/* all user commetn showing */}
     <div className ="flex flex-row gap-5 items-center">

  {/* user picture */}
      <div className = "w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
          <FaUser className = "text-lg lg:text-xl"/>
      </div>
      {/* user picture */}
      {/* user name and date of the comment */}
      <div className = "flex flex-col gap-1">
        <span className = "text-black dark:text-primary-color max-lg:text-sm text-base">User Name</span>
        <span className = "text-font-light-white text-xs">2004/05/06 </span>
      </div>


    </div>
{/* actual thing written by user */}
    <div className = "flex flex-col gap-2 w-full pl-14">
      <span className = "text-font-light-white">This is the comment written by user.</span>
      <div className = "flex flex-row gap-5">
        <span className = "flex flex-row gap-2 items-center justify-center">
        <AiOutlineLike onClick={likingFunction} className = {`${isLiked &&"text-color-teal-500"} text-lg cursor-pointer`} />
        {/* for the number of likes */}
        <p className ="text-xs text-font-light-white">12</p>
        </span>

        <span className = "flex flex-row gap-2 items-center justify-center">

        <AiOutlineDislike onClick={disLikingFunction} className = {`${isDisliked &&"text-color-teal-500"} text-lg cursor-pointer`} />
          {/* for the number of dislikes */}
        <p className ="text-xs text-font-light-white">10</p>
        </span>
      </div>
    </div>








</div>
  )
}

export default ProductComment