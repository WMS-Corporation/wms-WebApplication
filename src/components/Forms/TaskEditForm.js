import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import '../styles/TaskEdit.css';

const TaskEditForm = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = React.useState(task);

  const handleChange = (event) => {
    if (event.target.name === "_date" && !event.target.value) {
        return;
    }
    setEditedTask({
        ...editedTask,
        [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(editedTask);
  };

  return (
    <div className="edit-page">
        <div className="header-edit">
            <h1>Edit Task</h1>
        </div>
        <div className="body-edit">
            <form onSubmit={handleSubmit}>
                <div className="content-edit">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Operator Code *</label>
                            <input className="form-control" type="text" name="_codOperator" value={editedTask._codOperator}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Date *</label>
                            <input className="form-control" type="date" name="_date"
                                   value={new Date(editedTask._date).toISOString().split('T')[0]} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Type *</label>
                            <input className="form-control" type="text" name="_type"
                                   value={editedTask._type} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Status *</label>
                            <input className="form-control" type="text" name="_status"
                                   value={editedTask._status} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <button className="btn-Submit" type="submit">Save</button>
                <button className="btn-Cancel" type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    </div>
  );
};

TaskEditForm.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default TaskEditForm;