import { Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Model from "../components/Model";
import { DataGrid } from '@mui/x-data-grid';
import { DateFormatter } from "../utils/DateFormatter";
import DataGridCustomToolbar from "../components/DataGridCustomBar";

interface Transaction {
    transaction_id: string;
    created_at: string;
    amount: number;
    bank_description: string;
    from_account: string;
    payment_method: string;
    status: string;
    to_account: string;
}

const Transactions: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [modelData,setModelData] = useState<Transaction>()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/transactions?page=${page}`);
            const data = await response.json();
            console.log("Data from server",data)
            if (data){

                setRows(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleRowClick = (params: any, event: React.MouseEvent) => {
        setModelData(()=>params.row)
        setOpen(true)
    }

    const handlePageChange = (params: any) => {
        setPage(params.page);
    }

    const columns = [
        {
            field: "created_at",
            headerName: "Date(EDT)",
            flex: 1,
            valueGetter: (params: any) => {
                const formattedDate = DateFormatter(params.row.created_at);
                return formattedDate;
            }
        },
        {
            field: "to_account",
            headerName: "To/From",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "payment_method",
            headerName: "Payment Method",
            flex: 1,
        },
    ];

    return (
        <>
            <Button onClick={handleOpen}>Open Model</Button>
            <Model open={open} handleClose={handleClose} data={modelData}/>
            <Box>
                <Box height="80vh" sx={{
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
                        loading={loading}
                        getRowId={(row) => row.transaction_id}
                        rows={rows && rows}
                        columns={columns}
                        onRowClick={handleRowClick}
                        pagination
                        paginationMode='server'
                        pageSize={25}
                        rowCount={25}
                        onPageChange={(newPage: number) => setPage(newPage)}
                        components={{ Toolbar: DataGridCustomToolbar }}
                    />

                </Box>
            </Box>
        </>
    );
};

export default Transactions;
