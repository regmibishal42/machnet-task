
import {Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material"

const ModelContent = () =>{
    return <div>
        <Typography variant="h4">Transfer</Typography>
        <Typography variant="h2" color="error">-$54,810.16</Typography>
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
    
};
const Model:React.FC<ModelProps> = ({
open,handleClose
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            <Button onClick={handleClose}>X</Button>
        </DialogTitle>
        <DialogContent>
            <ModelContent />
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
