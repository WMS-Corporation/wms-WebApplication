
import PropTypes from "prop-types";
import React from "react";
import {ShelfProductModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";

const ProductShelfItem = ({ product, onEdit, onDelete, type }) => {
    return (
        <tr key={product._codProduct}>
            <td>{product._codProduct}</td>
            <td>{product._stock}</td>
            {type === "Admin" ? (
                <td className="action">
                    <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(product)}/></div>
                    <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(product._codProduct)}/></div>
                </td>
            ) : null}
        </tr>
    );
};

ProductShelfItem.propTypes = {
    product: PropTypes.instanceOf(ShelfProductModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default ProductShelfItem;