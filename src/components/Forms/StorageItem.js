import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {StorageModel} from "../../models/logisticModel";
import { getZones} from "../../controllers/LogisticController";
import {MdDeleteOutline} from "react-icons/md";

const StorageItem = ({ storage, onView, onDelete, type }) => {
    const [zones, setZones] = useState(null)
    const loadZones = async () => {
        const result = await getZones(storage._codStorage);
        setZones(result);
    };

    useEffect(() => {
        loadZones();
    }, []);

    return (
        <tr key={storage._codStorage}>
            <td>{storage._codStorage}</td>
            <td>{storage._zoneCodeList.length}</td>
            <td className="action">
                <div className="view"><FaEye className="view-icon" onClick={() => onView(zones, storage)}/>
                </div>
                {type === "Admin" ? (
                    <div className="delete"><MdDeleteOutline className="delete-icon"
                                                             onClick={() => onDelete(storage._codStorage)}/></div>
                ) : null}
            </td>
        </tr>
    );
};

StorageItem.propTypes = {
    storage: PropTypes.instanceOf(StorageModel).isRequired,
    onView: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default StorageItem;