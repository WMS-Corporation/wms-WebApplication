import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onAdd, onEdit, onDelete, onSave }) => {
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Task List</h1>
                <button className="btn-Add" onClick={onAdd}>
                    Add Task
                </button>
            </div>
            <div className="table-task">
                <table>
                    <thead>
                        <tr>
                            <th>Operator Code</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Product List</th>
                            <th>Task Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <TaskItem key={task._codTask} task={task} onEdit={onEdit} onDelete={onDelete}
                                onSave={onSave} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.instanceOf(TaskModel)).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default TaskList;