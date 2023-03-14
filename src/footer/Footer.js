import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import './Footer.css'
import {Email, FacebookOutlined, GitHub, RssFeedOutlined, Telegram, Twitter} from "@mui/icons-material";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <Box className={"footer"} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxWidth: "600px",
            }}>

                <Box>
                    <a id={"icon"} href={"#"}>
                        <Email/>
                    </a>

                    <a id={"icon"} href={"#"}>
                        <Twitter/>
                    </a>

                    <a id={"icon"} href={"#"}>
                        <FacebookOutlined/>
                    </a>

                    <a id={"icon"} href={"https://github.com/younginfolife"}>
                        <GitHub/>
                    </a>

                    <a id={"icon"} href={"https://www.telegramitalia.it/young-infolife/"}>
                        <Telegram/>
                    </a>

                    <a id={"icon"} href={"https://younginfolife.github.io/webpage/feed.xml"}>
                        <RssFeedOutlined/>
                    </a>
                </Box>

                <Typography textAlign="center"> {`© ${year} Younginfolife`}</Typography>
            </Box>
        </Box>
    )
};

export default Footer;