import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";
import { ShelfModel, ShelfProductModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";

const ShelfItem = ({ shelf, onEdit, onDelete, onView, type }) => {
    return (
        <tr key={shelf._codShelf}>
            <td>{shelf._codShelf}</td>
            <td>{shelf._name}</td>
            <td>{shelf._productList.length}</td>
            <td className="action">
                <div className="view"><FaEye className="view-icon" onClick={() => onView(shelf._productList.map(product => new ShelfProductModel(product._codProduct, product._stock)), shelf)}/></div>
                {type === "Admin" ? (
                    <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(shelf)}/></div>
                ) : null}
                {type === "Admin" ? (
                    <div className="delete"><MdDeleteOutline className="delete-icon"
                                                             onClick={() => onDelete(shelf._codShelf)}/></div>
                ) : null}
            </td>
        </tr>
    );
};

ShelfItem.propTypes = {
    shelf: PropTypes.instanceOf(ShelfModel).isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default ShelfItem;