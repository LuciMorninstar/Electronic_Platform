import React, { useRef } from 'react';
import { BsPrinter } from "react-icons/bs";
import { useReactToPrint } from 'react-to-print';

const Invoice = ({ loading, order }) => {
  // Subtotal
  const subTotal = order?.items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;

  // Shipping fee: 150 if city is Kathmandu, Bhaktapur, Lalitpur
  const shippingFee = ["Kathmandu", "Bhaktapur", "Lalitpur"].includes(order?.deliveryDetails?.city)
    ? 150
    : 0;

  const grandTotal = subTotal + shippingFee;

  const table_headers = ["S.No.#", "Products", "Quantity", "Unit Cost", "Total"];

  // Ref for printing
  const printRef = useRef();

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `invoice-${order?._id}`,
  });

  return (
    <section className="max-w-7xl mx-auto  px-5 flex flex-col gap-8 items-center min-h-screen">
      <div ref={printRef} className="w-full bg-primary-color dark:bg-dark-secondary-color min-h-screen rounded-xl">
        {/* Invoice Header */}
        <div className="flex flex-row justify-between items-center px-5 py-5 border-b border-gray-200 dark:border-gray-800">
          <h5 className="font-opensans">Invoice</h5>
          <span className="font-semibold">{order?.orderNo}</span>
        </div>

        {/* To and From */}
        <div className="w-full flex max-sm:flex-col sm:flex-row items-center px-10 py-8 gap-5">
          {/* From */}
          <div className="w-1/2 flex flex-col gap-4 max-sm:border-b max-sm:pb-5 sm:border-r border-gray-200 dark:border-gray-800">
            <span className="invoice_small_text">From</span>
            <h6 className="font-semibold text-font-white">TechHive Pvt.Ltd</h6>
            <span className="invoice_smallest_text">
              Ward-16, Balaju Chowk, <br /> Kathmandu, Nepal
            </span>
            <span className="invoice_small_text">Issued On:</span>
            <span className="invoice_smallest_text">
              {new Date(order?.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* To */}
          <div className="w-1/2 flex flex-col gap-4 sm:text-end">
            <span className="invoice_small_text">To</span>
            <h6 className="font-semibold text-font-white">{order?.deliveryDetails?.fullName}</h6>
            <span className="invoice_smallest_text">
              {order?.deliveryDetails?.colony || ""}, {order?.deliveryDetails?.city || ""}, {order?.deliveryDetails?.region || ""},<br />
              {order?.deliveryDetails?.houseNo || ""}, {order?.deliveryDetails?.address || ""}
            </span>
            <span className="invoice_small_text">Due On:</span>
           <span className="invoice_smallest_text">
            {order?.createdAt
              ? new Date(new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
              : ""}
          </span>
          </div>
        </div>

        {/* Items Table */}
        <div className="w-full px-10 py-5">
          <table className="w-full" border="1">
            <thead>
              <tr className="bg-secondary-color dark:bg-dark-search-bar-bg">
                {table_headers.map((header) => (
                  <th key={header} className="px-3 py-3 text-start">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order?.items?.map((item, i) => (
                <tr key={i} className="bg-tertiary-color dark:odd:bg-dark-search-bar-bg dark:even:bg-dark-tertiary-color">
                  <td className="px-3 py-4 text-start">{i + 1}</td>
                  <td className="px-3 py-4 text-start">{item?.name || ""}</td>
                  <td className="px-3 py-4 text-start">{item?.quantity || ""}</td>
                  <td className="px-3 py-4 text-start">{item?.price || ""}</td>
                  <td className="px-3 py-4 text-start">{item?.total || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="w-full px-10 py-5 flex max-sm:justify-center sm:justify-end">
          <div className="w-full max-w-md ml-auto bg-secondary-color dark:bg-dark-search-bar-bg p-4 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="invoice_small_text">Sub Total:</span>
              <span className="font-semibold">Rs. {subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="invoice_small_text">Shipping Fee:</span>
              <span className="font-semibold">Rs. {shippingFee}</span>
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <span className="invoice_small_text">Grand Total:</span>
              <span className="font-semibold">Rs. {grandTotal}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="invoice_small_text">Order Status:</span>
              <span className="font-semibold">{order?.currentStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="w-full px-10 py-5 flex flex-row justify-center sm:justify-end gap-5">
        <button
          onClick={handlePrint}
          className="flex flex-row gap-3 items-center px-6 py-3 border border-gray-400 dark:border-gray-700 rounded-md dark:text-font-white font-poppins font-semibold transition-all duration-300 ease-in cursor-pointer"
        >
          <BsPrinter />
          <span>Print Invoice</span>
        </button>
      </div>
    </section>
  );
};

export default Invoice;
