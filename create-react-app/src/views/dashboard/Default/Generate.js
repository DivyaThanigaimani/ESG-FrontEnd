import React, { useState, useEffect } from 'react';
import {Button} from '@mui/material';
import { cardSlice } from '../../../slice/cardSlice';
//import { useDispatch } from 'react-redux';
// import jsPDF from 'jspdf';  // Make sure to import jsPDF
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//import * as XLSX from 'xlsx';
 const Generate = ({ cardList, generateExcel }) => {
 
 
  const dispatch = useDispatch();
  const [measure,] = useState('Electricity');
  const [category, ] = useState('Quaterly');
  const [country, ] = useState('Canada');
  const [region, ] = useState('Windsor');
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
 return (
    <div className="container">
      <form>
    <Button
  variant="contained"
  onClick={() => generateExcel(cardList)}
  color="primary"
  type="button"
  style={{
    fontSize: '1.5rem',
        padding: '19px 380px',
        margin: 'auto',  // This will center the button
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
        marginLeft:'300px',
        marginRight:'150px', 
        // You can add more styles here
  }}
>
  Generate Report
</Button>
 </form>
    </div>
  );
 
};
 
export default Generate;
 