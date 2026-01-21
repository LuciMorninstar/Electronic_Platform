import React from 'react'
import Compare from '../components/Compare'
import WidthWrapper from '../components/WidthWrapper'
import { useParams } from 'react-router-dom'


const ComparePage = () => {

    const {id} = useParams();
    console.log(id);
  


  return (
     <WidthWrapper>

    <section className = " w-full  mt-26 flex items-center justify-center ">

    <Compare/>
    
    </section>

  </WidthWrapper>
  )
}

export default ComparePage