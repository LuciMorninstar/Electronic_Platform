import React, { useState } from 'react'
import WidthWrapper from '../components/WidthWrapper'
import Filter from '../components/Filter'

const FilterPage = () => {



  return (
  <WidthWrapper>

    <section className = " w-full  mt-26 flex items-center justify-center ">

  <Filter setFilters/>
    
    </section>

  </WidthWrapper>
  )
}

export default FilterPage