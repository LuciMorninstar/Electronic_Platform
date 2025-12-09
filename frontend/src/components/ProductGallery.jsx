import React from 'react'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import gallery5 from "../assets/gallery5.png"
import gallery6 from "../assets/gallery6.png"
import gallery7 from "../assets/gallery7.png"
import gallery8 from "../assets/gallery8.png"
import gallery9 from "../assets/gallery9.png"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ProductGallery = () => {

    // fetch gallery
    const galleryItems =[gallery5, gallery6, gallery7, gallery8, gallery9]

    

      const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>

    {/* topSwiper */}

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
            galleryItems.map((image,i)=>(
                <SwiperSlide key={i} className = "galleryTopSwiperSlide">
                    <div className = "w-full h-full max-lg:px-6"> 
                    <img src={image} className = "w-full h-full" alt='image'/>
                    </div>
                </SwiperSlide>
            ))

        }


  
     
      </Swiper>


{/* bottom swiper */}


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
        {galleryItems.map((image)=>(

            <SwiperSlide className ="galleryBottomSwiperSlide">
                <div className = "w-full h-full ">

          <img src={image} className ="w-full h-full" alt="image"  />
                </div>
        </SwiperSlide>

        ))}
      
   
      </Swiper>

      </>


   
  )
}

export default ProductGallery