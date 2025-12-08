
import laptop from "../assets/laptop.webp"
import monitor from "../assets/monitor.webp"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination,Autoplay,Navigation  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import HeroSlide from "./HeroSlide";






const HeroSection = () => {
  
 const featuredProducts = [
  {
    name: "Asus Rog Strix G15",
    rating: 4.5,
    category: "laptop",
    brand: "Asus",
    price: 90000,
    image: laptop,
    description:
      "The Asus Rog Strix G15 is a high-performance gaming laptop built for serious players. It features fast processing power, a smooth high-refresh display, and a powerful GPU that handles demanding games effortlessly. With advanced cooling technology, it stays efficient even during long gaming sessions. The RGB keyboard and sleek design add a modern, premium feel. Perfect for gamers, creators, and students who want power and style in one machine. Delivers exceptional speed, responsiveness, and reliability every day."
  },

  {
    name: "Lenovo Legion",
    rating: 4.2,
    category: "laptop",
    brand: "Lenovo",
    price: 90000,
    image: monitor,
    description:
      "The Lenovo Legion is crafted for performance, stability, and long-term durability. Its strong processor and well-optimized thermals ensure smooth multitasking, whether you’re gaming, editing videos, or working on heavy applications. The build quality feels premium and solid, giving it a professional look without sacrificing gaming aesthetics. Lenovo’s cooling system keeps temperatures under control even under continuous load. Ideal for students, creators, or gamers looking for dependable performance and value."
  },

  {
    name: "Logitech",
    rating: 4,
    category: "Mouse",
    brand: "Logitech",
    price: 9000,
    image: laptop,
    description:
      "This Logitech mouse offers exceptional comfort and precision for everyday use. Designed for long working hours, it fits naturally in the hand and reduces strain. The sensor provides highly accurate tracking for tasks like design, gaming, or productivity work. Its lightweight body and responsive clicks make it easy to handle in fast movements. Built with durable materials, it ensures long-lasting performance. A perfect choice for anyone who wants a smooth, reliable, and well-balanced mouse experience."
  },

  {
    name: "Asus Rog Strix G15",
    rating: 4.5,
    category: "laptop",
    brand: "Asus",
    price: 90000,
    image: laptop,
    description:
      "The Rog Strix G15 delivers blazing-fast performance, making it ideal for modern AAA games and creative workloads. Gaming visuals are smoother thanks to its high refresh rate and powerful GPU. The laptop includes intelligent cooling features that prevent overheating and maintain stable performance. With customizable RGB lighting, a sharp build, and premium materials, it stands out in both performance and style. Perfect for power users who need speed, efficiency, and an immersive gaming experience."
  },

  {
    name: "Lenovo Legion",
    rating: 4.2,
    category: "laptop",
    brand: "Lenovo",
    price: 90000,
    image: laptop,
    description:
      "The Lenovo Legion is engineered to deliver strong performance for multitasking, productivity, and gaming. With its reliable internals and balanced power management, it runs heavy apps smoothly without stutter. The Legion series is known for its excellent cooling system, ensuring consistent performance over long sessions. It has a clean, stylish look suitable for both professional and gaming environments. A great all-rounder that provides solid performance, long durability, and excellent value for money."
  },

  {
    name: "Logitech",
    rating: 4,
    category: "Mouse",
    brand: "Logitech",
    price: 9000,
    image: laptop,
    description:
      "This Logitech mouse combines comfort, precision, and durability in a compact design. It features responsive click feedback, making it perfect for both gaming and office tasks. The advanced sensor ensures fluid and accurate cursor movement across different surfaces. Designed to minimize fatigue, it supports long hours of use. Logitech's build quality ensures reliable, long-term performance. Ideal for users who want a smooth, comfortable, and high-precision mouse without any complications."
  }
];


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
      
        className="mySwiper"
        loop={true}
        spaceBetween={20} 
        slidesPerView={1}
        autoHeight={false}
        
      
      >
        {featuredProducts.map((item,i)=>(
           <SwiperSlide key = {i}><HeroSlide item={item} /></SwiperSlide>

        ))}


      </Swiper>





  
  
  )
}

export default HeroSection