import React, { useState } from 'react'
import WidthWrapper from '../components/WidthWrapper'
import Filter from '../components/Filter'

const FilterPage = () => {

    const [filters,setFilters] = useState({category:"", brand:"",minPrice:"", maxPrice:"", rating:"",releaseDate:""});
    
  return (
  <WidthWrapper>

    <section className = " w-full  mt-26 flex items-center justify-center ">

  <Filter/>
    
    </section>

  </WidthWrapper>
  )
}

export default FilterPage