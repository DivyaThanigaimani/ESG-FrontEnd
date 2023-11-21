import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { cardSlice } from '../../../slice/cardSlice';
//import { useDispatch } from 'react-redux';
// import jsPDF from 'jspdf';  // Make sure to import jsPDF
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';


const DropDownSection = () => {
 
 
  const dispatch = useDispatch();
  const [measure, setMeasure] = useState('Electricity');
  const [category, setCategory] = useState('Quaterly');
  const [country, setCountry] = useState('Canada');
  const [region, setRegion] = useState('Windsor');
  const graphData = useSelector((state) => state.cardSlice);
  console.log("Payloading data:",graphData)
  useEffect(() => {
    // This code will run after the component has mounted
    handleSubmit(null); // Trigger the dropdown to open
  }, []);

  const handleSubmit = (e) => {
    if (e !== null) e.preventDefault();
    console.log('Submitted!', measure, category, country, region);

    const params = new URLSearchParams({
      measure,
      category,
      country,
      region,
      province: 'Ontario',
    });

    getChartData(params);
    
  };

  const getChartData = async (params) => {
    console.log('Fetching data with params:', params);
  
    const url =
      'http://localhost:8080/solar/getCarbonReducedPercentage?category=' +
      category +
      '&measure=' +
      measure +
      '&country=' +
      country +
      '&province=Ontario&region=' +
      region;
  
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        console.log('API Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        dispatch(cardSlice.actions.setCarbonData({ data }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
 
  const handleDownloadPayloadExcel = () => {
    try {
      if (graphData && graphData.carbonData && graphData.graphData) {
        let dataToExport = { ...graphData.graphData, country: graphData.graphData.country, province: graphData.graphData.province, region: graphData.graphData.region };
  
        // Remove unnecessary columns
        delete dataToExport.carbonReductionQuater;
        delete dataToExport.carbonReductionYear;
  
        if (graphData.graphData.carbonReductionQuater) {
          dataToExport = { ...dataToExport, ...graphData.graphData.carbonReductionQuater };
        } else if (graphData.graphData.carbonReductionYear) {
          const addYearlyData = (prefix) => {
            if (graphData.graphData.carbonReductionYear[prefix]) {
              dataToExport[`${prefix}_Summer`] = graphData.graphData.carbonReductionYear[prefix].summer;
              dataToExport[`${prefix}_Winter`] = graphData.graphData.carbonReductionYear[prefix].winter;
              dataToExport[`${prefix}_Fall`] = graphData.graphData.carbonReductionYear[prefix].fall;
            }
          };
  
          addYearlyData('nextThreeYears');
          addYearlyData('nextFiveYears');
          addYearlyData('nextTenYears');
        }
  
        const ws = XLSX.utils.json_to_sheet([dataToExport]);
        const wb = XLSX.utils.book_new();
        const sheetName = graphData.graphData.carbonReductionQuater ? 'QuaterData' : 'YearlyData';
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        const fileName = sheetName.toLowerCase() + '_data.xlsx';
        XLSX.writeFile(wb, fileName);
      } else {
        console.error('Invalid or incomplete graph data:', graphData);
      }
    } catch (error) {
      console.error('Error generating Excel for payload:', error);
    }
  };
  
  
  


  return (
    <div className="container">
      <form>
        <FormControl variant="outlined" style={{ width: '200px', marginRight: '10px' }} className="dropdown">
          <InputLabel>Measure</InputLabel>
          <Select label="Measure" value={measure} onChange={(e) => setMeasure(e.target.value)}>
            <MenuItem value="Electricity">Electricity</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '200px', marginRight: '10px' }} className="dropdown">
          <InputLabel>Report</InputLabel>
          <Select label="Report" value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="Quaterly">Quaterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '200px', marginRight: '10px' }} className="dropdown">
          <InputLabel>Country</InputLabel>
          <Select label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
            <MenuItem value="Canada">Canada</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '200px', marginRight: '10px' }} className="dropdown">
          <InputLabel>Region</InputLabel>
          <Select label="Region" value={region} onChange={(e) => setRegion(e.target.value)}>
            <MenuItem value="Windsor">Windsor</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={(e) => handleSubmit(e)} color="primary" type="submit">
          Submit
        </Button> &nbsp;
        <Button variant="contained" onClick={handleDownloadPayloadExcel} color="primary" type="button">
          Generate Report
        </Button>



      </form>
    </div>
    
  );
  
};

export default DropDownSection;
