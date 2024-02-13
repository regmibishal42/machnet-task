import { Box,useMediaQuery } from "@mui/material"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom";


const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
      isNonMobile={isNonMobile}
      drawerWidth="250px"
    />
    <Box flexGrow={1}>
        <Outlet/>
    </Box>
  </Box>
}

export default Layout
