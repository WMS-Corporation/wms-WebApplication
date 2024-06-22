
import PropTypes from "prop-types";
import React from "react";
import {ShelfModel, ZoneModel} from "../../models/logisticModel";
import ZoneItem from "./ZoneItem";
import ShelfItem from "./ShelfItem";

const ShelfList = ({ shelfs, onAdd, onSave, onEdit, onDelete, onView, onError, onBack }) => {
    onError(null)
    console.log(shelfs)
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Shelf List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Shelf
                </button>
            </div>
            <div className="table-task">
                <table>
                    <thead>
                    <tr>
                        <th>Shelf Code</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shelfs.map((shelf) => (
                        <ShelfItem key={shelf._codShelf} shelf={shelf}
                                  onSave={onSave} onEdit={onEdit} onDelete={onDelete} onView={onView}/>
                    ))}
                    </tbody>
                </table>
                <button className="btn-Back" type="submit" onClick={() => onBack(shelfs)}>Back To Corridor</button>
            </div>
        </div>
    );
};

ShelfList.propTypes = {
    shelfs: PropTypes.arrayOf(PropTypes.instanceOf(ShelfModel)).isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ShelfList;