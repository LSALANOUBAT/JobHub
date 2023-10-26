import React from "react";
import axios from "axios";
import { toast } from "sonner";
import "../../../component/button/button.css";

const DeleteButtonComponent = ({ id, apiUrl, dataFetching }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/${id}`);
            if (response.status === 200) {
                toast.success("Item deleted successfully!");
                window.location.reload();
            } else {
                toast.error("Error deleting item");
            }
        } catch (error) {
            toast.error("Error deleting item");
        }
    };

    return (
        <button className="button" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default DeleteButtonComponent;
