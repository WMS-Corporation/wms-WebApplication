import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel, ProductTaskModel } from '../../models/taskModel';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import '../styles/TaskItem.css';
import { MdDoneOutline } from "react-icons/md";

const TaskItem = ({ task, onEdit, onView, admin }) => {
  return (
    <tr key={task._codTask}>
      <td>{task._codOperator}</td>
      <td>{task._date instanceof Date && !isNaN(task._date) ? task._date.toISOString().substring(0, 10) : 'N/A'}</td>
      <td>{task._type}</td>
      <td>{task._status}</td>
        <td className="action">
            <div className="view"><FaEye className="view-icon" onClick={() => onView(task)}/></div>
            {admin ? (
                <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(task)}/></div>
            ) : (
                !admin && task._status !== "Completed" ? (<div className="done"><MdDoneOutline className="edit-icon" onClick={() => onEdit(task)}/></div>) : null)}
        </td>
    </tr>
  );
};

TaskItem.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    admin: PropTypes.bool
};

export default TaskItem;