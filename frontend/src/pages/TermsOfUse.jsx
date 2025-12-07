import React from 'react'
import WidthWrapper from '../components/WidthWrapper'
import techhive from "../assets/techhive.png"

const TermsOfUse = () => {
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
        <p className="footer_links_paragraph">
  By accessing and using the TechHive website, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, please discontinue using the platform immediately.
</p>

<p className="footer_links_paragraph">
  TechHive provides an online platform where users across Nepal can browse and purchase electronic products such as laptops, monitors, mobile accessories, and other tech-related items. You must use the website only for lawful purposes and in accordance with these terms.
</p>

<p className="footer_links_paragraph">
  You are responsible for maintaining the confidentiality of your account, including your username and password. Any activity carried out using your account will be considered your responsibility. If you suspect unauthorized use, you must notify us immediately.
</p>

<p className="footer_links_paragraph">
  All content displayed on TechHive—including product descriptions, pricing, images, logos, and layout—is the property of TechHive and is protected by copyright and intellectual property laws. You may not copy, modify, distribute, or reuse any part of the website without our permission.
</p>

<p className="footer_links_paragraph">
  You may not attempt to disrupt the functioning of the website by introducing harmful software, hacking, or engaging in fraudulent activities. Any such actions will result in immediate account termination and may lead to legal action.
</p>

<p className="footer_links_paragraph">
  While we strive to provide accurate product information, occasional errors or inaccuracies may appear. TechHive reserves the right to correct such information, update content, or make changes to the website at any time without notice.
</p>

<p className="footer_links_paragraph">
  TechHive may update or modify these Terms of Use periodically. Your continued use of the website after changes have been posted indicates your acceptance of the updated terms. We encourage you to review this page regularly.
</p>

<p className="footer_links_paragraph">
  If you have questions or concerns about these Terms of Use, please contact us at techhive21@gmail.com or call +977 9876423432.
</p>
        </div>

        </div>


      </section>
      
    </WidthWrapper>
  )
}

export default TermsOfUse