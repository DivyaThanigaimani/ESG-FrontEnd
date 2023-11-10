import React, { useState ,useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { cardSlice } from '../../../slice/cardSlice';
import { useDispatch } from 'react-redux';

const DropDownSection = () => {
    const dispatch = useDispatch();
  const [measure, setMeasure] = useState('Electricity');
  const [category, setCategory] = useState('Quaterly');
  const [country, setCountry] = useState('Canada');
  const [region, setRegion] = useState('Windsor');
  
 useEffect(() => {
    // This code will run after the component has mounted
    handleSubmit(null); // Trigger the dropdown to open
  }, []);

  const handleSubmit = (e) => {
    if(e!=null)
    e.preventDefault();
    console.log('Submitted!', measure, category, country,region);
   // const apiUrl = 'https://example.com/api';

   const params = new URLSearchParams({
    measure,
      category,
      country,
      region,
      province:"Ontario"
    // Add more parameters as needed
  });

    
    getChartData(params);
    
  };
  const getChartData=async (params)=>{
    console.log(params);
    //e.preventDefault();
     const url="http://localhost:8080/solar/getCarbonReducedPercentage?category="+category+"&measure="+measure+"&country="+country+"&province=Ontario&region="+region;
    fetch(url, {
      method: 'GET',        
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        dispatch(cardSlice.actions.setCarbonData({data}));
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
  }
  return (
    <div className="container">
      <form>

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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
           
            <MenuItem value="Quaterly">Quaterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
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

        
        

        <Button variant="contained" onClick={(e)=>handleSubmit(e)} color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DropDownSection;

