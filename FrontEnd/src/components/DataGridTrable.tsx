
import {
 GridToolbarDensitySelector,
 GridToolbarContainer,
 GridToolbarExport,
 GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBewteen";


const DataGridTable = () => {
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

export default DataGridTable
