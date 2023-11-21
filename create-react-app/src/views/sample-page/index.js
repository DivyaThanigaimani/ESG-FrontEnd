// SamplePage Component

//import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DropDownSection from '../dashboard/Default/DropDownSection'  
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import TotalGrowthBarChart from '../dashboard/Default/TotalGrowthBarChart';

// Function to generate Excel
const generateExcel = (cardList) => {
  try {
    // Flatten the nested structure
    const flattenedData = Object.values(cardList).flatMap((group) => group);

    // Define column names
    const columns = ['region', 'measures', 'unit', 'emission_amt', 'percent'];

    // Create an array with headers as the first element
    const excelData = [columns, ...flattenedData.map((item) => columns.map((col) => item[col]))];

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ReportSheet');

    // Save file
    XLSX.writeFile(wb, 'dashboard_data.xlsx');
  } catch (error) {
    console.error('Error generating Excel:', error);
  }
};

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () =>  {
  const chartData=useSelector((state) => state.cardSlice.carbonData);
  console.log("The chart data is",chartData);
  return (
    <MainCard title="Carbon Reduction Analysis">
      <DropDownSection generateExcel={generateExcel} />
      {chartData != null ? (
        <TotalGrowthBarChart chartingData={chartData} isLoading={false} />
      ) : (
        <h1>No Data</h1>
      )}
    </MainCard>
  );
};

export default SamplePage;
