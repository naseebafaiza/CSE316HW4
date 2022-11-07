import { useContext } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const handleClose = () => {
        auth.closeModal();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.registerUser(
            formData.get('firstName'),
            formData.get('lastName'),
            formData.get('email'),
            formData.get('password'),
            formData.get('passwordVerify')
        );
    };
    let errMsg = "";
    if(auth.errorMessage){
        errMsg = auth.errorMessage;
        console.log("ERROR MESSAGE IN MODAL: " + errMsg);
    }

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                <Modal
                        aria-labelledby="failedLogin-modal-title"
                        aria-describedby="failedLogin-modal-description"
                        id = "failedLoginModal"
                        open = {auth.registerErr}
                        onClose = {handleClose}
                    >
                        <Box sx={style}>
                            <div style={{
                                display:"flex",
                                justifyContent: 'flex-end',
                                height: 6
                            }}>
                            <Button variant="contained"
                                style={{
                                    bottom: 16,
                                    left: 8,
                                    backgroundColor:"#f0625f",
                                    padding: 9,
                                    minWidth: 16,
                                    borderRadius: 5,
                                }}
                                onClick={handleClose}
                            >
                            X</Button></div>
                            <Alert severity="error">
                                <div
                                id = 'registerErrorMessage'>
                                    {errMsg}
                                </div>
                            </Alert>
                        </Box>
                    </Modal>
                </div>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerify"
                                    label="Password Verify"
                                    type="password"
                                    id="passwordVerify"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
    );
}