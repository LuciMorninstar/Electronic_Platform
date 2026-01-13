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




const AddMobileForm = () => {

    // display

      const brands = [ "Apple","Samsung","Xiaomi","Redmi","OnePlus","Realme","Oppo","Vivo","Google","Huawei","Honor","Motorola","Nothing","Sony","Infinix","Tecno"];
        const panels= ["LCD","IPS LCD","PLS LCD","TFT LCD","OLED","AMOLED","Super AMOLED","Dynamic AMOLED","Dynamic AMOLED 2X","LTPO AMOLED","POLED"];
        const sizes= ["5.0'","5.5'","6.0'","6.1'","6.3'","6.4'","6.5'","6.6'","6.7'","6.8'","7.0'","7.6'"];
        const resolutions = ["HD 1280×720","HD+ 1600×900","FHD 1920×1080","FHD+ 1920×1200", "QHD 2560×1440","QHD+ 2560×1600", "UHD 3840×2160",  "4K 3840×2160", "8K 7680×4320"];
        const refreshRates = ["60Hz","90Hz","120Hz","144Hz","165Hz","180Hz","240Hz","360Hz"];
        const glassProtection = ["Gorilla Glass 3","Gorilla Glass 4","Gorilla Glass 5","Gorilla Glass 6","Gorilla Glass Victus","Dragontrail","Sapphire Glass","No Protection"];

        //cpu
        const cores = ["Single-Core","Dual-Core","Tri-Core","Quad-Core","Hexa-Core","Octa-Core","Deca-Core"];
        // const threads = ["4","8","12","16","20","24","32"];
        // const baseClockGhz = ["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"];
        const fabrication= ["14nm","12nm","10nm","8nm","7nm","6nm","5nm","4nm","3nm","2nm"];
        const maxClockGHz = ["1.8","2.0","2.2","2.4","2.6","2.8","3.0","3.2","3.5","3.8","4.0","4.2","4.5"];

     

        //memory
        const memorySizes = ["2GB","3GB","4GB", "6GB","8GB" ,"12GB","16GB","32GB"];

        const types = ["LPDDR3","LPDDR4","LPDDR4X","LPDDR5","LPDDR5X"];
        const expandable = ["Yes", "No"];
        // const maxSupported = ["8GB","16GB","32GB","64GB","128GB","256GB"];
        
        // storage
        const storageTypes = ["eMMC","UFS 2.1","UFS 3.0","UFS 3.1","UFS 4.0"];
        const capacities = ["32GB","64GB","128GB","256GB","512GB","1TB"];

        //camera
      const videoRecordingResolutions = ["720p@30fps","1080p@30fps","1080p@60fps","1440p@30fps","1440p@60fps","2160p@30fps","2160p@60fps","4320p@30fps"];

        // battery
        const capacitiesWh = ["2000mAh","2500mAh","3000mAh","3500mAh","4000mAh","4500mAh","5000mAh","5500mAh","6000mAh","7000mAh"];

        const chargingSpeed = ["5W (No Fast Charging)","10W (Fast Charging)","15W (Fast Charging)","18W (Fast Charging)","25W (Fast Charging)","30W (Fast Charging)","33W (Fast Charging)","45W (Fast Charging)","50W (Fast Charging)","65W (Fast Charging)","67W (Fast Charging)","75W (Fast Charging)","80W (Fast Charging)","90W (Fast Charging)","100W (Fast Charging)","120W (Fast Charging)"];

        const wirelessCharging = ["Yes", "No"];
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

  const [formData, setFormData] = useState({name:"", category:"mobile", brand:"", releaseDate:"", sku:"", features:[], shortDescription:"", images:[], 
    specs:
    {display:
        {size:"",panel:"",resolution:"", refreshRate:"", glassProtection:""},
        cpu:{model:"", core:"", maxClockGHz:"",fabrication:""},
        gpu:{model:""},
        memory:{memorySize:"", type:"", expandable:""},
        storage:{storageType:"", capacity:"", expandable:""},
        camera:{rear:"", front:"", videoRecordingResolution:""},
        battery:{capacityWh:"",charging:"", wirelessCharging:""},
        sensors:[],connectivity:[]

} ,
    weightKg:"", warrantyMonths:"", operatingSystem:"", tags:[], colors:[], stock:"", price:""});

const {addProduct} = useProductStore();

  const handleFormSubmit =(e)=>{
    e.preventDefault();

    console.log("AddMobileForm", formData);

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
          <h3 className = "dark:border-b py-2  dark:border-gray-800 px-8 rounded-full">Add a Mobile</h3>
                 {/* product description start */}
          <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Product Description</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Product Name</span>
                        <input className = "admin_form_input_style " type="text" id="name" name="name" placeholder = "Ex. Redmi Note 11 pro" 
                        onChange = {(e)=>setFormData({...formData, name:e.target.value})} value = {formData.name}/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Category</span>
                        <input className = "admin_form_small_input_style " type="text" id="category" name="category" placeholder = "Enter Category" value="mobile" />
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
                            <input className = "admin_form_full_input_style " type="text" id="features" name="features " placeholder = "Large battery, OLED display"
                            onChange = {(e)=>setFormData({...formData, features:e.target.value.split(",")})} value = {formData.features} />
                        </div>
                    <div className = "flex flex-col gap-1">
                        <span>Description</span>
                        <textarea className = "admin_form_full_input_style " type="text" id="shortDescription" name="shortDescription " placeholder = "Ex. Budget mobile for personal use." onChange = {(e)=>setFormData({...formData, shortDescription:e.target.value})} value = {formData.shortDescription} />
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
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Size</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, size:e.target.value}}})} value = {formData.specs.display.size}>
                        <option value = "" hidden >Choose a size</option>
                        {sizes.map((size)=>(
                            <option key = {size} value ={size}>{size}</option>
                        ))}
                       </select>
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
                        <span className = "heading_style">glass Protection</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, glassProtection:e.target.value}}})} value = {formData.specs.display.glassProtection}>
                        <option value = "" hidden >Choose a protection</option>
                        {glassProtection.map((protection)=>(
                            <option key = {protection} value ={protection}>{protection}</option>
                        ))}
                       </select>
                    </div>

                </div>
                </div>
                {/* first line ends */}
               {/* second line */}

                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Processor (SoC) Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Model</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="model"  name = "model" placeholder='Ex.Exynos 1200'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, model:e.target.value}}})} value = {formData.specs.cpu.model}/>
                   
                    </div>
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Cores</span>
                       <select className = "admin_form_smallest_input_style" onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, core:e.target.value}}})} value ={formData.specs.cpu.core}>
                        <option value = "" hidden >Choose cores</option>
                        {cores.map((core)=>(
                            <option key = {core} value ={core}>{core}</option>
                        ))}
                       </select>
                    </div>
                  
                    {/* <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Threads</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, thread:e.target.value}}})} value ={formData.specs.cpu.thread}>
                        <option value = "" hidden >Choose Threads</option>
                        {threads.map((thread)=>(
                            <option key = {thread} value ={thread}>{thread}</option>
                        ))}
                       </select>
                    </div> */}
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Max Clock(hz)</span>
                       <select className = "admin_form_smallest_input_style" onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, maxClockGHz:e.target.value}}})} value = {formData.specs.cpu.maxClockGHz}>
                        <option value = "" hidden >Choose a maxCLockGhx</option>
                        {maxClockGHz.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Fabrication</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, fabrication:e.target.value}}})} value = {formData.specs.cpu.fabrication}>
                        <option value = "" hidden >Choose Fabrication(nm)</option>
                        {fabrication.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                </div>
                </div>

              
                {/* second line ends */}
               {/* third line */}
                 <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Graphics (GPU) Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Model</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="model"  name = "model" placeholder='Ex. Mali g67'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, gpu:{...formData.specs.gpu, model:e.target.value}}})} value = {formData.specs.gpu.model}/>
                   
                    </div>
                 
              
            
                </div>
                </div>
                {/* third line ends */}



                {/* 4th line */}
                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Memory Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Size(GB)</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, memory:{...formData.specs.memory, memorySize:e.target.value}}})} value ={formData.specs.memory.memorySize}>
                        <option value = "" hidden >Choose a size</option>
                        {memorySizes.map((size)=>(
                            <option key = {size} value ={size}>{size}</option>
                        ))}
                       </select>
                    </div>
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Type</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, memory:{...formData.specs.memory, type:e.target.value}}})} value = {formData.specs.memory.type}>
                        <option value = "" hidden >Choose a Type</option>
                        {types.map((type)=>(
                            <option key = {type} value ={type}>{type}</option>
                        ))}
                       </select>
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Expandability</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, memory:{...formData.specs.memory, expandable:e.target.value}}})} value = {formData.specs.memory.expandable}>
                        <option value = "" hidden >Expandabability</option>
                        {expandable.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                
                

                </div>
                </div>
                {/* 4th line ends */}

                {/* 5th line starts */}
                 <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Storage Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Type</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, storage:{...formData.specs.storage, storageType:e.target.value}}})} value = {formData.specs.storage.storageType}
                       >
                        <option value = "" hidden >Choose a Type</option>
                        {storageTypes.map((type)=>(
                            <option key = {type} value ={type}>{type}</option>
                        ))}
                       </select>
                    </div>
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Capacity</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, storage:{...formData.specs.storage, capacity:e.target.value}}})} value = {formData.specs.storage.capacity}>
                        <option value = "" hidden >Choose a Capacity</option>
                        {capacities.map((v)=>(
                            <option key = {v} value ={v}>{v}</option>
                        ))}
                       </select>
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Expandability</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, storage:{...formData.specs.storage, expandable:e.target.value}}})} value = {formData.specs.storage.expandable}>
                        <option value = "" hidden >Choose Expandability</option>
                        {expandable.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
             
                

                </div>
                </div>
                {/* 5th line ends here */}

                {/* 6th line starts here */}


                   <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Camera Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Rear</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="rear"  name = "rear" placeholder='rear (50MP + 12MP + 5MP)'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, camera:{...formData.specs.camera, rear:e.target.value}}})} value = {formData.specs.camera.rear}/>
                   
                    </div>
                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Front</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="front"  name = "front" placeholder='front 20MP'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, camera:{...formData.specs.camera, front:e.target.value}}})} value = {formData.specs.camera.front}/>
                   
                    </div>
                  
               
               
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Recording Resolution (Video)</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, camera:{...formData.specs.camera, videoRecordingResolution:e.target.value}}})} value = {formData.specs.camera.videoRecordingResolution}>
                        <option value = "" hidden >Choose Resolution</option>
                        {videoRecordingResolutions.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                </div>
                </div>

                {/* 6th line ends  */}




                {/* 7th line starts */}
                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Battery Connectivity & Sensors</span>
                <div className = "flex flex-col lg:flex-col gap-5">
                   
                  <div className = "flex flex-row gap-5">
                    
                  

                       <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Capacity</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, battery:{...formData.specs.battery, capacityWh:e.target.value}}})} value = {formData.specs.battery.capacityWh}>
                        <option value = "" hidden >Choose a Capacity</option>
                        {capacitiesWh.map((v)=>(
                            <option key = {v} value ={v}>{v}</option>
                        ))}
                       </select>
                    </div>

                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Charging</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, battery:{...formData.specs.battery, charging:e.target.value}}})} value = {formData.specs.battery.charging}>
                        <option value = "" hidden >Choose a charging speed</option>
                        {chargingSpeed.map((v)=>(
                            <option key = {v} value ={v}>{v}</option>
                        ))}
                       </select>
                    </div>

                    
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Wireless Charging</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, battery:{...formData.specs.battery, wirelessCharging:e.target.value}}})} value = {formData.specs.battery.wirelessCharging}>
                        <option value = "" hidden >Choose a charging speed</option>
                        {wirelessCharging.map((v)=>(
                            <option key = {v} value ={v}>{v}</option>
                        ))}
                       </select>
                    </div>
                    </div>

                    <div>

                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Sensors</span>
                        <input className = "admin_form_big_input_style " type="text" id="sensors" name="sensors" placeholder = "Ex. Accelerometer, Proximity, Gyroscope"
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, sensors:e.target.value.split(",")}})} value = {formData.specs.sensors.join(",")} />
                    </div>

                        <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Connectivity</span>
                        <input className = "admin_form_big_input_style " type="text" id="connectivity" name="connectivity" placeholder = "Ex. Dual Sim, Network"
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, connectivity:e.target.value.split(",")}})} value = {formData.specs.connectivity.join(",")} />
                    </div>
                    </div>
                    
                  
                 
             
                

                </div>
                </div>
                  
                 

                    {/* 7th line ends here */}

                 
                    
                    





            </div>


          </div>

          {/* pricing and availability  */}
           <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Pricing & Availability</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Weight (gram)</span>
                        <input className = "admin_form_input_style " type="text" id="productName" name="productName " placeholder = "Ex. 190" onChange = {(e)=>setFormData({...formData, weightKg:e.target.value})} value = {formData.weightKg}/>
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

export default AddMobileForm