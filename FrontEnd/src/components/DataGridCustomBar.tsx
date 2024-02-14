
import {Search} from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
 GridToolbarDensitySelector,
 GridToolbarContainer,
 GridToolbarExport,
 GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBewteen";

const DataGridCustomToolbar = () => {
  return <GridToolbarContainer>
    <FlexBetween width="100%">
        <FlexBetween>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </FlexBetween>
       
    </FlexBetween>
  </GridToolbarContainer>
}

export default DataGridCustomToolbar
