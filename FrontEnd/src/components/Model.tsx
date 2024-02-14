
import {Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material"

interface TransactionData {
    transaction_id: string;
    created_at: string;
    amount: number;
    bank_description: string;
    from_account: string;
    payment_method: string;
    status: string;
    to_account: string;
}


const ModelContent:React.FC<TransactionData> = (data) =>{
    return <div>
        <Typography variant="h4">Transfer</Typography>
        <Typography variant="h4" color="error">{data.amount}</Typography>
        <Typography variant="subtitle1">Mercury Checking..4296</Typography>
        <Typography variant="subtitle1">Oct 10 at 7:42PM</Typography>
        <Typography variant="subtitle1">To Ops/Payroll</Typography>
        <Typography variant="subtitle1">Mercury Checking..1038</Typography>
        <Typography variant="subtitle1">Oct 10 at 7:42PM</Typography>
        <Typography variant="subtitle1">Notes</Typography>
    </div>
}

type ModelProps = {
    open: boolean;
    handleClose: () => void;
    data:TransactionData
    
};
const Model:React.FC<ModelProps> = ({
open,handleClose,data
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <Button onClick={handleClose}>X</Button>
        </DialogTitle>
        <DialogContent>
            <ModelContent {...data}/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>
                Close
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default Model
