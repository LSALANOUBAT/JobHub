import React, { useState, useEffect } from "react";
import "./Table.css";
import DeleteButtonComponent from "./DeleteButton";
import EditButtonComponent from "./EditButton";
import CreateButtonComponent from "./CreateButton";
import {
    TablePagination,
    tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

const DataTableComponent = ({ data, columns, apiUrl, onDataFetched }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentItems =
        fetchedData?.slice(page * rowsPerPage, (page + 1) * rowsPerPage) || [];

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - fetchedData.length)
            : 0;

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setFetchedData(data);
        }
    }, [data]);

    const handleDataFetched = (updatedData) => {
        setFetchedData(updatedData);
        onDataFetched(updatedData);
    };

    return (
        <div>
            <table className="dataTable">
                <thead className="tableHeader">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr className="infoRow" key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <td className="infoRow" key={columnIndex}>
                                    {column.type === "boolean"
                                        ? row[column.key]
                                            ? "Yes"
                                            : "No"
                                        : row[column.key]}
                                </td>
                            ))}
                            <td>
                                <DeleteButtonComponent
                                    id={row.id}
                                    apiUrl={apiUrl}
                                    column={columns}
                                    dataFetching={handleDataFetched}
                                />
                            </td>
                            <td>
                                <EditButtonComponent
                                    data={row}
                                    columns={columns}
                                    apiurl={apiUrl}
                                    id={row.id}
                                    onSave={handleDataFetched}
                                    onEditClick={() => setIsModalVisible(true)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="TablePagination-root">
                        <td colSpan={columns.length + 2}>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: fetchedData.length },
                                ]}
                                colSpan={3}
                                count={fetchedData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </td>
                    </tr>
                    <tr className="CreateButtonComponent-root">
                        <td colSpan={columns.length + 2}>
                            <CreateButtonComponent
                                data={fetchedData}
                                columns={columns}
                                apiurl={apiUrl}
                                onSave={handleDataFetched}
                                onEditClick={() => setIsModalVisible(true)}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default DataTableComponent;
