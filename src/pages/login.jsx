import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        onSubmit: values => {
            if (values.userName === 'Berkay_Taşkın' && values.password === 'berkay1234') {
                navigate('/')
                setİnitialValues()
                toast.success('Giriş Yapılıyor...')
            }
            else {
                toast.error('Kullanıcı adı veya şifre hatalı.')
            }
        },
    });

    const setİnitialValues = () => {
        formik.values.password = ''
        formik.values.userName = ''
    }
    return (
        <div style={{ marginTop: '10%' }}>
            <form onSubmit={formik.handleSubmit}>
                <h1> MyWork'e Hoşgeldiniz</h1>
                <TextField id="userName" label="Kullanıcı Adı" variant="outlined" fullWidth sx={{ m: 1 }} type="text" value={formik.values.userName} onChange={formik.handleChange} />
                <TextField id="password" label="Şifre" type='password' variant="outlined" fullWidth sx={{ m: 1 }} value={formik.values.password} onChange={formik.handleChange} />

                <Button style={{ marginLeft: '8px' }} variant="contained" endIcon={<SendIcon />} type='submit' disabled={(!formik.values.userName || !formik.values.password)}>
                    Giriş
                </Button>
                <ToastContainer />
            </form>
        </div>
    )
}
