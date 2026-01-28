import React, { useState } from 'react';
import { FaFeatherAlt } from 'react-icons/fa';
import { useProductStore } from '../utils/useProductStore';
import Loading from "./Loading"
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import CryingAnimation from './CryingAnimation';
import gsap from "gsap"
import { useLayoutEffect } from 'react';
import { useRef } from 'react';

const Filter = () => {
    const [filters, setFilters] = useState({ category: "", brand: "", minPrice: "", maxPrice: "", rating: "" });

    const categories = ["laptop","headphone","monitor","mouse","mobile"];
    const brands = ["asus","apple","samsung","dell","hp","lenovo","asus","lg","xiaomi","logitech","razer","steelseries"];
    const ratings = [1,2,3,4,5];

    const { filteredProducts, filtering, filterProducts } = useProductStore();

    const filteringProducts = async (e) => {
        e.preventDefault();
        await filterProducts(filters); 
    }


    // gsap

    const headingRef = useRef(null);
    const boxRef = useRef(null);
    const filterProductRefs = useRef([]);
    const filterSectionRef = useRef(null);

    const addToFilterProductRef = (el)=>{
        if(el && !filterProductRefs.current.includes(el)){
            filterProductRefs.current.push(el)
        }
    }

    useLayoutEffect(()=>{

        // if(!filteredProducts || filteredProducts.length <=0) return;

        const ctx = gsap.context(()=>{
            
            const tl = gsap.timeline({
                ease:"power2.in"

            });

            tl.fromTo(headingRef.current,
                {opacity:0,y:30},
                {opacity:1,y:0,duration:0.6,ease:"power2.in"}
            )
            tl.fromTo(boxRef.current,
                {opacity:0,y:18},
                {opacity:1,y:0,duration:0.6,ease:"power2.in",stagger:0.9}
            )
            tl.fromTo(filterProductRefs.current,
                    { opacity: 0, y: 18 },
                      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1},   "-=0.4"
            )
          

        })
        return ()=>ctx.revert();
        
    },[filteredProducts])

    return (
        <section ref={filterSectionRef} className="max-w-7xl">

            {filtering ? (
                <Loading />
            ) : (
                <div className="w-full space-y-5 flex flex-col gap-5">

                    {/* 1st div */}
                    <div ref={headingRef} className="w-full flex flex-row justify-between items-center">
                        <h4>Products Filter</h4>
                        <span className='font-audiowide'>{filteredProducts.length} items found</span>
                    </div>

                    {/* 2nd div - filter inputs */}
                    <div ref={boxRef} className="flex items-center flex-col gap-5">
                        <form className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {/* Category */}
                            <div>
                                <select 
                                    className="filter_input_style" 
                                    value={filters.category} 
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                >
                                    <option value="" hidden>Category</option>
                                    {categories.map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Brand */}
                            <div>
                                <select 
                                    className="filter_input_style" 
                                    value={filters.brand} 
                                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                >
                                    <option value="" hidden>Brand</option>
                                    {brands.map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Min Price */}
                            <div className="flex flex-col gap-1">
                                <input 
                                    className="hide-number-spin filter_input_style" 
                                    type="number" 
                                    id="minPrice" 
                                    name="minPrice" 
                                    placeholder="minPrice" 
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} 
                                    value={filters.minPrice} 
                                />
                            </div>

                            {/* Max Price */}
                            <div className="flex flex-col gap-1">
                                <input 
                                    className="hide-number-spin filter_input_style" 
                                    type="number" 
                                    id="maxPrice" 
                                    name="maxPrice" 
                                    placeholder="maxPrice" 
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} 
                                    value={filters.maxPrice} 
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <select 
                                    className="filter_input_style" 
                                    value={filters.rating} 
                                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                >
                                    <option value="" hidden>Rating</option>
                                    {ratings.map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </form>

                        <button 
                            onClick={filteringProducts} 
                            className="flex justify-center items-center gap-1 px-10 py-2 bg-color-teal-400 rounded-xl w-max"
                        >
                            <FaFeatherAlt />
                            <span className="font-poppins text-md">Filter</span>
                        </button>
                    </div>

                    {/* 3rd div - products */}
                    {!filteredProducts || filteredProducts.length === 0 ? (
                        <div className="w-full h-screen flex flex-col justify-center items-center pb-90">
                            <h3>No products to show..</h3>
                            <CryingAnimation />
                        </div>
                    ) : (
                        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map((item, i) => (
                                <div ref={addToFilterProductRef}
                                    key={i} 
                                    className="relative group flex flex-col gap-3 w-full rounded-xl overflow-hidden cursor-pointer shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)] p-4"
                                >
                                    <Link 
                                        to={`/product/${item._id}`} 
                                        className="relative bg-secondary-color dark:bg-dark-secondary-color rounded-2xl w-full h-[200px] overflow-hidden"
                                    >
                                        <img 
                                            className="group-hover:scale-120 transition-transform duration-300 ease-in-out w-full h-full object-cover object-center"
                                            src={item.images?.[0]?.url} 
                                            alt="product-image"
                                        />
                                    </Link>

                                    <span className="text-sm line-clamp-2">{item.name}</span>

                                    {/* Rating & Price */}
                                    <div className="flex flex-row gap-5">
                                        <div className="w-max flex flex-row items-center justify-center gap-1 border shadow-lg border-gray-300 dark:border-gray-800 rounded-xl px-4 py-1 cursor-auto">
                                            <FaStar className="text-yellow-500" />
                                            <span className="text-xs">{item.averageRating}</span>
                                        </div>

                                        <div className="w-max flex flex-row items-center justify-center gap-1 border shadow-lg border-gray-800 rounded-xl px-4 py-1 cursor-auto">
                                            <span className="text-xs">Rs {item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                </div>
            )}

        </section>
    );
}

export default Filter;
