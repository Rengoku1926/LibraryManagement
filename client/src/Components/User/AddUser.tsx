import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const AddUser: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [contact, setContact] = useState<number | "">("");
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null); // State for alert

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URI}/api/users/addUser`, { name, email, contact });
            console.log("User Added ", response.data); // Handle the response data here
            // Show success alert
            setAlert({ message: "User added successfully!", severity: "success" });
            // Clear the input fields (optional)
            setName('');
            setEmail('');
            setContact('');
        } catch (error) {
            console.log(error);
            // Show error alert
            setAlert({ message: "Error adding user!", severity: "error" });
        }
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setContact(input === "" ? "" : Number(input));
    };

    // Optional: Automatically hide the alert after 3 seconds
    React.useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 2,
                }}
            >
                <Typography variant="h5">Enter User Details</Typography>
                <TextField label="Enter Name" value={name} variant="outlined" onChange={(e) => setName(e.target.value)} />
                <TextField label="Enter Email" value={email} variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Enter Contact No" value={contact} variant="outlined" onChange={handleContactChange} />
                <Button variant="contained" onClick={handleSubmit}>Add User</Button>
            </Box>
            {alert && (
                <Alert severity={alert.severity} sx={{ marginTop: 2 }}>
                    {alert.message}
                </Alert>
            )}
        </div>
    );
}

export default AddUser;
