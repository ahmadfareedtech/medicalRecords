import { Box } from '@mui/material';
import './App.css';
import Header from './components/Header';
import PatientsData from './components/PatientsData';

function App() {
  return (
    <>
      <div style={{ backgroundColor: '#ccc', height: '100vh' }}>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              marginTop: 10,
              width: '50%',
              minWidth: 520,
            }}
          >
            <PatientsData />
          </Box>
        </div>
      </div>
    </>
  );
}

export default App;
