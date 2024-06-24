import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {CorridorModel, ZoneModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {getShelfs} from "../../controllers/LogisticController";

const CorridorItem = ({ corridor, onSave, onEdit, onDelete, onView }) => {
    const [shelfs, setShelfs] = useState(null)
    const loadShelf = async () => {
        const result = await getShelfs(corridor._codCorridor);
        setShelfs(result);
    };

    useEffect(() => {
        loadShelf();
    }, []);

    return (
        <tr key={corridor._codCorridor}>
            <td>{corridor._codCorridor}</td>
            <td>{corridor._name}</td>
            <td>{corridor._shelfCodeList.length}</td>
            <td className="action">
                <div className="view"><FaEye className="view-icon" onClick={() => onView(shelfs, corridor._codCorridor)}/></div>
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(corridor)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(corridor)}/></div>
            </td>
        </tr>
    );
};

CorridorItem.propTypes = {
    corridor: PropTypes.instanceOf(CorridorModel).isRequired,
    onView: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CorridorItem;