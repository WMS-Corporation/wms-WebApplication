import {FaEye} from "react-icons/fa";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {StorageModel} from "../../models/logisticModel";
import { getZones} from "../../controllers/LogisticController";

const StorageItem = ({ storage, onView }) => {
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
                <div className="view"><FaEye className="view-icon" onClick={() => onView(zones, storage._codStorage)}/></div>
            </td>
        </tr>
    );
};

StorageItem.propTypes = {
    storage: PropTypes.instanceOf(StorageModel).isRequired,
    onView: PropTypes.func.isRequired,
};

export default StorageItem;