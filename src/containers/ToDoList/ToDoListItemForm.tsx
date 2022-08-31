import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, TextField, Button, FormControl, Stack }  from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Task, NewTask } from './types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { tasks, addTaskAsync, editTaskAsync } from 'src/redux/tasksSlice';

const defaultValues = {description: '', createdAt: null, dueDate: null};

const ToDoListItemForm = ({
  isEdit,
  initialValues,
  callback
}: {
  isEdit?: boolean;
  initialValues?: Task;
  callback?: () => void;
}) => {
  const [values, setValues] = useState<Task | NewTask>(initialValues || defaultValues);
  const [validationErrorText, setValidationErrorText] = useState<string>('');
  const tasksList = useAppSelector(tasks);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({...values, description: e.target.value});
  };

  const handleDateChange = (date: Dayjs | null) => {
    setValues({...values, dueDate: dayjs(date)});
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTaskExist = tasksList.find((task) => task.description === values.description);

    if(!isTaskExist) {
      isEdit
        ? dispatch(editTaskAsync({...values, id: initialValues?.id || ''}))
        : dispatch(addTaskAsync(values))

      setValues(defaultValues);
      setValidationErrorText('');
      handleOnClose();
    } else {
      setValidationErrorText('You cannot create two identical tasks.');
    }
  };

  const handleOnClose = () => {
    if(callback) {
      callback();
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{p: 2}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl sx={{mb: 2}} fullWidth>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={values.description}
            error={Boolean(validationErrorText)}
            helperText={validationErrorText}
            rows={4}
            multiline
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{mb: 2}} fullWidth>
          <DateTimePicker
            label="Due Date"
            inputFormat="MMM D, YYYY h:mm A"
            value={values.dueDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            disablePast
          />
        </FormControl>
        <Stack spacing={2} direction="row">
          {isEdit
            ? <Button variant="outlined" fullWidth onClick={() => handleOnClose()}>Cancel</Button>
            : null
          }
          <Button variant="contained" type="submit" fullWidth>Save</Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  )
}

export default ToDoListItemForm;