import React, { useEffect } from 'react'
import Invoice from '../components/Invoice'
import { useParams } from 'react-router-dom'
import { useOrderStore } from '../utils/useOrderStore';
import toast from 'react-hot-toast';

const AdminInvoicePage = () => {
    const { orderDetailsByInvoice, loading, getInvoiceByOrderId } = useOrderStore();
    const { orderId } = useParams();

    useEffect(() => {
        if (orderId) getInvoiceByOrderId(orderId);
    }, [orderId, getInvoiceByOrderId]); // dependency added

    // Loading or empty state handling
    if (loading) return <div className="py-20 text-center">Loading invoice...</div>;
    if (!orderDetailsByInvoice) return <div className="py-20 text-center text-red-500">No invoice found!</div>;

    return (
        <div className="mt-20">
            <Invoice order={orderDetailsByInvoice} loading={loading} />
        </div>
    );
}

export default AdminInvoicePage;
