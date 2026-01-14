import React from 'react'
import {useState} from "react"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import techhive from "../../assets/techhive.png"
import { FaArrowRight } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";

import { TfiHeadphone } from "react-icons/tfi";
import { PiMonitorLight } from "react-icons/pi"
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { TfiMouse } from "react-icons/tfi";
import gsap from "gsap"
import { useGSAP } from '@gsap/react';



import {Link} from "react-router-dom"
import { useProductStore } from '../../utils/useProductStore';




const AddMonitorForm = () => {

    // display

      const brands = [ "Dell", "HP", "Acer", "ASUS", "MSI", "Samsung", "LG", "BenQ", "ViewSonic", "AOC", "Gigabyte", "Sony", "Xiaomi"];
        const panels= ["TN", "IPS", "VA", "OLED", "Mini-LED", "Micro-LED", "Nano IPS", "Fast IPS", "Super IPS", "PLS", "AH-IPS", "QLED"];
      
        const resolutions = ["HD 1280×720","HD+ 1600×900","FHD 1920×1080","FHD+ 1920×1200", "QHD 2560×1440","QHD+ 2560×1600", "UHD 3840×2160",  "4K 3840×2160", "8K 7680×4320"];
        const refreshRates = ["60Hz","90Hz","120Hz","144Hz","165Hz","180Hz","240Hz","360Hz"];
        const responseTimeMs = ["0.03ms", "0.1ms", "0.5ms", "1ms", "2ms", "3ms", "4ms", "5ms", "6ms", "8ms", "10ms"];
        const colorDepth = ["6-bit", "8-bit", "8-bit + FRC", "10-bit", "12-bit"]
        const adaptiveSync = ["None", "FreeSync", "FreeSync Premium", "FreeSync Premium Pro", "G-Sync Compatible", "G-Sync", "G-Sync Ultimate"];
        const curved = ['Yes', 'No'];
        const aspectRatio = ["4:3", "5:4", "16:9", "16:10", "21:9", "32:9", "32:10", "3:2", "1:1"];
        const glassProtection = ["None", "Gorilla Glass", "Anti-Glare Coating", "Matte Finish", "Glossy Finish", "Blue Light Filter"];
     

  

        //stand
      const heightAdjustable = ['Yes', 'No'];
      const pivot = ['Yes', 'No'];

        // speaker
          const inBuilt = ['Yes', 'No'];
   

    

    
      //warranty
        const warrantyMonths = ["6 ","12","18 ","24","36"];
        // operatingsystem\
        const os = ["Android","Android Go","iOS","HarmonyOS","KaiOS","No OS"];
        



    

  useGSAP(()=>{

    gsap.from("#gsapform",{
      y:200,
      opacity:0,
      duration:1,
      ease:"power2.out",
      delay:0.2

    

    })

    gsap.from("#gsapImage",{
      y:200,
      opacity:0,
      duration:1,
      ease:"power1.out",
      delay:0.3
    })

    gsap.from(".gsapFormCorner",{
      y:-100,
      opacity:0,
      duration:1,
      ease:"power1.in",
      delay:0.4
    })
    gsap.from("#gsapFormContent",{
      y:100,
      opacity:0,
      duration:0.8,
      ease:"power1.in",
      delay:0.2
    })

    

  },[])

  const [formData, setFormData] = useState({name:"", category:"monitor", brand:"", releaseDate:"", sku:"", features:[], shortDescription:"", images:[], 
    specs:
    {display:
        {size:"",panel:"",resolution:"", refreshRate:"", responseTimeMs:"", brightness:""},
   
        storage:{storageType:"", capacity:"", expandable:""},
        stand:{tilt:"", swivel:"", heightAdjustable:"", pivot:""},
        power:{consumption:"",standBy:""},
        speaker:{inBuilt:"",power:""},
        dimensions:[],connectivity:[],accessories:[],

} ,
    weightKg:"", warrantyMonths:"", operatingSystem:"", tags:[], colors:[], stock:"", price:""});

const {addProduct} = useProductStore();

  const handleFormSubmit =(e)=>{
    e.preventDefault();

    console.log("AddMonitorForm", formData);

    const fd = new FormData();

 fd.append("name", formData.name);
  fd.append("category", formData.category);
  fd.append("brand", formData.brand);
  fd.append("releaseDate", formData.releaseDate);
  fd.append("sku", formData.sku);
  fd.append("shortDescription", formData.shortDescription);
  fd.append("weightKg", formData.weightKg);
  fd.append("warrantyMonths", formData.warrantyMonths);
  fd.append("operatingSystem", formData.operatingSystem);
  fd.append("stock", formData.stock);
  fd.append("price", formData.price);

    fd.append("features", JSON.stringify(formData.features));
  fd.append("tags", JSON.stringify(formData.tags));
  fd.append("colors", JSON.stringify(formData.colors));
  fd.append("specs", JSON.stringify(formData.specs));

    formData.images.forEach((file) => {
    fd.append("images", file); // must match multer field name
  });


    addProduct(fd);
  
  }
  

  return (

    <section className = "w-full flex flex-row items-center justify-center">

        <form onSubmit={handleFormSubmit} encType="multipart/form-data" id="gsapform" className = "  relative z-50 overflow-hidden p-10 bg-secondary-color shadow-xl dark:bg-dark-secondary-color sm:px-20  lg:px-5 xl:px-10 rounded-xl  ">
          {/* <div className ="absolute bg-teal-500 -top-1/2 -translate-y-2/8 left-0 -translate-x-[27px] w-[450px] h-[450px] rounded-full flex flex-row justify-center items-end">
            <span id="gsapImage" className = " w-12 h-12 border-3 mb-5 border-white rounded-full p-2" ><IoMdLaptop className = "w-full h-full"/></span>

          </div> */}

          <div id="gsapFormContent" className = "flex mt-5 mb-16 flex-col items-center gap-5">
          <h3 className = "dark:border-b py-2  dark:border-gray-800 px-8 rounded-full">Add a Monitor</h3>
                 {/* product description start */}
          <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Product Description</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Product Name</span>
                        <input className = "admin_form_input_style " type="text" id="name" name="name" placeholder = "Ex. ROG Strix Pulsar XG27AQNGV" 
                        onChange = {(e)=>setFormData({...formData, name:e.target.value})} value = {formData.name}/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Category</span>
                        <input className = "admin_form_small_input_style " type="text" id="category" name="category" placeholder = "Enter Category" value="monitor" />
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Brand</span>
                       <select className = "admin_form_small_input_style" value ={formData.brand} onChange ={(e)=>setFormData({...formData, brand:e.target.value})}>
                        <option value=""  hidden >Choose a Brand</option>
                        {brands.map((brand)=>(
                            <option key = {brand} value ={brand}>{brand}</option>
                        ))}
                       </select>
                    </div>

                </div>
                {/* first line ends */}
               {/* second line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Release Date</span>
                        <input className = "admin_form_input_style " type="date" id="releaseDate" name="releaseDate " placeholder = "2020-09-08" onChange ={(e)=>setFormData({...formData, releaseDate:e.target.value})} value = {formData.releaseDate} />
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Sku Number</span>
                        <input className = "admin_form_input_style " type="text" id="sku" name="sku" placeholder = "Ex. SKU123456"  onChange = {(e)=>setFormData({...formData, sku:e.target.value})} value = {formData.sku}
                         />
                    </div>

                </div>
                {/* second line ends */}
               {/* third line */}
                <div className = "flex flex-col lg:flex-col gap-5">
                  
                        <div className = "flex flex-col gap-1">
                            <span className = "heading_style">Features</span>
                            <input className = "admin_form_full_input_style " type="text" id="features" name="features " placeholder = "Bright colors, DCIP 100% gamut"
                            onChange = {(e)=>setFormData({...formData, features:e.target.value.split(",")})} value = {formData.features} />
                        </div>
                    <div className = "flex flex-col gap-1">
                        <span>Description</span>
                        <textarea className = "admin_form_full_input_style " type="text" id="shortDescription" name="shortDescription " placeholder = "Ex. This monitor consists of ...." onChange = {(e)=>setFormData({...formData, shortDescription:e.target.value})} value = {formData.shortDescription} />
                    </div>
                  

                </div>
                {/* third line ends */}

                  <div className = "flex flex-col lg:flex-row items-center justify-between gap-5">
                  
                   
                    <div className = "flex flex-col gap-1">
                        <span>Images</span>
                        <input className = "admin_form_small_input_style " type="file" id="images" name="images" onChange = {(e)=>setFormData({...formData, images:Array.from(e.target.files)})}   multiple />
                    </div>

                    {formData.images.length >0 &&
                    <div className = "flex flex-row items-center gap-5">
                        <span className = "text-xs text-gray-600">Preview:</span>
                        {formData.images && formData.images.map((image, i)=>(
                            <img key = {i}  
                            className = "w-16 h-16 object-cover" 
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                         
                            />
                        ))}
                    </div>
                    }
                  

                </div>



            </div>


          </div>
          {/* product description ends */}

          {/* product specs start */}

          <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Specification Details</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
               <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Display Details:</span>
                {/* 1st part of display */}
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                   
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Size</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="size"  name = "size" placeholder='49"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, size:e.target.value}}})} value = {formData.specs.display.size}/>
                   
                    </div>
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Panel</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, panel:e.target.value}}})} value = {formData.specs.display.panel}>
                        <option value = "" hidden >Choose a Panel</option>
                        {panels.map((panel)=>(
                            <option key = {panel} value ={panel}>{panel}</option>
                        ))}
                       </select>
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Resolution</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, resolution:e.target.value}}})} value = {formData.specs.display.resolution}>
                        <option value = "" hidden >Choose a resolution</option>
                        {resolutions.map((resolution)=>(
                            <option key = {resolution} value ={resolution}>{resolution}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Refresh Rate</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, refreshRate:e.target.value}}})} value = {formData.specs.display.refreshRate}>
                        <option value = "" hidden >Choose a refresh rate</option>
                        {refreshRates.map((refreshRate)=>(
                            <option key = {refreshRate} value ={refreshRate}>{refreshRate}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">responseTimeMs</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, responseTimeMs:e.target.value}}})} value = {formData.specs.display.responseTimeMs}>
                        <option value = "" hidden >Choose a responseTime</option>
                        {responseTimeMs.map((response)=>(
                            <option key = {response} value ={response}>{response}</option>
                        ))}
                       </select>
                    </div>

                </div>
                 {/* 1st part of display ends */}

                    {/* 2nd part of display */}

                   <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
               
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Brightness</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="brightness"  name = "brightness" placeholder='600 nits"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, brightness:e.target.value}}})} value = {formData.specs.display.brightness}/>
                   
                    </div>

                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Contrast Ratio</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="contrastRatio"  name = "contrastRatio" placeholder='1000:1"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, contrastRatio:e.target.value}}})} value = {formData.specs.display.contrastRatio}/>
                   
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Color Depth</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display,colorDepth:e.target.value}}})} value = {formData.specs.display.colorDepth}>
                        <option value = "" hidden >Choose a color Depth</option>
                        {colorDepth.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Adaptive Sync</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, adaptiveSync:e.target.value}}})} value = {formData.specs.display.adaptiveSync}>
                        <option value = "" hidden >Choose a adaptiveSync</option>
                        {adaptiveSync.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                  <div className = "flex flex-col gap-1">
                        <span className = "heading_style">HDR support</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="hdrSupport"  name = "hdrSupport" placeholder='HDR400"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, hdrSupport:e.target.value}}})} value = {formData.specs.display.hdrSupport}/>
                   
                    </div>

                </div>

                {/* 2nd part of display ends */}

                {/* 3rd part of display */}

                     <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
               
                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Curved</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display,curved:e.target.value}}})} value = {formData.specs.display.curved}>
                        <option value = "" hidden >Curve</option>
                        {curved.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                  
                   
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Aspect Ratio</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display,aspectRatio:e.target.value}}})} value = {formData.specs.display.aspectRatio}>
                        <option value = "" hidden >Choose a aspectRatio</option>
                        {aspectRatio.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Glass Protection</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display,glassProtection:e.target.value}}})} value = {formData.specs.display.glassProtection}>
                        <option value = "" hidden >Choose a glassProtection</option>
                        {glassProtection.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                

             

                </div>


                {/* 3rd part of display ends */}
                
                </div>
                {/* first line ends */}
         

               

            
          



          

         

                {/* 6th line starts here */}


                   <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Stand Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Tilt</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="tilt"  name = "tilt" placeholder='"-5 degree to 20 degree"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, stand:{...formData.specs.stand, tilt:e.target.value}}})} value = {formData.specs.stand.tilt}/>
                   
                    </div>
                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Swivel</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="swivel"  name = "swivel" placeholder='"-30 degree to 30 degree"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, stand:{...formData.specs.stand, swivel:e.target.value}}})} value = {formData.specs.stand.swivel}/>
                   
                    </div>  
                  
               
               
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Height Adjustable</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, stand:{...formData.specs.stand, heightAdjustable:e.target.value}}})} value = {formData.specs.stand.heightAdjustable}>
                        <option value = "" hidden >heightAdjustablity</option>
                        {heightAdjustable.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Pivot</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, stand:{...formData.specs.stand, pivot:e.target.value}}})} value = {formData.specs.stand.pivot}>
                        <option value = "" hidden >Pivot</option>
                        {pivot.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                </div>
                </div>

                {/* 6th line ends  */}




                {/* 7th line starts */}
                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Power</span>
                <div className = "flex flex-col lg:flex-col gap-5">
                   
                  <div className = "flex flex-row gap-5">
                    
                  

                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Consumption</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="consumption"  name = "consumption" placeholder='"45W"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, power:{...formData.specs.power, consumption:e.target.value}}})} value = {formData.specs.power.consumption}/>
                   
                    </div>  

                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">StandBy</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="standBy"  name = "standBy" placeholder='"<0.5W"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, power:{...formData.specs.power, standBy:e.target.value}}})} value = {formData.specs.power.standBy}/>
                   
                    </div>  

                    
                  
                    </div>

                    <div>

                 

                    
                    </div>
                    
                  
                 
             
                

                </div>
                </div>
                  
                 

                    {/* 7th line ends here */}


                    {/* 8th line starts */}

                <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Speakers</span>
                <div className = "flex flex-col lg:flex-col gap-5">
                   
                  <div className = "flex flex-row gap-5">
                    
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">In Built</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, speaker:{...formData.specs.speaker, inBuilt:e.target.value}}})} value = {formData.specs.speaker.inBuilt}>
                        <option value = "" hidden >InBuilt </option>
                        {inBuilt.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Power</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="power"  name = "power" placeholder='"2W"'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, speaker:{...formData.specs.speaker, power:e.target.value}}})} value = {formData.specs.speaker.power}/>
                   
                    </div>  

                    
                  
                    </div>

                    <div className=' flex flex-col gap-5'>

                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Dimensions</span>
                        <input className = "admin_form_big_input_style " type="text" id="dimensions" name="dimensions" placeholder = "Ex. 61.4*50.3*18.83cm "
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, dimensions:e.target.value.split(",")}})} value = {formData.specs.dimensions.join(",")} />
                    </div>

                        <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Connectivity</span>
                        <input className = "admin_form_big_input_style " type="text" id="connectivity" name="connectivity" placeholder = "Ex. Dual Sim, Network"
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, connectivity:e.target.value.split(",")}})} value = {formData.specs.connectivity.join(",")} />
                    </div>

                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Accessories</span>
                        <input className = "admin_form_big_input_style " type="text" id="accessories" name="accessories" placeholder = "Stand"
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, accessories:e.target.value.split(",")}})} value = {formData.specs.accessories.join(",")} />
                    </div>
                    </div>
                    
                  
                 
             
                

                </div>
                </div>

                {/* 8th line ends */}

                 
                    
                    





            </div>


          </div>

          {/* pricing and availability  */}
           <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Pricing & Availability</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Weight </span>
                        <input className = "admin_form_input_style " type="text" id="weightKg" name="weightKg " placeholder = "Ex. 8kg" onChange = {(e)=>setFormData({...formData, weightKg:e.target.value})} value = {formData.weightKg}/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Warranty (months)</span>
                       <select className = "admin_form_small_input_style" onChange = {(e)=>setFormData({...formData, warrantyMonths:e.target.value})} value = {formData.warrantyMonths}>
                        <option value = "" hidden >Choose a Warranty</option>
                        {warrantyMonths.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
               
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Operating System</span>
                       <select className = "admin_form_small_input_style"
                       onChange = {(e)=>setFormData({...formData, operatingSystem:e.target.value})} value = {formData.operatingSystem}>
                        <option value = "" hidden >Choose an Operating System</option>
                        {os.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
               

                </div>
                {/* first line ends */}
               {/* second line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                 
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Tags</span>
                        <input className = "admin_form_input_style " type="text" id="tags" name="tags " placeholder = "Ex. gaming, portable"
                        onChange = {(e)=>setFormData({...formData, tags:e.target.value.split(",")})} value = {formData.tags} />
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">colors</span>
                        <input className = "admin_form_input_style " type="text" id="colors" name="colors " placeholder = "Ex. dynamic blue, purple"
                        onChange = {(e)=>setFormData({...formData, colors:e.target.value.split(",")})} value = {formData.colors} />
                    </div>

                </div>
                {/* second line ends */}
               {/* third line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">In stock</span>
                        <input className = "admin_form_input_style " type="number" id="stock" name="stock " placeholder = "Ex. 20" 
                        onChange = {(e)=>setFormData({...formData, stock:e.target.value})} value ={formData.stock}/>
                    </div>
                       <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Price</span>
                        <input className = "admin_form_input_style " type="number" id="price" name="price " placeholder = "Ex. 20000" onChange = {(e)=>setFormData({...formData, price:e.target.value})} value = {formData.price} />
                    </div>
                  
                  
                  

                </div>
                {/* third line ends */}


            </div>


          </div>
          

      

        
            <button type="submit" className = " mt-5 group w-full rounded-lg py-3 px-5 bg-color-teal-400 font-semibold font-poppins cursor-pointer flex flex-row gap-3 items-center justify-center hover:bg-color-teal-300   "><span className = " font-poppins">Add </span> <FaArrowRight className = "group-hover:translate-x-5 transition-all duration-300ms ease-in-out" />
            </button>
         

            </div>

            {/* Dont' touch */}
            <div className = "gsapFormCorner absolute -top-20 -left-16  bg-teal-500 w-40 h-40 rounded-full "></div>
            <div className = "gsapFormCorner absolute -top-20 -right-16  bg-teal-500 w-40 h-40 rounded-full "></div>

        </form>


        

    </section>

   
  )
}

export default AddMonitorForm