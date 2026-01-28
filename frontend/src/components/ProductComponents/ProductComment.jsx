  import React from 'react'
  import { useState } from 'react'
  import { FaUser } from 'react-icons/fa';
  import { AiOutlineLike } from "react-icons/ai";
  import { AiOutlineDislike } from "react-icons/ai";
  import { useCommentStore } from '../../utils/useCommentStore.js';
  import { useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';
import CryingAnimation from '../CryingAnimation.jsx';
import { MdDelete } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import gsap from "gsap"
import { useLayoutEffect } from 'react';
import { useRef } from 'react';

  const ProductComment = () => {

    const {id:productId} = useParams(); 
    // console.log("id is coming",productId );

    const {getAllComments, loading,comments,addComment, removeComment, addLike,addunLike} = useCommentStore(); 

    useEffect(()=>{
     try {
      getAllComments(productId);
      console.log("yes");
      
     } catch (error) {
      console.log("Error fetching comments", error);
      
     }

    },[productId])
    






        const [iscommentSectionActive, setIsCommentSectionActive] = useState(false);
    console.log("active",iscommentSectionActive);

    // comment value stored
    const [text, setText] = useState("");

    const addingComment = async(e,productId,text)=>{
      try {
        await addComment(productId,{text});
        getAllComments(productId);
        setText("");

        
      } catch (error) {
        toast.error("Error Adding comment", error);
        
      }

    }

      const removingFunction = async(e,productId, commentId)=>{
      e.stopPropagation();
          e.preventDefault();
        
      if(!commentId || !productId) return;

     await removeComment(productId,commentId);
     
        await getAllComments(productId);
        toast.success("Deleted");

    
    }


    // for like value store


    
    // when liked disliked should be off
    const likingFunction = async(e,commentId)=>{
      e.stopPropagation();
      e.preventDefault();

      if (!commentId) return; // prevents sending undefined to backend
   await addLike(commentId);
   await getAllComments(productId);

 

    }
    const disLikingFunction =async(e,commentId)=>{

        e.stopPropagation();
      e.preventDefault();
        
      if(!commentId) return;

     await addunLike(commentId);
        await getAllComments(productId);

    

    }


// gsap animation

const headingRef = useRef(null);
const commentLengthRef = useRef(null);
const commentSectionRef = useRef(null);
const commentRefs = useRef([]);

const addCommentRef = (el)=>{
  if(el && !commentRefs.current.includes(el)){
    commentRefs.current.push(el);

  }
}

useLayoutEffect(()=>{
  if(!comments || comments.length<0  ) return;

  const ctx = gsap.context(()=>{

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:headingRef.current,
        start:"top 90%",
        toggleActions:"play none none reverse"
      }
    });

    tl.fromTo(headingRef.current,
      {opacity:0,y:18,scale:1.2},
      {opacity:1,y:0,duration:0.6,scale:1,ease:"power1.inOut"}
    )
    
    tl.fromTo(commentLengthRef.current,
      {opacity:0,y:30},
      {opacity:1,y:0,duration:0.6,ease:"power1.inOut"}
    )
    tl.fromTo(commentSectionRef.current,
      {opacity:0,y:30},
      {opacity:1,y:0,duration:0.6,ease:"power1.inOut"}
    )
    tl.fromTo(commentRefs.current,
      {opacity:0,y:30},
      {opacity:1,y:0,duration:0.6,ease:"power1.inOut"}
    )
    



    
  })

  return ()=>ctx.revert();
},[comments])









    return (
    <div className = "flex flex-col gap-4 border-t-2 border-gray-500 pt-5 ">

    <h3 ref={headingRef}>Comments</h3>

  {/* No. of comments  showing  */}

    <span ref={commentLengthRef} className = "text-sm lg:text-base text-font-light-white">{comments?.length} comments</span> 
  {/* write comment section */}
    <div ref={commentSectionRef} className = "relative w-full rounded-md bg-tertiary-color dark:bg-dark-secondary-color ">
      {/* profile pic */}
      <div className = " absolute -top-10 left-1/2 -translate-x-1/2 lg:-top-5 lg:-left-12 w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
        <FaUser className = "text-lg lg:text-xl"/>
        {/* <span className ="absolute bottom-0 left-0 ">username</span> */}
      </div>
      <textarea id="commentSection" onClick={()=>setIsCommentSectionActive(true)} className = "w-full h-[] text-font-light-white rounded-md outline-none px-5 py-2 resize-none caret-color-teal-500 overflow-y-auto" type="text" name="text"   value={text} onChange={(e)=>setText(e.target.value)}  placeholder="Write a comment"/>  
        {/* comment button ko lagi */}

        {iscommentSectionActive &&(
            <div  className ={`${iscommentSectionActive?"transition-all duration-300 ease-in  opacity-100":"opacity-0"} w-full flex flex-row gap-5  justify-end pb-2 pr-2`}>
    <button onClick={()=>setIsCommentSectionActive(false)} className="text-sm text-font-light-white cursor-pointer">cancel</button>
        <button onClick={(e)=>addingComment(e,productId,text)} className=" text-black bg-color-teal-500 dark:text-black px-4 py-2 rounded-md text-xl font-poppins cursor-pointer"><IoMdSend/></button>
      </div>
        )}
  
      {/* /comment button ko lagi */}

      {/* actual comments */}

      <div>
  

      </div>
      
        


    </div>

    {/* /write comment section ends */}

  {/* all user commetn showing */}

{
  comments && comments.length > 0 ? (
    comments.map((comment, i) => (
      <div ref={addCommentRef} key={i} className="flex flex-col gap-2 ">
        <div className="flex flex-row gap-5 items-center">
          <div className="w-10 h-10 rounded-full bg-tertiary-color dark:bg-dark-secondary-color flex flex-col justify-center items-center">
            <FaUser className="text-lg lg:text-xl" />
          </div>
          <div className="flex flex-col gap-1">
          
              <span className="text-black dark:text-primary-color max-lg:text-sm text-base">
                {comment?.user?.fullName || "user"}
              </span>
            
       
            <span className="text-font-light-white text-xs">
              P{comment?.date ? new Date(comment.date).toLocaleDateString() : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full pl-15">
          <span className="text-font-light-white">{comment?.text}</span>
          <div className="flex flex-row gap-5">
            <span className="flex flex-row gap-2 items-center justify-center">
              <AiOutlineLike
                onClick={(e) => likingFunction(e, comment?._id)}
                className="cursor-pointer"
              />
              <p className="text-xs text-font-light-white">{comment?.like?.length}</p>
            </span>
            <span className="flex flex-row gap-2 items-center justify-center">
              <AiOutlineDislike
                onClick={(e) => disLikingFunction(e, comment?._id)}
                className="cursor-pointer"
              />
              <p className="text-xs text-font-light-white">{comment?.unlike?.length}</p>
            </span>
            <span className="flex flex-row gap-2 items-center justify-center">
              <FiDelete
                onClick={(e) =>removingFunction(e, productId, comment?._id)}
                className="cursor-pointer"
              />
            
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
      <div className = " w-full pb-10 pt-10 flex flex-col gap-2 justify-center items-center">
        <h3 className = "">Be the first to comment</h3>
        <CryingAnimation/>
      </div>
  )
}

  








  </div>
    )
  }

  export default ProductComment