import { useDispatch, useSelector } from 'react-redux'
import { addCompletedTask, addTaskTasks, deteleteTask, setOpen, setSearchTask } from '../redux/myWorkSlice'
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteModal from '../components/deleteModal';
import { useEffect, useState } from 'react';

const Search = () => {
    const dispatch = useDispatch()
    let tasks = useSelector((state) => state.myWork.tasks)
    const isOpen = useSelector((state) => state.myWork.isOpen)
    const search = useSelector((state) => state.myWork.search)
    const completedTasks = useSelector((state) => state.myWork.completedTasks)
    const currentDate = new Date().toDateString();
    const [item, setItem] = useState('')
    const [filteredTask, setFilteredTask] = useState([]);
    const [filteredCompletedTasks, setFilteredCompletedTasks] = useState([]);

    const formik = useFormik({
        initialValues: {
            tasksData: ''
        },
        onSubmit: values => {
            dispatch(addTaskTasks({ id: crypto.randomUUID(), work: values.tasksData, date: currentDate, taskPlace: 'tasks' }))
            formik.resetForm()
        },
    })

    const addCompletedTasks = (task) => {
        dispatch(addCompletedTask(task))
        dispatch(deteleteTask(task))
    }
    const deleteItemCompletedTask = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'completed' });
    }

    const deleteItemTasks = (item) => {
        dispatch(setOpen(true))
        setItem({ ...item, deletedLocation: 'tasks' });
    }

    useEffect(() => {
        setFilteredTask(tasks.filter((item) => (item?.work.toLowerCase().includes(search))));
        setFilteredCompletedTasks(completedTasks.filter((item) => (item?.work.toLowerCase().includes(search))));
    }, [search, tasks, completedTasks]);

    return (
        <div>
            <div style={{ marginTop: '10%', display: 'flex', alignItems: 'center' }}>
                <SearchIcon />
                <h1 htmlFor="search" style={{ marginLeft: '0.5rem' }}>Aranan Görevler</h1>
            </div>
            <div>
                <form style={{ display: 'flex' }} onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            width: 800,
                            maxWidth: '100%',
                            display: 'flex',
                            gap: '2%'
                        }}
                    >
                    </Box>
                </form>
            </div>

            <div style={{ marginTop: '5%' }}>
                {filteredTask.length !== 0 ? (
                    [...filteredTask].reverse().map((item, index) => (
                        <div key={index + 1} >
                            <div style={{ display: 'flex', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '5px', marginBottom: '5px', backgroundColor: '#eee9e9' }}>
                                <li style={{ marginTop: '0.5%', listStyleType: 'none' }}>{item.work}</li>
                                <Button color="error" size="small" style={{ marginLeft: '1%' }} onClick={() => deleteItemTasks(item)}>Sil</Button>
                                <Button size="small" style={{ marginLeft: '1%' }} onClick={() => addCompletedTasks(item)}>Tamamlandı</Button>
                            </div>
                        </div>
                    ))) : (<><p>Herhangi bir görev bulunmamakta...</p></>)}

                {filteredCompletedTasks.length !== 0 ? (
                    <Accordion defaultExpanded style={{marginTop: '20px'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Aranan Tamamlananlar   {filteredCompletedTasks.length}
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                [...filteredCompletedTasks].reverse().map((item, index) => (
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
export default Search;