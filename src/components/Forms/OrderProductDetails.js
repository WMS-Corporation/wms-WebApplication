import PropTypes from "prop-types";
import {ProductOrderModel} from "../../models/orderModel";
import React from "react";

const OrderProductDetails = ({product}) => {
    return (
        <tr key={product._codProduct}>
            <td>{product._codProduct}</td>
            <td>{product._quantity}</td>
        </tr>
    );
};

OrderProductDetails.propTypes = {
    product: PropTypes.instanceOf(ProductOrderModel).isRequired
};

export default OrderProductDetails;