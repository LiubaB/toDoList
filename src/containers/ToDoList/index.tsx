import { Container, Typography } from '@mui/material';
import ToDoListItemForm from './ToDoListItemForm';
import ToDoList from './ToDoList';

const ToDoListContainer = () => {
  return (
    <Container maxWidth="sm">
      <Typography sx={{my: 2}} variant="h6" component="div">
        To Do List
      </Typography>
      <ToDoListItemForm />
      <ToDoList />
    </Container>
  );
}

export default ToDoListContainer;