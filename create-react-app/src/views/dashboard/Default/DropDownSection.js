import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const App = () => {
  const [measure, setMeasure] = useState('Electricity');
  const [report, setReport] = useState('Quaterly');
  const [country, setCountry] = useState('Canada');
  const [region, setRegion] = useState('Windsor');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!', measure, report, country,region);
   // const apiUrl = 'https://example.com/api';

    const requestBody = JSON.stringify({
      measure,
      report,
      country,
      region
    });
    getChartData(requestBody);
    
  };
  const getChartData=async (requestBody)=>{
    console.log(requestBody);
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

      <FormControl variant="outlined" style={{ width: '200px',marginRight: '10px' }} className="dropdown">
          <InputLabel>Measure</InputLabel>
          <Select
            label="Measure"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          >
            
            <MenuItem value="Electricity">Electricity</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '200px',marginRight: '10px' }} className="dropdown">
          <InputLabel>Report</InputLabel>
          <Select
            label="Report"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          >
           
            <MenuItem value="Quaterly">Quaterly</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ width: '200px',marginRight: '10px' }} className="dropdown">
          <InputLabel>Country</InputLabel>
          <Select
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            
            <MenuItem value="Canada">Canada</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ width: '200px',marginRight: '10px' }} className="dropdown">
          <InputLabel>Region</InputLabel>
          <Select
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >

            <MenuItem value="Windsor">Windsor</MenuItem>
          </Select>
        </FormControl>

        
        

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default App;
