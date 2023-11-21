// SamplePage Component

//import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DropDownSection from '../dashboard/Default/DropDownSection'  
//import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import TotalGrowthBarChart from '../dashboard/Default/TotalGrowthBarChart';

// Function to generate Excel


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
