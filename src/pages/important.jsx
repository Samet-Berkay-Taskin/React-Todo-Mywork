import { useDispatch, useSelector } from 'react-redux'
import { addCompletedTask, addTaskImportant, deteleteTaskImportant, setOpen } from '../redux/myWorkSlice'
import { useFormik } from 'formik';
import GradeIcon from '@mui/icons-material/Grade';
import { Box, Button, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteModal from '../components/deleteModal';
import { useState } from 'react';

const Important = () => {
    const dispatch = useDispatch()
    const important = useSelector((state) => state.myWork.important)
    const isOpen = useSelector((state) => state.myWork.isOpen)
    const completedTasks = useSelector((state) => state.myWork.completedTasks)
    const currentDate = new Date().toDateString();
    const [item, setItem] = useState('')

    const formik = useFormik({
        initialValues: {
            importantData: ''
        },
        onSubmit: values => {
            dispatch(addTaskImportant({ id: crypto.randomUUID(), work: values.importantData, date: currentDate, taskPlace: 'important' }))
            formik.resetForm()
        },
    })

    const addCompletedTasks = (task) => {
        dispatch(addCompletedTask(task))
        dispatch(deteleteTaskImportant(task.id))
    }
    const deleteItemCompletedTask = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'completed' });
    }

    const deleteItemImportant = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'important' });
    }


    return (
        <div>
            <div style={{ marginTop: '10%', display: 'flex', alignItems: 'center' }}>
                <GradeIcon />
                <h1 htmlFor="important" style={{ marginLeft: '0.5rem' }}>Önemli Yapacaklarınız</h1>
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
                            id="important"
                            name="importantData"
                            label="Görev Ekle"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.importantData}
                        />
                        <Button variant="outlined" size="medium" type='submit' disabled={!formik.values.importantData}>Ekle</Button>
                    </Box>
                </form>
            </div>

            <div style={{ marginTop: '5%' }}>
                {important.length !== 0 ? (
                    [...important].reverse().map((item, index) => (
                        <div key={index + 1} >
                            <div style={{ display: 'flex', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '5px', marginBottom: '5px', backgroundColor: '#eee9e9' }}>
                                <li style={{ marginTop: '0.5%', listStyleType: 'none' }}>{item.work}</li>
                                <Button color="error" size="small" style={{ marginLeft: '1%' }} onClick={() => deleteItemImportant(item)}>Sil</Button>
                                <Button size="small" style={{ marginLeft: '1%' }} onClick={() => addCompletedTasks(item)}>Tamamlandı</Button>
                            </div>
                        </div>
                    ))) : (<><p>Herhangi bir görev bulunmamakta...</p></>)}

                {completedTasks.length !== 0 ? (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Tamamlandı   {completedTasks.length}
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

export default Important