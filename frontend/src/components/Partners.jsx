import React from 'react'
import { SiAsus,SiLenovo,SiDell,SiSamsung,SiApple,SiRazer,SiAcer } from "react-icons/si";
import { GrHpi } from "react-icons/gr";
import WidthWrapper from './WidthWrapper';

const Partners = () => {

  const BrandPartners = [
    {name:"Asus", logo:<SiAsus />},
    {name:"Lenovo", logo:<SiLenovo />},
    {name:"Dell", logo:<SiDell />},
    {name:"Samsung", logo:<SiSamsung />},
    {name:"Apple", logo:<SiApple />},
    {name:"Razer", logo:<SiRazer />},
    {name:"Acer", logo:<SiAcer />},
    {name:"Hp", logo:<GrHpi />},


  ]


  return (
    <WidthWrapper>
  <section className = "flex flex-col gap-5">
    <h3 className = "uppercase">Our Partners</h3>
    
<div className="w-full overflow-hidden">
  <div className="card-container w-max  gap-10">
    {[...BrandPartners, ...BrandPartners].map((b, i) => (
      <div key={i}>
        <span className="text-7xl">{b.logo}</span>
      </div>
    ))}
  </div>
</div>
 </section>   
    </WidthWrapper>
  )
}

export default Partners