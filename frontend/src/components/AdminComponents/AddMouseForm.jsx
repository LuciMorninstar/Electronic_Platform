import React from 'react'
import {useState} from "react"

import { FaArrowRight } from "react-icons/fa";

import gsap from "gsap"
import { useGSAP } from '@gsap/react';




import { useProductStore } from '../../utils/useProductStore';




const AddMouseForm = () => {



      const brands = ["Logitech", "Razer", "SteelSeries", "Corsair", "ASUS", "MSI", "HyperX",  "Cooler Master", "Redragon", "HP", "Dell", "Lenovo", "Apple",  "Xiaomi", "Fantech"];
       
    const connectivity = ["USB 2.0 (Type-A)", "USB-C", "USB-C to USB-A", "2.4GHz Wireless (USB Dongle)", "Bluetooth", "Bluetooth LE", "Dual Mode (2.4GHz + Bluetooth)", "Tri Mode (Wired + 2.4GHz + Bluetooth)", "PS/2"];
      

  
     const auraSync = ['Yes', 'No'];
   
    
 
     
    

    
      //warranty
        const warrantyMonths = ["6 ","12","18 ","24","36"];
        // operatingsystem\
        const os = ["Windows 11", "Windows 10", "Windows 7"];
        



    

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

  const [formData, setFormData] = useState({name:"", category:"mouse", brand:"", releaseDate:"", sku:"", features:[], shortDescription:"", images:[], 
    specs:{
        sensor:"",
        connectivity:"",
        maxSpeed:"",
        maxAcceleration:"",
        resolution:"",
        usbRate:"",
        auraSync:"",
    

        button:{
             buttonCount:"",
            clickCount:""

        },
     
        software:{
            softName:"",
          
        },
        other:{
            dimension:"",
            contents:[],


        }

    },

    weightKg:"", warrantyMonths:"", operatingSystem:"", tags:[], colors:[], stock:"", price:""});

const {addProduct} = useProductStore();

  const handleFormSubmit =(e)=>{
    e.preventDefault();

    console.log("AddMouseForm", formData);

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
          <h3 className = "dark:border-b py-2  dark:border-gray-800 px-8 rounded-full">Add a Mouse</h3>
                 {/* product description start */}
          <div className = "flex flex-col gap-4">
            <h5 className = "heading_style">Product Description</h5>

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-8 xl:py-8">
               {/* first line */}
                <div className = "flex flex-col lg:flex-row gap-5">
                  
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Product Name</span>
                        <input className = "admin_form_input_style " type="text" id="name" name="name" placeholder = "Ex. Aerox 5 Wireless" 
                        onChange = {(e)=>setFormData({...formData, name:e.target.value})} value = {formData.name}/>
                    </div>
                    <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Category</span>
                        <input className = "admin_form_small_input_style " type="text" id="category" name="category" placeholder = "Enter Category" value="mouse" />
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
                            <input className = "admin_form_full_input_style " type="text" id="features" name="features " placeholder = "STUNNING RGB,ULTRA LIGHTWEIGHT"
                            onChange = {(e)=>setFormData({...formData, features:e.target.value.split(",")})} value = {formData.features} />
                        </div>
                    <div className = "flex flex-col gap-1">
                        <span>Description</span>
                        <textarea className = "admin_form_full_input_style " type="text" id="shortDescription" name="shortDescription " placeholder = "Ex. This mouse is ...." onChange = {(e)=>setFormData({...formData, shortDescription:e.target.value})} value = {formData.shortDescription} />
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

            <div className = "flex flex-col gap-4 bg-tertiary-color dark:bg-dark-search-bar-bg rounded-xl shadow-md px-4 py-4 xl:px-16 xl:py-12">
               {/* first line */}
               <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Mouse Details:</span>
                {/* 1st part of display */}
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                   
                  

                     <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Sensor</span>
                        <input className = "admin_form_small_input_style " type="text" id="sensor" name="sensor" placeholder = "PAW8000"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  sensor:e.target.value}})} value = {formData.specs.sensor} 
                         />
                    </div>

                        <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Connectivity</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  connectivity:e.target.value}})} value = {formData.specs.connectivity}>
                        <option value = "" hidden >Choose Connectivity</option>
                        {connectivity.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>
                  
                 

                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Max Speed</span>
                        <input className = "admin_form_smallest_input_style " type="text" id="maxSpeed" name="maxSpeed" placeholder = "150"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  maxSpeed:e.target.value}})} value = {formData.specs.maxSpeed} 
                         />
                    </div>

                        <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Max Acceleration</span>
                        <input className = "admin_form_smallest_input_style " type="text" id="maxAcceleration" name="maxAcceleration" placeholder = "30g"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  maxAcceleration:e.target.value}})} value = {formData.specs.maxAcceleration} 
                         />
                    </div>


               

                </div>
                 {/* 1st part ends */}

                    {/* 2nd part  */}

                   <div className = "flex flex-col lg:flex-row gap-5">

                      
                      <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Resolution</span>
                        <input className = "admin_form_smallest_input_style " type="text" id="resolution" name="resolution" placeholder = "5000"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  resolution:e.target.value}})} value = {formData.specs.resolution} 
                         />
                    </div>
                   
                  
                  <div className = "flex flex-col gap-1">
                        <span className = "heading_style">USB Report rate</span>
                        <input className = "admin_form_smallest_input_style " type="text" id="usbRate" name="usbRate" placeholder = "1000Hz"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  usbRate:e.target.value}})} value = {formData.specs.usbRate} 
                         />
                    </div>

                        <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Aura Sync</span>
                       <select className = "admin_form_smallest_input_style"
                       onChange = {(e)=>setFormData({...formData, specs:{...formData.specs,  auraSync:e.target.value}})} value = {formData.specs.auraSync}>
                        <option value = "" hidden >Choose Aura Sync</option>
                        {auraSync.map((value)=>(
                            <option key = {value} value ={value}>{value}</option>
                        ))}
                       </select>
                    </div>

                  
                 

                 

                </div>

                {/* 2nd part ends */}

                
                </div>
                {/* first line ends */}
         

               

            
          



          

         

                {/* 6th line starts here */}


                   <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Button Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  
                            
                  <div className = "flex flex-col gap-1">
                        <span className = "heading_style">Buttons (No.)</span>
                        <input className = "admin_form_smallest_input_style " type="text" id="buttonCount" name="buttonCount" placeholder = "6"  onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, button:{...formData.specs.button,buttonCount:e.target.value}}})} value = {formData.specs.button.buttonCount} 
                         />
                    </div>

                  
                         <div className = "flex flex-col gap-1">
                            <span className = "heading_style">Click Life (Count)</span>
                            <input className = "admin_form_small_input_style " type="text" id="clickCount" name="clickCount " placeholder = "20million clicks"
                            onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, button:{...formData.specs.button, clickCount:e.target.value}}})} value = {formData.specs.button.clickCount} />
                        </div>
                  
               
               
                
              

                </div>
                </div>

                {/* 6th line ends  */}


                
                {/* 8th line starts */}
                  <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Software Details</span>
                <div className = "flex flex-col lg:flex-col gap-1">
                   
                  <div className = "flex flex-row gap-5">
                    
                  

                 <div className = "flex flex-col gap-1">
                            <span className = "heading_style">software Name</span>
                            <input className = "admin_form_small_input_style " type="text" id="softName" name="softName " placeholder = "Armoury Crate"
                            onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, software:{...formData.specs.software, softName:e.target.value}}})} value = {formData.specs.software.softName} />
                        </div>


                    
                  
                    </div>

                    <div>

                 

                    
                    </div>
                    
                  
                 
             
                

                </div>
                </div>
                  
                 

                    {/* 8th line ends here */}





                {/* 7th line starts here */}

                
                   <div className = "flex flex-col gap-3 items-start">
                <span className = " font-semibold">Other Details:</span>
                <div className = "flex flex-col lg:flex-row gap-5">
                   
                  

                  
                     
                         <div className = "flex flex-col gap-1">
                            <span className = "heading_style">Dimensions</span>
                            <input className = "admin_form_small_input_style " type="text" id="dimension" name="dimension " placeholder = "123*68*40 mm "
                            onChange ={(e)=>setFormData({...formData, specs:{...formData.specs, other:{...formData.specs.other, dimension:e.target.value}}})} value = {formData.specs.other.dimension} />
                        </div>

                        
                         <div className = "flex flex-col gap-1">
                            <span className = "heading_style">Contents</span>
                            <input className = "admin_form_small_input_style " type="text" id="contents" name="contents " placeholder = "Ex. Detachable Microphone, User Guide"
                            onChange = {(e)=>setFormData({...formData, specs:{...formData.specs, other:{...formData.specs.other.contents, contents:e.target.value.split(",")}}})} value = {formData.specs.other.contents.join(",")} />
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
                        <span className = "heading_style">Weight </span>
                        <input className = "admin_form_input_style " type="text" id="weightKg" name="weightKg " placeholder = "Ex. 75" onChange = {(e)=>setFormData({...formData, weightKg:e.target.value})} value = {formData.weightKg}/>
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
                        <input className = "admin_form_input_style " type="number" id="price" name="price " placeholder = "Ex. 2000" onChange = {(e)=>setFormData({...formData, price:e.target.value})} value = {formData.price} />
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

export default AddMouseForm;