import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { toast } from "sonner";
import "../../../component/button/button.css";
import "./Form.css";

const EditButtonComponent = ({ data, columns, apiurl, id, onSave }) => {
    const [editedData, setEditedData] = useState(data);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setEditedData(data);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: type === "number" ? parseInt(value, 10) : value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`${apiurl}/${id}`, editedData);

            if (response.status === 200) {
                toast.success("Item modified successfully!");
                window.location.reload();
                setIsEditing(false);
            } else {
                toast.error("Error modifying item");
            }
        } catch (error) {
            toast.error("Error modifying item");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <>
            <button className="button" onClick={handleEditClick}>
                Edit
            </button>
            {isEditing && (
                <Modal onClose={handleCancelClick}>
                    <form className="form-container">
                        {columns
                            .filter((column) => column.key !== "id")
                            .map((column) => (
                                <div className="form-group" key={column.key}>
                                    <label htmlFor={column.key}>
                                        {column.header}
                                    </label>
                                    {column.type === "textarea" ? (
                                        <textarea
                                            id={column.key}
                                            name={column.key}
                                            value={editedData[column.key]}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    ) : (
                                        <input
                                            type={column.type}
                                            id={column.key}
                                            name={column.key}
                                            value={editedData[column.key]}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    )}
                                </div>
                            ))}
                        <button
                            className="button"
                            type="button"
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                        <button
                            className="button"
                            type="button"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default EditButtonComponent;
