import { Grid, List, Typography } from '@mui/material';
import { isLoading, tasks } from 'src/redux/tasksSlice';
import { useAppSelector } from 'src/redux/hooks';
import Loader from 'src/components/Loader';
import ListItem from './ListItem';

const ToDoList = () => {
  const tasksList = useAppSelector(tasks);
  const loading = useAppSelector(isLoading);

  if(loading) {
    return <Loader />
  }

  return (
    <Grid item xs={12} md={6}>
      {tasksList.length ? (
        <List>
          {tasksList.map((task) => (
            <ListItem {...task} />
          ))}
        </List>
      ) : (
        <Typography sx={{my: 2}} variant="h6" component="div">
          Your tasks list is empty!
        </Typography>
      )}
    </Grid>
  )
}

export default ToDoList;