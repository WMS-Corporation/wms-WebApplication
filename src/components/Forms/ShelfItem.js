import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {CorridorModel, ShelfModel, ShelfProductModel, ZoneModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {getProduct, getShelfs} from "../../controllers/LogisticController";

const ShelfItem = ({ shelf, onSave, onEdit, onDelete, onView }) => {
    console.log(shelf._productList)
    return (
        <tr key={shelf._codShelf}>
            <td>{shelf._codShelf}</td>
            <td>{shelf._name}</td>
            <td>{shelf._productList.length}</td>
            <td className="action">
                <div className="view"><FaEye className="view-icon" onClick={() => onView(shelf._productList.map(product => new ShelfProductModel(product._codProduct, product._stock)))}/></div>
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(shelf)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(shelf)}/></div>
            </td>
        </tr>
    );
};

ShelfItem.propTypes = {
    shelf: PropTypes.instanceOf(ShelfModel).isRequired,
    onView: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ShelfItem;