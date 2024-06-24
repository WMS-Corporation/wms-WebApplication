import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";

const ProductShelfItem = ({ product, onSave, onEdit, onDelete }) => {

    return (
        <tr key={product._codProduct}>
            <td>{product._codProduct}</td>
            <td>{product._stock}</td>
            <td className="action">
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(product)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(product)}/>
                </div>

            </td>
        </tr>
    );
};

ProductShelfItem.propTypes = {
    product: PropTypes.instanceOf(ShelfProductModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProductShelfItem;