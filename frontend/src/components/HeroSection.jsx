
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
import gsap from "gsap"






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
  onSlideChange={(swiper) => {
    // Use swiper.slides[swiper.activeIndex] safely
    const currentSlide = swiper.slides[swiper.activeIndex];
    if (!currentSlide) return;

    const img = currentSlide.querySelector(".gsapImages");
    const title = currentSlide.querySelector(".gsapTitles");
    const rating = currentSlide.querySelector(".gsapRatings");
    const desc = currentSlide.querySelector(".gsapDescriptions");
    const button = currentSlide.querySelector(".gsapButtons");
    const addToCart = currentSlide.querySelector(".gsapAddToCarts");
    const addToWishlist = currentSlide.querySelector(".gsapAddToWishlists");

    if (!img || !title || !desc ) return;

    // Kill any previous animations first(Once swiper all slides finishes and start then animation don't apply so we need to kill it first)
    gsap.killTweensOf(img,title,desc,button,addToCart,addToWishlist);

    // Animate every time the slide becomes active
    const tl = gsap.timeline();
    tl.fromTo(img,{scale:1.4, opacity:0},{scale:1,opacity:1,duration:1.5});
    tl.fromTo(title,{y:100, opacity:0},{y:0,opacity:1,duration:1.3,delay:0.2}, "-=1.4");
    tl.fromTo(rating,{y:100, opacity:0},{y:0,opacity:1,duration:1.3,delay:0.2}, "-=1.5");
    tl.fromTo(desc,{y:50, opacity:0},{y:0,opacity:1,duration:1,delay:0.4},"-=1.3");
    tl.fromTo(button,{y:50, opacity:0},{y:0,opacity:1,duration:1,delay:0.4},"-=1.3");
    tl.fromTo(addToCart,{y:50, opacity:0},{y:0,opacity:1,duration:1,delay:0.4},"-=1.3");
    tl.fromTo(addToWishlist,{y:50, opacity:0},{y:0,opacity:1,duration:1,delay:0.4},"-=1.2");

  

  }}

     
        pagination={{
          dynamicBullets: true,
          clickable:true
        }}
        modules={[Pagination,Autoplay,Navigation]}
        speed={1800}
          effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{delay:4000, disableOnInteraction:false, waitForTransition: false,}}
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