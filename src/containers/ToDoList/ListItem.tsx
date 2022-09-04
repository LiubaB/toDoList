import { useState } from 'react';
import { Card, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTaskAsync } from 'src/redux/tasksSlice';
import { useAppDispatch } from 'src/redux/hooks';
import { Task } from './types';
import ToDoListItemForm from './ToDoListItemForm';

const ListItemComponent = ({id, description, createdAt, dueDate}: Task) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const toggleIsEdit = () => {
    setIsEdit(current => !current);
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskAsync(taskId))
  }

  return (
    <Card sx={{my: 2}} key={id}>
      {isEdit ? (
        <ToDoListItemForm
          isEdit
          initialValues={{id, description, createdAt, dueDate}}
          callback={toggleIsEdit}
        />
      ) : (
        <ListItem
          secondaryAction={
            <>
              <IconButton aria-label="edit" onClick={toggleIsEdit}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDeleteTask(id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText
            sx={{maxWidth: "400px"}}
            primary={description}
            secondary={
              <>
                Created At: {createdAt || '—'} <br />
                Due Date: {dueDate || '—'}
              </>
            }
          />
        </ListItem>
      )}
    </Card>
  )
}

export default ListItemComponent;