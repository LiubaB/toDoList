import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: '50px' }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
