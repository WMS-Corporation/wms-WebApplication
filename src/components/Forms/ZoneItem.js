import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import { ZoneModel} from "../../models/logisticModel";
import {FiEdit2} from "react-icons/fi";
import {MdDeleteOutline} from "react-icons/md";
import {getCorridors, getZones} from "../../controllers/LogisticController";

const ZoneItem = ({ zone, onSave, onEdit, onDelete, onView }) => {

    const [corridors, setCorridors] = useState(null)
    const loadCorridors = async () => {
        const result = await getCorridors(zone._codZone);
        setCorridors(result);
    };

    useEffect(() => {
        loadCorridors();
    }, []);

    return (
        <tr key={zone._codZone}>
            <td>{zone._codZone}</td>
            <td>{zone._temperature}</td>
            <td>{zone._coolingSystemStatus}</td>
            <td>{zone._humidityLevel}</td>
            <td>{zone._corridorCodeList.length}</td>
            <td className="action">
                <div className="view"><FaEye className="view-icon" onClick={() => onView(corridors, zone._codZone)}/></div>
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(zone)}/></div>
                <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(zone)}/></div>
            </td>
        </tr>
    );
};

ZoneItem.propTypes = {
    zone: PropTypes.instanceOf(ZoneModel).isRequired,
    onView: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ZoneItem;