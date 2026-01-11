import React from 'react'

const Specs = ({product}) => {
  return (


    
     <div className = 'w-full flex flex-col gap-5 '>
          <h3>Tech Specs</h3>
    
          <h4>Performance</h4>
    
          <div className = "w-full  flex flex-col">
      {/* for processor */}
         <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Processor</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.cpu || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
         {/* /processor */}
    
         {/* for display */}
    
          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Display</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.display || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
    
         {/* /display */}

        {/* for gpu */}
        
          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Graphics</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.gpu || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
         {/* /gpu */}

         {/* memory */}
         
          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Memory</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.memory || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
         {/* /memory */}

         {/* storage */}
         
          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Storage</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.storage || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
         {/* /storage */}

         {/* battery */}
          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Battery</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.battery || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div>
         {/* /battery */}

             {/* Ports and Connectivity    */}
         <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center ">Ports & Connectivity</h5>
          <ul className = "w-8/12 py-3  flex flex-row gap-15 items-center">
          <div>
            {
               product?.specs?.ports?.map((value,i)=>(
                <li key={i} className = "list_value_style">
                 <span>{value}</span>
                </li>
                
               ))
            }
            </div>
          <div>
            {
               product?.specs?.connectivity?.map((value,i)=>(
                <li key={i} className = "list_value_style">
                 <span>{value}</span>
                </li>
                
               ))
            }
            </div>
      
          </ul>
         </div>

         {/* Ports and Connectivity */}

         {/* Dimensions */}

            {/* <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Dimensions</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
               Object.entries(product?.specs?.dimensions || {}).map(([key,value],i)=>(
                <li key={i} className = "list_value_style">
                  <span className = "capitalize">{key}</span>:<span>{value}</span>
                </li>
                
               ))
            }
      
          </ul>
         </div> */}
         {/* /dimensions */}

         {/* Weight */}
            <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Weight in kg.</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
             
                <li className = "list_value_style">
                  <span>{product?.weightKg}kg</span>
                </li>
            
            }
      
          </ul>
         </div>
         {/* /Weight */}

         {/* os */}
             <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center">Operating System</h5>
          <ul className = "w-8/12 py-3  flex flex-col gap-0">
            {
             
                <li className = "list_value_style">
                  <span>{product?.operatingSystem}</span>
                </li>
            
            }
      
          </ul>
         </div>
         {/* /os */}

         {/* colors available  */}

          <div className ="specs_row_wrapper">
          <h5 className = "w-4/12 flex flex-row justify-center items-center ">Colors Available</h5>
          <ul className = "w-8/12 py-3  flex flex-row gap-15 items-center">
      
            {
               product?.colors?.map((value,i)=>(
                <li key={i} className = "list_value_style">
                 <span>{value}</span>
                </li>
                
               ))
            }
          
         
          </ul>
         </div>


         {/* /colors available  */}
         


     
         


    
    
          </div>
              
    
    
    
    
    
    
        </div>
   
  )
}

export default Specs