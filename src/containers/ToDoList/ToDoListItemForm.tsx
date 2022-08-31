import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, TextField, Button, FormControl, Stack }  from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { formatDate } from 'src/helpers/dateHelper';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { tasks, addTaskAsync, editTaskAsync } from 'src/redux/tasksSlice';
import { Task, NewTask } from './types';

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
    setValues({...values, dueDate: formatDate(date)});
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTaskExists = tasksList.find((task) => task.description === values.description);
    const isValidationError = isTaskExists && !isEdit;

    if(!isValidationError) {
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
          <DesktopDateTimePicker
            label="Due Date"
            value={values.dueDate}
            minDate={dayjs().add(1, 'day')}
            minutesStep={30}
            disablePast
            disableHighlightToday
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
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