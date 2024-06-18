
import PropTypes from "prop-types";
import {ProductTaskModel} from "../../models/taskModel";
import React from "react";
const TaskProductDetail = ({product}) => {
    return (
        <tr key={product._codProduct}>
            <td>{product._codProduct}</td>
            <td>
                {product._from ? (
                    product._from
                ) : (
                    "Outside"
                )}
            </td>
            <td>
                {product._to ? (
                    product._to
                ) : (
                    "Outside"
                )}
            </td>
            <td>{product._quantity}</td>
        </tr>
    );
};

TaskProductDetail.propTypes = {
    product: PropTypes.arrayOf(PropTypes.instanceOf(ProductTaskModel)).isRequired
};

export default TaskProductDetail;