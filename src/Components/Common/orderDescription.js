import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/contants';


const OrderDescription = ({ handlePlaceOrderClick, setShowOpenDescModal, showOrderDescModal, handleCloseOrderDetail, orderID }) => {
    const navigate = useNavigate()
    const [orderDetail, setOrderDetail] = useState({}); // Change from [] to {}
    const userType = localStorage.getItem('userType')
    console.log("userType", userType);
    const getOrderByID = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/orders/get/orders/${id}`);
            return response.data.orders[0];
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrderByID(orderID);
            console.log("data", data);
            setOrderDetail(data || {}); // Use {} as default if data is undefined
        };

        fetchData();
    }, [orderID]);

    console.log("orderDetail", orderDetail);
    const handlePayStripe = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/payments/checkout`, {
                orderId: orderDetail._id || "64ebb2c684bc131e702e6b42",
                seller: orderDetail.seller || "64d205cef819b53c9460218f",
                buyer: orderDetail.buyer || "64d279a12e89af0f58a248f6",
                gig: orderDetail.gig || "64d20921f819b53c946021f6"
            });
            console.log("Payment response:", response.data.url);
            window.location.href = response.data.url;
            setOrderDetail(false)
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <Dialog open={showOrderDescModal}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Describe Your Task Briefly To The Seller
                </DialogContentText>
                <Typography variant="body1">
                    <strong>Description:</strong> {orderDetail.description}
                </Typography>
                <Typography variant="body1">
                    <strong>Duration:</strong> {orderDetail.duration}
                </Typography>
                {/* <Typography variant="body1">
          <strong>Seller:</strong> {orderDetail.seller}
        </Typography> */}
                {/* <Typography variant="body1">
          <strong>Gig:</strong> {orderDetail.gig}
        </Typography> */}
                <Typography variant="body1">
                    <strong>Budget:</strong> ${orderDetail.budget}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    size="medium"
                    variant="outlined"
                    onClick={handleCloseOrderDetail}
                >
                    Cancel
                </Button>
                {userType === "customer" && orderDetail?.status !== 'PAID' &&

                    <Button
                        size="medium"
                        variant="outlined"
                        onClick={handlePayStripe}
                    >
                        Place Order
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default OrderDescription;
