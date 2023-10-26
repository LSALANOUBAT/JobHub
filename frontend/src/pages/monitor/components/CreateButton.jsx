import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { toast } from "sonner";
import "../../../component/button/button.css";
import "./Form.css";

const CreateButtonComponent = ({ columns, apiurl }) => {
    const initialData = Object.fromEntries(
        columns.map((column) => [column.key, ""])
    );
    const [editedData, setEditedData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setEditedData(initialData);
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
            const { id, ...postData } = editedData;

            const response = await axios.post(apiurl, postData);

            if (response.status === 200 || response.status === 201) {
                toast.success("Item created successfully!");
                setIsEditing(false);
                window.location.reload();
            } else {
                toast.error("Error creating item");
            }
        } catch (error) {
            toast.error("Error creating item");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <>
            <button className="button" onClick={handleEditClick}>
                Create
            </button>
            {isEditing && (
                <Modal onClose={handleCancelClick}>
                    <form className="form-container">
                        {columns
                            .filter((column) => column.key !== "id")
                            .map((column) => (
                                <div className="form-group" key={column.key}>
                                    <label
                                        htmlFor={column.key}
                                        className="form-label"
                                    >
                                        {column.header}
                                    </label>
                                    {column.type === "textarea" ? (
                                        <textarea
                                            id={column.key}
                                            name={column.key}
                                            value={editedData[column.key] || ""}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    ) : (
                                        <input
                                            type={column.type}
                                            id={column.key}
                                            name={column.key}
                                            value={editedData[column.key] || ""}
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

export default CreateButtonComponent;
