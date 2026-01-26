import React, { useState, useEffect } from "react";
import { useOrderStore } from "../../utils/useOrderStore";
import { Loader } from "lucide-react";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const AdminOrdersPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const gettingAllOrders = useOrderStore((state) => state.gettingAllOrders);

  const updateOrderStatus = useOrderStore((state)=>state.updateOrderStatus);

  const orderStatuses = [
    { value: "processing", label: "Processing", color: "bg-blue-500" },
    { value: "approved", label: "Approved", color: "bg-teal-500" },
    {
      value: "outForDelivery",
      label: "Out For Delivery",
      color: "bg-orange-500",
    },
    { value: "delivered", label: "Delivered", color: "bg-green-500" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
  ];

  const tableHeaders = [
    "OrderNo",
    "Customer",
    "Phone",
    "Amount",
    "Payment",
    "Payment Status",
    "Order Status",
    "Date",
    "Info",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredOrders(orders);
      } else {
        const term = searchTerm.toLowerCase();
        const filtered = orders.filter(
          (order) =>
            order.orderNo.toLowerCase().includes(term) ||
            order.deliveryDetails?.fullName.toLowerCase().includes(term),
        );
        setFilteredOrders(filtered);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer); // cleanup previous timer
  }, [searchTerm, orders]);

  return (
    <section className="max-w-7xl mx-auto px-5 text-sm pb-50 flex flex-col gap-8 items-center min-h-screen">
      <h3 className="uppercase w-full text-center translate-y-10">
        Orders History
      </h3>
      <span className="w-full text-right font-audiowide">
        Total Orders: {orders.length}
      </span>

      <div className="relative w-max flex justify-center">
        <span className="text-xl dark:text-white absolute top-1/2 right-3 -translate-y-1/2">
          <FiSearch />
        </span>
        <input
          className="searchbar"
          type="text"
          placeholder="Search By OrderNo or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {gettingAllOrders ? (
        <Loader />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="w-full bg-tertiary-color dark:bg-dark-secondary-color rounded-2xl">
              {tableHeaders.map((header, i) => (
                <th key={i} className="text-left py-3 px-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!filteredOrders || filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center py-10 text-red-600"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className=" group shadow-sm dark:even:bg-dark-search-bar-bg dark:odd:bg-dark-tertiary-color transition-all duration-300 ease-in"
                >
                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    {order.orderNo}
                  </td>
                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    {order.deliveryDetails?.fullName || "N/A"}
                  </td>
                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    {order.deliveryDetails?.phoneNo || "N/A"}
                  </td>
                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    Rs {(order.payment?.amountPaid || 0).toLocaleString()}
                  </td>
                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    {order.payment?.method === "Cash On Delivery"
                      ? "COD"
                      : order.payment?.method === "khalti"
                        ? "khalti"
                        : "N/A"}
                  </td>
                  <td className="px-5 text-sm py-3 text-left">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        order.payment?.status === "completed"
                          ? "bg-green-500"
                          : order.payment?.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    >
                      {order.payment?.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-5 text-sm py-3 text-left">
                    <select
                      value={order?.currentStatus}
                      onChange={(e) =>updateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-1 text-xs font-medium bg-transparent border dark:border-gray-600 cursor-pointer rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {orderStatuses.map((s) => (
                        <option
                          className="bg-secondary-color dark:bg-dark-search-bar-bg"
                          key={s.value}
                          value={s.value}
                        >
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 text-sm py-3 text-left group-hover:text-color-teal-500 duration-200 ease-in transition-all">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="relative px-5 text-sm py-3 text-left text-blue-500 cursor-pointer">
                    <Link to={`/admin/invoice/${order._id}`}>
                      <Info />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AdminOrdersPage;
