import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompletedTask, deteleteTask, deteleteTaskImportant, deteleteTaskPlanned, deteleteTaskToday, setOpen } from '../redux/myWorkSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteModal = (props) => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.myWork.isOpen)
    const { item } = props

    const setClose = () => {
        dispatch(setOpen(false))
    }

    const deleteItem = (item) => {
        switch (item.deletedLocation) {
            case 'toDay':
                dispatch(deteleteTaskToday(item.id))
                dispatch(setOpen(false))
                break;
            case 'completed':
                dispatch(deleteCompletedTask(item.id))
                dispatch(setOpen(false))
                break
            case 'planned':
                dispatch(deteleteTaskPlanned(item.id))
                dispatch(setOpen(false))
                break
            case 'important':
                dispatch(deteleteTaskImportant(item.id))
                dispatch(setOpen(false))
                break
            case 'tasks':
                dispatch(deteleteTask(item))
                dispatch(setOpen(false))
                break
        }
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={setClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        "{item.work}" kalıcı olarak silmek istiyor musunuz ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex' }}>
                        <Button onClick={() => setClose()}>Hayır</Button>
                        <Button color='error' onClick={() => deleteItem(item)}>Evet</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
export default DeleteModal;