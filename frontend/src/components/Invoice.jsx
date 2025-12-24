import React from 'react'
import { BsPrinter } from "react-icons/bs";

import { useRef } from 'react';
import {useReactToPrint} from "react-to-print"




const Invoice = () => {


    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () =>printRef,
        documentTitle :"invoice-techhive",


    })


    const table_headers = ["S.No.#", "Products", "Quantity", "Unit Cost", "Total"];

    const orderInvoice = {
  orderId: "ORD-348",
  invoiceId: "INV-348",

  orderDates: {
    orderedOn: "11 March, 2027",
    deliveryBy: "16 March, 2027"
  },

  orderAddress: {
    fullName: "Albert Word",
    phone: "98XXXXXXXX",
    street: "355, Shobe Lane",
    city: "Fort Collins",
    state: "Colorado",
    zipCode: "80543",
    country: "Nepal"
  },

  orderItems: [
    {
      productId: "P-001",
      productName: "Macbook Pro 13”",
      quantity: 1,
      unitPrice: 1200,
      total: 1200
    },
    {
      productId: "P-002",
      productName: "Apple Watch Ultra",
      quantity: 1,
      unitPrice: 300,
      total: 300
    },
    {
      productId: "P-003",
      productName: "iPhone 15 Pro Max",
      quantity: 3,
      unitPrice: 800,
      total: 2400
    },
    {
      productId: "P-004",
      productName: "iPad Pro 3rd Gen",
      quantity: 1,
      unitPrice: 900,
      total: 900
    }
  ],

  pricing: {
    subTotal: 4800,
    vatPercent: 10,
    vatAmount: 480,
    grandTotal: 5280,
    currency: "NRS"
  },

  payment: {
    method: "Cash on Delivery",
    status: "Pending"
  },

  orderStatus: "Processing"
};

  return (
    <section className = "max-w-7xl mx-auto py-10 px-5 flex flex-col gap-8 items-center min-h-screen ">
    
    <div ref = {printRef} className = "w-full  bg-primary-color dark:bg-dark-secondary-color min-h-screen rounded-xl ">
        {/* headers of invoice */}
        <div className = "flex flex-row justify-between items-center px-5 py-5 border-b border-gray-200 dark:border-gray-800 ">
            <h5 className = "font-opensans">Invoice </h5>
            <span className = "font-semibold">{orderInvoice.orderId}</span>
        </div>
        {/* /headers of invoice */}

        {/* invoice details */}
    <div>

        {/* to and from  */}

        <div className = " w-full  flex max-sm:flex-col sm:flex-row items-center px-10 py-8 gap-5">
            {/* 1st div */}
            <div className =" w-1/2 flex flex-col gap-4 max-sm:border-b max-sm:pb-5 sm:border-r border-gray-200 dark:border-gray-800">
                <div className = "flex flex-col gap-1">
                <span className =" invoice_small_text">From</span>
                <h6 className =  "font-semibold text-font-white ">TechHive Pvt.Ltd</h6>
                </div>
                <div className = "flex flex-col gap-0">
                    <span className = "invoice_smallest_text">Ward-16, Balaju Chowk,
                       <br></br>  Kathmandu, Nepal</span>

                </div>

                <div className = "flex flex-col gap-1">
                    <span className = "invoice_small_text">Issued On:</span>
                    <span className = "invoice_smallest_text">{orderInvoice.orderDates.orderedOn}</span>

                </div>

            </div>

            {/* 2nd div */}
                <div className =" w-1/2 flex flex-col gap-4 sm:text-end">
                <div className = "flex flex-col gap-1">
                <span className =" invoice_small_text">To</span>
                <h6 className =  "font-semibold text-font-white ">{orderInvoice.orderAddress.fullName}</h6>
                </div>
                <div className = "flex flex-col gap-0">
                    <span className = "invoice_smallest_text">{orderInvoice.orderAddress.street},{orderInvoice.orderAddress.city}, {orderInvoice.orderAddress.state},<br></br> {orderInvoice.orderAddress.zipCode}, {orderInvoice.orderAddress.country}</span>

                </div>

                <div className = "flex flex-col gap-1">
                    <span className = "invoice_small_text">Due On:</span>
                    <span className = "invoice_smallest_text">{orderInvoice.orderDates.deliveryBy}</span>

                </div>

                 </div>
              {/* /2nd div ends    */}

           


        </div>
        {/* /to and from ends */}


    </div>
      

         <div className = "w-full px-10 py-5 ">
            <table className="w-full bg-green-500 " border = "1">
                <thead>
                <tr className = "w-full bg-secondary-color dark:bg-dark-search-bar-bg">
                    {table_headers.map((header)=>(
                        <th className = " px-3 py-3 text-start" key = {header}>{header}</th>
                    ))}
              
                </tr>
                </thead>
                {orderInvoice.orderItems.map((item,i)=>(
                    <tr className = "w-full bg-tertiary-color shadow-md dark:odd:bg-dark-search-bar-bg dark:even:bg-dark-tertiary-color">
                        <td className = "px-3 py-4 text-start">{i+1}</td>
                        <td className = "px-3 py-4 text-start">{item.productName}</td>
                        <td className = "px-3 py-4 text-start">{item.quantity}</td>
                        <td className = "px-3 py-4 text-start">{item.unitPrice}</td>
                        <td className = "px-3 py-4 text-start">{item.total}</td>
                        


                    </tr>
                ))}

            </table>
          </div>
            {/* /invoice details */}


            {/* Totals */}


          <div className= " px-10  py-5 flex max-sm:justify-center sm:justify-end">
            <div className = "flex flex-col gap-3">
                <span className = "invoice_small_text">Sub Total Amount: {orderInvoice.orderItems.reduce((total, item) => total + item.total, 0)}</span>
                <span className = "invoice_small_text">Vat 13%: {orderInvoice.orderItems.reduce((total, item) => total + item.total, 0) * 0.13}</span>
                <span className = "invoice_small_text">Total Amount: Rs. {orderInvoice.orderItems.reduce((total, item) => total + item.total, 0) + (orderInvoice.orderItems.reduce((total, item) => total + item.total, 0) * 0.13)}</span>

            </div>
                
          </div>

          {/* /totals */}

            {/* buttons */}
            <div className = "w-full px-10 py-5 flex flex-row  justify-center sm:justify-end gap-5 ">


                <button className = " px-6 py-3 bg-color-teal-500 rounded-md dark:text-font-white font-poppins font-semibold hover:bg-teal-600 active:bg-teal-600 transition-all duration-300 ease-in cursor-pointer">Proceed to payment
                </button>
                <button onClick={handlePrint} className = "flex flex-row gap-3 items-center px-6 py-3 border border-gray-400 dark:border-gray-700 rounded-md dark:text-font-white font-poppins font-semibold  transition-all duration-300 ease-in cursor-pointer"><BsPrinter />
<span>Print Invoice</span>
                </button>
            
       
          </div>
          {/* /buttons */}
        

    </div>

    </section>
  
  )
}

export default Invoice