import React from 'react'
import WidthWrapper from '../components/WidthWrapper'
import techhive from "../assets/techhive.png"

const Privacy = () => {
  return (
    <WidthWrapper>

      <section className = " w-full flex flex-col items-center  mt-26 ">

        <div className = "relative flex flex-col h-max gap-5 max-w-3xl  rounded-2xl p-8 bg-secondary-color dark:bg-dark-search-bar-bg lg:p-15 shadow-lg">

          {/* logo */}

          <div className = "absolute top-2 left-2 w-16 h-16">
            <img src={techhive} alt="logo"/>
          </div>

        <h2 className = "text-center">Privacy Policy</h2>
        <div className = "footer_link_paragraph_container">
          <p clasName = "footer_links_paragraph">
          At TechHive, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you browse or make purchases on our platform.
          </p>
 <p clasName = "footer_links_paragraph">
When you create an account, place an order, or interact with our website, we may collect personal details such as your name, email address, phone number, delivery address, and payment information. This information is used to process your orders, provide a personalized shopping experience, and communicate updates related to your account or purchases.</p>

 <p clasName = "footer_links_paragraph">

We may also collect technical information such as your IP address, browser type, and device information to improve our website performance and ensure security. TechHive uses cookies and similar technologies to enhance your browsing experience, remember your preferences, and show relevant product recommendations.
</p>
 <p clasName = "footer_links_paragraph">

Your information is never sold to third parties. We may share it only with trusted service providers involved in order delivery, payment processing, or website maintenance. In cases required by law or to protect our rights, we may disclose certain information to authorities.
</p>
 <p clasName = "footer_links_paragraph">

We take data security seriously and implement measures to protect your personal information from unauthorized access, alteration, or misuse. You can update your account information, manage your communication preferences, and request deletion of your data by contacting us directly.
</p>
 <p clasName = "footer_links_paragraph">

By using TechHive, you agree to the practices outlined in this Privacy Policy. We may update this policy occasionally, and the latest version will always be available on our website.
</p>
        </div>

        </div>


      </section>
      
    </WidthWrapper>
  )
}

export default Privacy