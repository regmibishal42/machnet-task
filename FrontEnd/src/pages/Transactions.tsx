import { Button, Box } from "@mui/material";
import { useState } from "react";
import Model from "../components/Model";
import { DataGrid } from '@mui/x-data-grid';
import { DateFormatter } from "../utils/DateFormatter";
import DataGridCustomToolbar from "../components/DataGridCustomBar";

const mockData = [
    {
        "transactionID": "cc120b2b-edde-46e8-b3f8-872ad1ce20db",
        "createdAt": "2024-02-12T15:42:56.700583Z",
        "amount": 5000,
        "status": "Pending",
        "account": "Bishal Regmi",
        "paymentMethod": "esewa"
    },
    {
        "transactionID": "cc120b2b-edde-46e8-b3f8-872ad1ce20db",
        "createdAt": "2024-02-12T15:42:56.700583Z",
        "amount": 5000,
        "status": "Pending",
        "account": "Bishal Regmi",
        "paymentMethod": "esewa"
    },
    {
        "transactionID": "cc120b2b-edde-46e8-b3f8-872ad1ce20db",
        "createdAt": "2024-02-12T15:42:56.700583Z",
        "amount": 5000,
        "status": "Pending",
        "account": "Bishal Regmi",
        "paymentMethod": "esewa"
    },
]

const Transactions:React.FC = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRowClick = (params,event) =>{
        console.log(params.row)
    }

    // Columns for the data grid
    const columns = [
        {
            field: "createdAt",
            headerName: "Date(EDT)",
            flex: 1,
            valueGetter: (params: any) => {
                const formattedDate = DateFormatter(params.row.createdAt)
                return formattedDate

            }
        },
        {
            field: "account",
            headerName: "To/From",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        // {
        //     field: "account",
        //     headerName: "Account",
        //     flex: 1,
        // },
        {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
        },
    ]

    return (
        <>
            <Button onClick={handleOpen}>Open Model</Button>
            <Model open={open} handleClose={handleClose} />
            <Box>

                {/* <Header title="Products" subtitle="See your products here" /> */}
                <Box height="80vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f0f0f0",
                            color: "black",
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "#e0e0e0",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "#f0f0f0",
                            color: "#fff6e0",
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${"#ffedc2"} !important`,
                        },
                    }}>

                    <DataGrid
                        loading={false}
                        getRowId={(row) => row.transactionID}
                        rows={mockData || []}
                        columns={columns}
                        rowCount={0}
                        pagination
                        page={page}
                        pageSize={25}
                        paginationMode='server'
                        sortingMode='server'
                        onRowClick={handleRowClick}
                        onPageChange={(newPage: any) => setPage(newPage)}
                        components={{ Toolbar: DataGridCustomToolbar }}

                    // onPageSizeChnage
                    />
                </Box>
            </Box>
        </>
    );
};

export default Transactions;
