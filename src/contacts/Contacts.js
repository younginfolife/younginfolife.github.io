import React from 'react'
import {Box, Card, TextField} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Contacts = () => {

    return (
        <Box>

            <Navbar/>

            <Box>

                <Container component="main" maxWidth="xs">
                    <h1>Contattaci</h1>
                    <Card sx={{
                        padding: '7%',
                        paddingLeft: '13%',
                        paddingRight: '13%',
                        marginTop: '15%',
                        border: '3px solid',
                        borderColor: '#EEEEEE',
                        borderRadius: '5%'
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <Box component="form" noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label={"email"}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="message"
                                    label="message"
                                    type="message"
                                    id="message"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 2, textTransform: 'none', color: 'white', fontWeight: 'bold'}}
                                >
                                    Invia
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                    <Card sx={{
                        padding: '7%',
                        paddingLeft: '13%',
                        paddingRight: '13%',
                        marginTop: '15%',
                        border: '3px solid',
                        borderColor: '#EEEEEE',
                        borderRadius: '5%'
                    }}>
                        <p>Compilare questo form per iscriverti al gruppo.</p>
                    </Card>
                </Container>
            </Box>

            <Footer/>
        </Box>
    )
}
export default Contacts