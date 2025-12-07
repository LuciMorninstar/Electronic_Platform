import React from 'react'
import WidthWrapper from '../components/WidthWrapper'
import techhive from "../assets/techhive.png"


const Terms = () => {
  return (
   
    <WidthWrapper>
          <section className = " w-full flex flex-col items-center  mt-26 ">
        
                <div className = "relative flex flex-col h-max gap-5 max-w-3xl  rounded-2xl p-8 bg-secondary-color dark:bg-dark-search-bar-bg lg:p-15 shadow-lg">
        
                  {/* logo */}
        
                  <div className = "absolute top-2 left-2 w-16 h-16">
                    <img src={techhive} alt="logo"/>
                  </div>
        
                <h2 className = "text-center">Terms & Services</h2>
                <div className = "footer_link_paragraph_container">
                
<p className="footer_links_paragraph">
  Welcome to TechHive. By accessing or using our website, you agree to these Terms and Services. Please read them carefully before using our platform. If you do not agree with any part of these terms, you should stop using TechHive immediately.
</p>

<p className="footer_links_paragraph">
  TechHive is an online e-commerce platform that allows users across Nepal to browse and purchase electronic products, including laptops, monitors, mobile accessories, and other digital items. When you create an account on our website, you are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account.
</p>

<p className="footer_links_paragraph">
  All information provided on our website, such as product descriptions, pricing, and availability, is subject to change without notice. While we strive to ensure accuracy, occasional errors may occur. TechHive reserves the right to correct any mistakes, update prices, or modify product details at any time.
</p>

<p className="footer_links_paragraph">
  When placing an order, you agree to provide accurate and complete information. Your order is considered confirmed only after payment verification and order acceptance. We may cancel or refuse orders in cases of suspicious activity, incorrect pricing, product unavailability, or any reason we believe necessary to protect our platform and customers.
</p>

<p className="footer_links_paragraph">
  All products sold on TechHive are intended for personal use within Nepal. Delivery times may vary depending on your location and product availability. We are not responsible for delays caused by delivery partners or unforeseen circumstances.
</p>

<p className="footer_links_paragraph">
  Users must not misuse the website by attempting to hack, inject harmful code, disrupt the platform’s operation, or engage in fraudulent activities. Any such actions will result in the immediate termination of your account and may lead to legal action.
</p>

<p className="footer_links_paragraph">
  All content on TechHive—including images, text, logos, graphics, and layout—is owned by TechHive and may not be copied, distributed, or reused without our permission. The TechHive name and branding are protected.
</p>

<p className="footer_links_paragraph">
  We may update these Terms and Services occasionally. Continued use of TechHive after changes are made means you accept the updated terms. You are encouraged to check this page periodically for the latest version.
</p>

<p className="footer_links_paragraph">
  If you have questions regarding these Terms and Services, feel free to contact us at techhive21@gmail.com or call +977 9876423432.
</p>
                </div>
        
                </div>
        
        
              </section>
              

    </WidthWrapper>
  )
}

export default Terms