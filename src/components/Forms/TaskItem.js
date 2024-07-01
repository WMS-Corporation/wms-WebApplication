import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import { FiEdit2 } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import '../styles/TaskItem.css';
import { MdDoneOutline } from "react-icons/md";

const TaskItem = ({ task, onEdit, onView, admin, dashboard }) => {
    const handleEdit = onEdit || (() => {});
    const handleView = onView || (() => {});
  return (
      <tr key={task._codTask}>
          <td>{task._codTask}</td>
          {admin ? (
              <td>{task._codOperator}</td>
          ) : null}
          <td>{task._date instanceof Date && !isNaN(task._date) ? task._date.toISOString().substring(0, 10) : 'N/A'}</td>
          <td>{task._type}</td>
          <td>{task._status}</td>
          {!dashboard ? (
              <>
                  <td className="action">
                      <div className="view"><FaEye className="view-icon" onClick={() => handleView(task)}/></div>
                      {admin ? (
                          <div className="edit"><FiEdit2 className="edit-icon" onClick={() => handleEdit(task)}/></div>
                      ) : (
                          !admin && task._status !== "Completed" ? (
                              <div className="done"><MdDoneOutline className="edit-icon"
                                                                   onClick={() => handleEdit(task)}/>
                              </div>) : null)}
                  </td>
              </>
          ) : null}
      </tr>
  );
};

TaskItem.propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    onEdit: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    admin: PropTypes.bool,
    dashboard: PropTypes.bool
};

export default TaskItem;