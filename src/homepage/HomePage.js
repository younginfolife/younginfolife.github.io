import React from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";

function HomePage() {
    return (
        <Box>

            <Navbar/>

            <Box>
                <h1>Chi Siamo?</h1>
                <p>
                    Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali. Il gruppo Young InfoLife …..
                </p>
            </Box>

            <Footer/>
        </Box>
    );
}

export default HomePage;