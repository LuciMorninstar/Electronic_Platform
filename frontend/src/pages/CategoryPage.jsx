import React from 'react'
import macbook from "../assets/macbook.png"
import headphones from "../assets/headphones.png"
import monitor from "../assets/mon-cat.png"
import mouse from "../assets/mouse-cat.png"

const CategoryPage = () => {

    const categories = [
      {
        name: "Headphones",
        image:headphones
      },
      {
        name: "Monitor",
        image: monitor
      },
      {
        name: "Mouse",
        image: mouse
      },
      {
        name: "Motherboard",
        image: monitor
      },
      {
        name: "Macbook",
        image: macbook
      },
      {
        name: "Monitor",
        image: monitor
      },
      {
        name: "Mouse",
        image: mouse
      },
      {
        name: "Motherboard",
        image: monitor
      },
      {
        name: "Macbook",
        image: macbook
      }
    ];

  return (
    <section className = "px-5 lg:px-10 mt-30 lg:mt-36 flex flex-col gap-5 lg:gap-10">
      <span className = "text-sm lg:text-xl  text-black dark:text-font-white"> Categories found : 20 </span>

      <div className ="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5  gap-y-5 mx-auto">
         
          {categories.map((category,i)=>(
                // card wrapper (z-5 to show under the text and over the blurry white also fixed height and fixed width)
                <div key={i} className ="gsapCategories shrink-0 overflow-hidden relative w-[300px] h-[350px] flex flex-col items-center justify-center gap-5 rounded-3xl bg-teal-500  py-8 z-5 cursor-pointer">
                    {/* absoluting the details so to get over the blurry bg */}
                    <div className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10  flex flex-col items-center justify-center gap-5">
                     <div className = "w-full h-[150px]  ">
                        <img className = "w-full h-full  object-center object-contain" src={category.image} alt="categories_image"/>
                    </div>

                    <span className = "text-lg sm:text-xl lg:text-2xl xl:text-3xl font text-dark-primary-color font-poppins ">{category.name}</span>
                    <button className = "category_button_style">
                        <span className= "  font-poppins font-semibold "> Shop Now</span>
                    </button>
                    </div>
                   

                    {/* absolute white blurry z=-10 */}
                    <div className = "absolute -bottom-1/2 -z-10 -right-1/4 bg-white h-full rotate-60 w-full blur-2xl">
                    </div>


                </div>
            ))}


      </div>






    </section>
  )
}

export default CategoryPage