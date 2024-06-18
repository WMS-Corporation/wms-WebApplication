import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const AppGlobalContext = createContext();

export const AppGlobalProvider = ({ children }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [addingTask, setAddingTask] = useState(false);
    const [viewProductDetailTask, setViewProductDetailTask] = useState(null);

    return (
        <AppGlobalContext.Provider
            value={{
                editingProduct,
                setEditingProduct,
                addingProduct,
                setAddingProduct,
                editingTask,
                setEditingTask,
                addingTask,
                setAddingTask,
                viewProductDetailTask,
                setViewProductDetailTask,
            }}
        >
            {children}
        </AppGlobalContext.Provider>
    );
};

AppGlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useApplicationGlobal = () => {
    return useContext(AppGlobalContext);
};
