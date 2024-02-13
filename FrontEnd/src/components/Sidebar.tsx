import React, { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {
    HomeOutlined,
    Menu,
    Payment,
    CreditCard,
    Timeline,
    AccountBalance,
    ChevronRightOutlined,
    VerifiedOutlined,

} from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from "./FlexBewteen";

const NavItems = [
    {
        text: "Home",
        icon: <HomeOutlined />
    },
    {
        text: "Transactions",
        icon: <Menu />
    },
    {
        text: "Payments",
        icon: <Payment />
    },
    {
        text: "Cards",
        icon: <CreditCard />
    },
    {
        text: "Sales Details",
        icon: null
    },
    {
        text: "Capital",
        icon: <Timeline />
    },
    {
        text: "Accounts",
        icon: <AccountBalance />
    },
   
];
// Define a type for the Sidebar props
type SidebarProps = {
    isNonMobile: boolean;
    drawerWidth: string;
};
const Sidebar:React.FC<SidebarProps> = ({
    isNonMobile,
    drawerWidth,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])
    return (
        <Box component="nav">
            {true && (
                <Drawer
                    open={true}
                    //onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: "#ffedc2",
                            backgroundColor: "#21295c",
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >

                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color="#ffe3a3">
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        Machnet
                                    </Typography>
                                </Box>
                            </FlexBetween>
                        </Box>
                        <List>
                            {NavItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (<Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        { text }
                                    </Typography>);
                                }
                                const lowerText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={()=>{
                                            navigate(`/${lowerText}`);
                                            setActive(lowerText);
                                        }}
                                        sx={{
                                            backgroundColor:active === lowerText ? "#ffe3a3" : "transparent",
                                            color:active === lowerText ? "#191F45" : "#fff6e0",
                                        }}
                                        >
                                            <ListItemIcon
                                            sx={{ml:"1rem",
                                            color:active === lowerText ? "#191F45" : "#ffedc2",
                                        }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lowerText && (
                                                <ChevronRightOutlined 
                                                sx={{ml:"auto"}}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                            <ListItem disablePadding>
                                        <ListItemButton onClick={()=>{
                                            navigate("/verify");
                                            setActive("verify");
                                        }}
                                        sx={{
                                            backgroundColor:active === "verify" ? "#ffe3a3" : "transparent",
                                            color:active === "verify" ? "#191F45" : "#fff6e0",
                                        }}
                                        >
                                            <ListItemIcon
                                            sx={{ml:"1rem",
                                            color:active === "verify" ? "#191F45" : "#ffedc2",
                                        }}
                                            >
                                                <VerifiedOutlined/>
                                            </ListItemIcon>
                                            <ListItemText primary={"Verify Account"} />
                                            {active === "verify" && (
                                                <ChevronRightOutlined 
                                                sx={{ml:"auto"}}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                        </List>
                    </Box>

                </Drawer>
            )}
        </Box>
    )
}

export default React.memo(Sidebar);
