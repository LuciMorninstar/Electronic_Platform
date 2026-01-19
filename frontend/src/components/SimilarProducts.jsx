import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

import { useProductStore } from "../utils/useProductStore";
import { useCartStore } from "../utils/useCartStore";
import WidthWrapper from "./WidthWrapper";
import { useParams } from "react-router-dom";


const SimilarProducts = () => {

const {id:productId} = useParams();

  const { addToWishlist, addToCart, getAllCartProducts } = useCartStore();

  
const {similarProducts, getSimilarProducts, loading} = useProductStore();


  useEffect(() => {

      getSimilarProducts(productId);
  }, [productId]);



  const handleWishlist = async (e, id) => {
    e.stopPropagation();
    await addToWishlist(id);
  };

  const handleCart = async (e, id) => {
    e.stopPropagation();
    await addToCart(id);
    getAllCartProducts();
  };

  if (loading) {
    return (
      <WidthWrapper>
        <section className="section_style">
          <h3 className="uppercase">You may also like</h3>
          <div className="flex justify-center items-center h-[200px]">
            <Loader className="animate-spin text-3xl" />
          </div>
        </section>
      </WidthWrapper>
    );
  }

  if (similarProducts.length === 0) {
    return (
      <WidthWrapper>
        <section className="section_style">
          <h3 className="uppercase">You may also like</h3>
          <div className="flex justify-center items-center h-[200px] text-gray-500 font-semibold">
            No similar Products available.
          </div>
        </section>
      </WidthWrapper>
    );
  }

  return (
    <WidthWrapper>
      <section className="section_style">
        <h3 className="uppercase mb-4">You may also like</h3>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ dynamicBullets: true, clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={similarProducts.length > 1} // loop only if more than 1
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
  }}
          spaceBetween={12}
          speed={1000}
      
          className="mySwiper recommendationSwiper"
        >
          {similarProducts.map((item) => (
            <SwiperSlide key={item._id} className="recommendationSwiperSlide">
              <div className="relative group flex flex-col w-full rounded-xl bg-secondary-color dark:bg-dark-secondary-color overflow-hidden cursor-pointer shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_5px_rgba(0,255,255,0.35)]">
                
                {/* Image and Rating */}
                <Link to={`/product/${item._id}`} className="relative w-full h-[200px] overflow-hidden">
                  <img
                    src={item.images?.[0]?.url || "/placeholder.png"}
                    alt={item.name}
                    className="group-hover:scale-110 transition-transform duration-300 ease-in-out w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 right-0 flex items-center gap-1 border-t shadow-lg border-white rounded-xl px-2 py-1 cursor-auto bg-black/50">
                    <FaStar className="text-yellow-500" />
                    <span className="text-xs text-white">{item.rating}</span>
                  </div>
                </Link>

                {/* Name & Price */}
                <div className="flex flex-col gap-2 px-3 py-3 items-center">
                  <span className="line-clamp-1 font-semibold font-poppins">{item.name}</span>
                  <span>NRs.{item.price}</span>

                  {/* Buttons */}
                  <div className="w-full flex justify-evenly items-center mt-2">
                    <button
                      onClick={(e) => handleWishlist(e, item._id)}
                      className="card-button rounded-xl flex items-center gap-2 px-3 py-1"
                    >
                      <span className="font-semibold text-sm">Add to Wishlist</span>
                    </button>

                    <button
                      onClick={(e) => handleCart(e, item._id)}
                      className="card-button rounded-xl flex items-center gap-2 px-3 py-1"
                    >
                      <span className="font-semibold text-sm">Add To Cart</span>
                      <IoMdCart className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </WidthWrapper>
  );
};

export default SimilarProducts;
