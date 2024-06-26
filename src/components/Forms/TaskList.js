import React from 'react';
import PropTypes from 'prop-types';
import { TaskModel } from '../../models/taskModel';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';
import TaskProductDetails from "./TaskProductDetails";
import {useAuth} from "../../contexts/AuthContext";

const TaskList = ({ tasks, onAdd, onEdit, onSave, onView, viewProductDetailTask, onError }) => {
    onError(null)
    const { user } = useAuth() || {};
    let tasksOfUser = []
    if(user._type === "Operational"){
        tasksOfUser.push(...tasks.filter(task => task._codOperator === user._codUser))
    }
    return (
        <div className="task-list">
            <div className="header-list">
                <h1>Task List</h1>
                {user._type === "Admin" ? (
                    <button className="btn-Add" onClick={onAdd}>
                        Add Task
                    </button>
                ) : null}
            </div>
            <div className="table-task">
                {viewProductDetailTask && viewProductDetailTask._productList ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {viewProductDetailTask._productList.map((product) => (
                            <TaskProductDetails key={product._codProduct} product={product}/>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Operator Code</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user._type === "Operational" ? (
                            tasksOfUser.map((task) => (
                                <TaskItem key={task._codTask} task={task} onEdit={onEdit}
                                          onSave={onSave} onView={onView} admin={false}/>
                            ))
                        ) : tasks.map((task) => (
                            <TaskItem key={task._codTask} task={task} onEdit={onEdit}
                                      onSave={onSave} onView={onView} admin={true}/>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.instanceOf(TaskModel)).isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    viewProductDetailTask: PropTypes.instanceOf(TaskModel)
};

export default TaskList;