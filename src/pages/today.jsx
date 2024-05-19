import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux'
import { addTaskToday, deteleteTaskToday, addCompletedTask, setOpen } from '../redux/myWorkSlice'
import { Box, Button, TextField } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteModal from '../components/deleteModal';
import { useState } from 'react';

const Today = () => {
    const dispatch = useDispatch()
    const toDay = useSelector((state) => state.myWork.toDay)
    const completedTasks = useSelector((state) => state.myWork.completedTasks)
    const isOpen = useSelector((state) => state.myWork.isOpen)
    const currentDate = new Date().toDateString();
    const [item, setItem] = useState('')

    const formik = useFormik({
        initialValues: {
            toDayData: ''
        },
        onSubmit: values => {
            dispatch(addTaskToday({ id: crypto.randomUUID(), work: values.toDayData, date: currentDate, taskPlace: 'toDay' }))
            formik.resetForm()
        },
    })

    const addCompletedTasks = (task) => {
        dispatch(addCompletedTask(task))
        dispatch(deteleteTaskToday(task.id))
    }
    const deleteItemCompletedTask = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'completed' });
    }

    const deleteItemToday = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'toDay' });
    }

    return (
        <div>
            <div style={{ marginTop: '10%', display: 'flex', alignItems: 'center' }}>
                <WbSunnyIcon />
                <h1 htmlFor="today" style={{ marginLeft: '0.5rem' }}>Bugün Yapacaklarınız</h1>
            </div>

            <div>
                <form style={{ display: 'flex', marginTop: '5%' }} onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            width: 800,
                            maxWidth: '100%',
                            display: 'flex',
                            gap: '2%'
                        }}
                    >
                        <TextField
                            fullWidth
                            id="today"
                            label="Görev Ekle"
                            name="toDayData"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.toDayData}
                        />
                        <Button variant="outlined" size="medium" type='submit' disabled={!formik.values.toDayData}>Ekle</Button>
                    </Box>
                </form>
            </div>

            <div style={{ marginTop: '5%' }}>
                {toDay.length !== 0 ? (
                    [...toDay].reverse().map((item, index) => (
                        currentDate === item.date ? (
                            <div key={index + 1} >
                                <div style={{ display: 'flex', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '5px', marginBottom: '5px', backgroundColor: '#eee9e9' }}>
                                    <li style={{ marginTop: '0.5%', listStyleType: 'none' }}>{item.work}</li>
                                    <Button color="error" size="small" style={{ marginLeft: '1%' }} onClick={() => deleteItemToday(item)}>Sil</Button>
                                    <Button size="small" style={{ marginLeft: '1%' }} onClick={() => addCompletedTasks(item)}>Tamamlandı</Button>
                                </div>
                            </div>
                        ) : (<></>)
                    ))) : (<><p>Herhangi bir görev bulunmamakta...</p></>)}

                {completedTasks.length !== 0 ? (
                    <Accordion style={{marginTop: '20px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Tüm Tamamlananlar   {completedTasks.length}
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                [...completedTasks].reverse().map((item, index) => (
                                    currentDate === item.date ? (
                                        <div key={index + 1} >
                                            <div style={{ display: 'flex', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '5px', marginBottom: '5px', backgroundColor: '#eee9e9' }}>
                                                <li style={{ marginTop: '0.5%', listStyleType: 'none' }}>{item.work}</li>
                                                <Button color="error" size="small" style={{ marginLeft: '1%' }} onClick={() => deleteItemCompletedTask(item)}>Sil</Button>
                                            </div>
                                        </div>
                                    ) : <></>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                ) : <></>}
                {isOpen && <DeleteModal item={item} />}
            </div>
        </div>
    )
}
export default Today