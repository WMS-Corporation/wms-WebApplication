import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel, ProductTaskModel } from '../../models/taskModel';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import '../styles/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onView }) => {
  return (
    <tr key={task._codTask}>
      <td>{task._codOperator}</td>
      <td>{task._date instanceof Date && !isNaN(task._date) ? task._date.toISOString().substring(0, 10) : 'N/A'}</td>
      <td>{task._type}</td>
      <td>{task._status}</td>
        <td className="action">
            <div className="view"><FaEye className="view-icon" onClick={() => onView(task)}/></div>
            <div className="edit"><FiEdit2 className="edit-icon" onClick={() => onEdit(task)}/></div>
            <div className="delete"><MdDeleteOutline className="delete-icon" onClick={() => onDelete(task)}/></div>
        </td>
    </tr>
  );
};

TaskItem.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
};

export default TaskItem;