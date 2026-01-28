import gsap from "gsap"
import { useLayoutEffect } from "react";
import { useRef } from "react";


const Specs = ({ product }) => {

  const headingRef = useRef(null);
  const rowRefs = useRef([]);

  const addToRef = (el)=>{
    if(el && !rowRefs.current.includes(el)){
      rowRefs.current.push(el);
    }
  }



  useLayoutEffect(()=>{

      if(!product?.specs) return null;

      const ctx = gsap.context(()=>{
        rowRefs.current.forEach((row)=>{
          gsap.fromTo(row,
            {opacity:0,y:30},
            {opacity:1,y:0,duration:0.6,ease:"power1.inOut",
              scrollTrigger:{
                trigger:row,
                start:"top 90%",
                toggleActions:"play none none reverse"

              }
            }
          )
        })
      })

      return ()=>ctx.revert();


  },[product])


















  if (!product?.specs) return null;





  return (
    <div className='w-full flex flex-col gap-5'>
      <h3 ref={headingRef}>Tech Specs</h3>

      {Object.entries(product.specs).map(([category, details], i) => (
        <div ref={addToRef} className='specs_row_wrapper' key={i}>
          <h5 className='w-4/12 flex flex-row justify-center items-center'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h5>

          <ul className='w-8/12 py-3 flex flex-col gap-0'>
            {details && typeof details === "object" && !Array.isArray(details)
              ? Object.entries(details).map(([key, value], i) =>
                  value !== undefined && value !== null ? (
                    <li key={i} className='list_value_style'>
                      <span className='capitalize'>{key}</span>: <span>{value.toString()}</span>
                    </li>
                  ) : null
                )
              : Array.isArray(details)
              ? details.length > 0
                ? details.map((value, i) => (
                    <li key={i} className='list_value_style'>
                      <span>{value}</span>
                    </li>
                  ))
                : null
              : details
              ? <li className='list_value_style'><span>{details}</span></li>
              : null}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Specs