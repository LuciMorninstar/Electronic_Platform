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




const AddLaptopForm = () => {

    // display

      const brands = [ "Acer","Apple","ASUS","Dell","HP","Lenovo","MSI","Razer","Samsung","LG","Microsoft","Gigabyte"];
        const panels= ["IPS","OLED","AMOLED","Retina","Mini-LED","TN","VA"];
        const sizes= ["13.3'","14'","15.6'","17.3'","18'"];
        const resolutions = ["HD 1280×720","HD+ 1600×900","FHD 1920×1080","FHD+ 1920×1200", "QHD 2560×1440","QHD+ 2560×1600", "UHD 3840×2160",  "4K 3840×2160"];
        const refreshRates = ["60Hz", "75Hz", "120Hz", "144Hz", "240Hz", "360Hz"];
        const responseTimeMs = ["1ms", "2ms", "4ms", "5ms", "8ms", "10ms"];

        //cpu
        const cores = ["2","4","6","8","10","12","16"];
        const threads = ["4","8","12","16","20","24","32"];
        const baseClockGhz = ["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"];
        const boostClockGHz = ["2.0","2.5","3.0","3.5","4.0","4.5","5.0","5.5","6.0"];

        // gpu
        const vRam = ["2GB","4GB","6GB","8GB","10GB","12GB","16GB","24GB"]; 

        //memory
        const memorySizes = ["4GB","8GB","16GB","32GB","64GB","128GB"];

        const types = ["DDR3","DDR4","DDR5","LPDDR4","LPDDR5"];
        const slots = ["1","2","4"];
        const maxSupported = ["8GB","16GB","32GB","64GB","128GB","256GB"];
        
        // storage
        const storageTypes = ["HDD","SATA SSD","NVMe SSD","PCIe SSD"];
        const capacities = ["128GB","256GB","512GB","1TB","2TB","4TB"];

        // battery
        const capacitiesWh = ["30Wh","40Wh","50Wh","60Wh","70Wh","80Wh","90Wh","99Wh"];
      //warranty
        const warrantyMonths = ["6 ","12","18 ","24","36"];
        // operatingsystem\
        const os = ["Windows 10 Home","Windows 10 Pro","Windows 11 Home","Windows 11 Pro","Linux","No OS Installed"];
        



    

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

  const [formData, setFormData] = useState({name:"", category:"laptop", brand:"", releaseDate:"", sku:"", features:[], shortDescription:"", images:[], 
    specs:
    {display:
        {size:"",panel:"",resolution:"", refreshRate:"", responseTimeMs:""},
        cpu:{model:"", core:"", thread:"", baseClockGhz:"", boostClockGHz:""},
        gpu:{model:"", vRam:""},
        memory:{memorySize:"", type:"", slot:"", maxSupported:""},
        storage:{storageType:"", capacity:"", slot:""},
        battery:{capacityWh:""},
        ports:[] 
} ,
    weightKg:"", warrantyMonths:"", operatingSystem:"", tags:[], colors:[], stock:"", price:""});



  const handleFormSubmit =(e)=>{
    e.preventDefault();

    console.log("AddLaptopForm", formData);
  
  }
  

  return (

    <section className = "w-full flex flex-row items-center justify-center">

        <form onSubmit={handleFormSubmit} enctype="multipart/form-data" id="gsapform" className = "  relative z-50 overflow-hidden p-10 bg-secondary-color shadow-xl dark:bg-dark-secondary-color sm:px-20  lg:px-5 xl:px-10 rounded-xl  ">
          {/* <div className ="absolute bg-teal-500 -top-1/2 -translate-y-2/8 left-0 -translate-x-[27px] w-[450px] h-[450px] rounded-full flex flex-row justify-center items-end">
            <span id="gsapImage" className = " w-12 h-12 border-3 mb-5 border-white rounded-full p-2" ><IoMdLaptop className = "w-full h-full"/></span>

          </div> */}

          <div id="gsapFormContent" className = "flex mt-5 mb-16 flex-col items-center gap-5">
          <h3 className = "dark:border-b py-2  dark:border-gray-800 px-8 rounded-full">Add a Laptop</h3>
                 {/* product description start */}
          <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Product Description</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Product Name</span>
                        <input className = "admin_form_input_style " type="text" id="name" name="name " placeholder = "Ex. Asus Rog Strix G15" 
                        onChange = {(e)=>setFormData({...formData, name:e.target.value})} value = {formData.name}/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Category</span>
                        <input className = "admin_form_small_input_style " type="text" id="category" name="category " placeholder = "Enter Category" value="laptop" disabled/>
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
                        <input className = "admin_form_input_style " type="text" id="sku" name="sku " placeholder = "Ex. SKU123456"  onChange = {(e)=>setFormData({...formData, sku:e.target.value})} value = {formData.sku}
                         />
                    </div>

                </div>
                {/* second line ends */}
               {/* third line */}
                <div className = "flex flex-col lg:flex-col gap-5">
                  
                        <div className = "flex flex-col gap-1">
                            <span className = "heading_style">Features</span>
                            <input className = "admin_form_full_input_style " type="text" id="features" name="features " placeholder = "Ex. Advance vapor chamber cooling , High performance gpu"
                            onChange = {(e)=>setFormData({...formData, features:e.target.value.split(",")})} value = {formData.features} />
                        </div>
                    <div className = "flex flex-col gap-1">
                        <span>Description</span>
                        <textarea className = "admin_form_full_input_style " type="text" id="shortDescription" name="shortDescription " placeholder = "Ex. High-performance gaming laptop." onChange = {(e)=>setFormData({...formData, shortDescription:e.target.value})} value = {formData.shortDescription} />
                    </div>
                  

                </div>
                {/* third line ends */}

                  <div className = "flex flex-col lg:flex-row items-center justify-between gap-5">
                  
                   
                    <div className = "flex flex-col gap-1">
                        <span>Images</span>
                        <input className = "admin_form_small_input_style " type="file" id="images" name="images " onChange = {(e)=>setFormData({...formData, images:Array.from(e.target.files)})}   multiple />
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
                        <span className = "heading_style">Response Time(ms)</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, display:{...formData.specs.display, responseTimeMs:e.target.value}}})} value = {formData.specs.display.responseTimeMs}>
                        <option value = "" hidden >Choose a response Time</option>
                        {responseTimeMs.map((responseTime)=>(
                            <option key = {responseTime} value ={responseTime}>{responseTime}</option>
                        ))}
                       </select>
                    </div>

                </div>
                </div>
                {/* first line ends */}
               {/* second line */}

                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Processor (CPU) Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Model</span>
                        <input className = "admin_form_smallest_input_style"  type="text" id="model"  name = "model" placeholder='Ex. Ryzen 5 5535HS'
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
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Threads</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, thread:e.target.value}}})} value ={formData.specs.cpu.thread}>
                        <option value = "" hidden >Choose Threads</option>
                        {threads.map((thread)=>(
                            <option key = {thread} value ={thread}>{thread}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Base Clock (GHz)</span>
                       <select className = "admin_form_smallest_input_style" onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, baseClockGhz:e.target.value}}})} value = {formData.specs.cpu.baseClockGhz}>
                        <option value = "" hidden >Choose a baseCLockGhx</option>
                        {baseClockGhz.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Boost Clock (GHz)</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, cpu:{...formData.specs.cpu, boostClockGHz:e.target.value}}})} value = {formData.specs.cpu.boostClockGHz}>
                        <option value = "" hidden >Choose Boost Clock</option>
                        {boostClockGHz.map((value)=>(
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
                        <input className = "admin_form_smallest_input_style"  type="text" id="model"  name = "model" placeholder='Ex. Nvidia Graphics RTX 4060'
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, gpu:{...formData.specs.gpu, model:e.target.value}}})} value = {formData.specs.gpu.model}/>
                   
                    </div>
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">vRam</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, gpu:{...formData.specs.gpu, vRam:e.target.value}}})} value ={formData.specs.gpu.vRam}>
                        <option value = "" hidden >Choose vRam</option>
                        {vRam.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
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
                        {types.map((ram)=>(
                            <option key = {ram} value ={ram}>{ram}</option>
                        ))}
                       </select>
                    </div>
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Slots</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, memory:{...formData.specs.memory, slot:e.target.value}}})} value = {formData.specs.memory.slot}>
                        <option value = "" hidden >Choose slots</option>
                        {slots.map((slot)=>(
                            <option key = {slot} value ={slot}>{slot}</option>
                        ))}
                       </select>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Max Supported</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, memory:{...formData.specs.memory, maxSupported:e.target.value}}})} value = {formData.specs.memory.maxSupported}>
                        <option value = "" hidden >Maximum Capcaity</option>
                        {maxSupported.map((value)=>(
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
                        <span className = "heading_style">Slots</span>
                       <select className = "admin_form_smallest_input_style"
                        onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, storage:{...formData.specs.storage, slot:e.target.value}}})} value = {formData.specs.storage.slot}>
                        <option value = "" hidden >Choose slots</option>
                        {slots.map((slot)=>(
                            <option key = {slot} value ={slot}>{slot}</option>
                        ))}
                       </select>
                    </div>
             
                

                </div>
                </div>
                {/* 5th line ends here */}

                {/* 6th line starts */}
                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Battery & Ports Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                    
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
                        <span className = "heading_style">Ports</span>
                        <input className = "admin_form_big_input_style " type="text" id="ports" name="ports " placeholder = "Ex. thunderbolt-4, 1*HDMI 2.1"
                        onChange = {(e)=> setFormData({...formData, specs:{...formData.specs, ports:e.target.value.split(",")}})} value = {formData.specs.ports} />
                    </div>
                  
                 
             
                

                </div>
                </div>
                  
                 

                    {/* 6th line ends here */}

                 
                    
                    





            </div>


          </div>

          {/* pricing and availability  */}
           <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Pricing & Availability</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Weight (Kg)</span>
                        <input className = "admin_form_input_style " type="text" id="productName" name="productName " placeholder = "Ex. 2.14kg" onChange = {(e)=>setFormData({...formData, weightKg:e.target.value})} value = {formData.weightKg}/>
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
                        <input className = "admin_form_input_style " type="number" id="price" name="price " placeholder = "Ex. 200000" onChange = {(e)=>setFormData({...formData, price:e.target.value})} value = {formData.price} />
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

export default AddLaptopForm