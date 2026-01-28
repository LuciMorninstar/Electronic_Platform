import React from 'react'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import gsap from "gsap"


const ProductGallery = ({images}) => {

    // fetch gallery
    // const galleryItems =[gallery5, gallery6, gallery7, gallery8, gallery9]

    

      const [thumbsSwiper, setThumbsSwiper] = useState(null);

        if (!images || images.length === 0) return null; // fallback


  return (
    <>

    {/* topSwiper */}

    {!images ? "No image here":
         <Swiper
        style={{
          '--swiper-navigation-color': 'white',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={5}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 galleryTopSwiper"
      >

        {
            images?.map((image,i)=>(
                <SwiperSlide key={i} className = "galleryTopSwiperSlide">
                    <div className = "w-full h-full max-lg:px-6"> 
                    <img src={image.url} className = "w-full h-full object-cover object-center" alt='image'/>
                    </div>
                </SwiperSlide>
            ))

        }


  
     
      </Swiper>
    }

    


{/* bottom swiper */}


      {
        !images ? "No image here": 
       <Swiper
          style={{
         
          '--swiper-pagination-color': '#000',
          '--swiper-navigation-left':'left-0',
        }}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={15}
        slidesPerView={3}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper galleryBottomSwiper"
      >
        {images.map((image)=>(

            <SwiperSlide className ="galleryBottomSwiperSlide">
                <div className = "w-full h-full ">

          <img src={image.url} className ="w-full h-full object-cover object-center" alt="image"  />
                </div>
        </SwiperSlide>

        ))}
      
   
      </Swiper>
}

      </>


   
  )
}

export default ProductGallery