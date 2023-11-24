import React, { useState } from 'react';
import { Button, Table } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import * as XLSX from 'xlsx';

const CalcPage = () => {
 const [apiResponse, setApiResponse] = useState(null);
  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/upload/carbonexcel', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setApiResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error if needed
      });
  };
  const generateExcel = () => {
    try {
      // Flatten the nested structure
      const flattenedData = Object.values(apiResponse).flatMap((group) => group);
 console.log(flattenedData+"flattenedData");
      // Define column names
      const columns = ["measures","unit","carbon_produced"];
 
      // Create an array with headers as the first element
      const excelData = [columns, ...flattenedData.map((item) => columns.map((col) => item[col]))];
 
      // Create a worksheet
      const ws = XLSX.utils.aoa_to_sheet(excelData);
 
      // Create workbook and add worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'ReportSheet');
 
      // Save file
      XLSX.writeFile(wb, 'InputFile.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  };
  return (
    <MainCard title="Carbon Calculation">
      <Button variant="contained" component="label">
        Upload File
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
      </Button>
      {apiResponse && (
       <Table striped bordered hover style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
       <thead>
         <tr>
           {Object.keys(apiResponse[0])
             .filter((key) => key !== 'unit') // Exclude the entire "unit" column
             .map((key) => (
               <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
             ))}
         </tr>
       </thead>
       <tbody>
         {apiResponse.map((item, index) => (
           <tr key={index}>
             {Object.entries(item)
               .filter(([key]) => key !== 'unit') // Exclude the entire "unit" column
               .map(([key, value]) => (
                 <td key={key} style={{ border: '1px solid #dee2e6', padding: '8px' }}>{value}</td>
               ))}
           </tr>
         ))}
       </tbody>
     </Table>
      )}
       {apiResponse && <Button
  variant="contained"
  onClick={() => generateExcel()}
  color="primary"
  type="button"
  style={{
    
    marginTop:'10px'
    
       
  }}
>
  Generate Report
</Button>}
    </MainCard>
  );
};

export default CalcPage;
