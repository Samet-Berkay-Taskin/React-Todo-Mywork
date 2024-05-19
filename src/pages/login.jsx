import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/login.css'
import { setIsLoggedIn } from '../redux/myWorkSlice';

export default function Login() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        onSubmit: values => {
            if (values.userName === 'Berkay_Taşkın' && values.password === 'berkay1234') {
                dispatch(setIsLoggedIn(true));
            }
            else {
                alert('Kullanıcı adı veya şifre hatalı.');
            }
        },
    });

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <h1> MyWork'e Hoşgeldiniz</h1>
                <TextField fullWidth id="userName" label="Kullanıcı Adı" variant="outlined" type="text" value={formik.values.userName} onChange={formik.handleChange} />
                <TextField fullWidth id="password" label="Şifre" type='password' variant="outlined" value={formik.values.password} onChange={formik.handleChange} />

                <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={(!formik.values.userName || !formik.values.password)}>
                    Giriş
                </Button>
            </form>
        </div>
    );
}
