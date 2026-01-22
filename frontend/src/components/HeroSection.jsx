
import laptop from "../assets/laptop.webp"
import monitor from "../assets/monitor.webp"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination,Autoplay,Navigation  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroSlide from "./HeroSlide";
import { useProductStore } from "../utils/useProductStore";
import { useEffect } from "react";






const HeroSection = () => {


  const {products, loading} = useProductStore();

  const featuredProducts = (products || []).filter(product=>product.isFeatured);


  // below this this works but not good product won't change when toggled so basically take it from the products state and check if is is being featured or not
  // const {getFeaturedProducts, featuredProducts, loading} = useProductStore();

  // useEffect(()=>{
  //   getFeaturedProducts();
    
  // },[]);

  // console.log(featuredProducts);

  

  return (

     <Swiper
        pagination={{
          dynamicBullets: true,
          clickable:true
        }}
        modules={[Pagination,Autoplay,Navigation]}
        speed={1000}
          effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{delay:3000, disableOnInteraction:false}}
        // navigation={true} 
      
        className="mySwiper heroSwiper"
        loop={true}
        spaceBetween={20} 
        slidesPerView={1}
        autoHeight={false}
        
      
      >
        {(featuredProducts || []).map((item,i)=>(
           <SwiperSlide className = "heroSwiperSlide" key = {i}><HeroSlide item={item} loading={loading} /></SwiperSlide>

        ))}


      </Swiper>





  
  
  )
}

export default HeroSection