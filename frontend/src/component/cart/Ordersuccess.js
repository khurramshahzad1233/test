import React from "react";
import {CheckCircle }from "@mui/icons-material";
import "./Ordersuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Ordersuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default Ordersuccess;

