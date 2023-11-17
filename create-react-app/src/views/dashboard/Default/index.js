import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
//import PopularCard from './PopularCard';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import DropDownSection from './DropDownSection'
import * as XLSX from 'xlsx';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const cardList=useSelector((state) => state.cardSlice.cardData);
  const chartData=useSelector((state) => state.cardSlice.carbonData);
  console.log("The chart data is",chartData);
  console.log("The chart list is",cardList);
  useEffect(() => {
    setLoading(false);
  }, []);


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
  console.log('Updated chartData:', chartData);
//generateChartDataExcel(chartData, category);





  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {cardList != null && Object.prototype.hasOwnProperty.call(cardList, 1) ? (
              <EarningCard percentage={cardList[1].totalPercent} isLoading={isLoading} />
            ) : (
              <EarningCard percentage="10" isLoading={isLoading} />
            )}
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DropDownSection
          cardList={cardList}
          generateExcel={generateExcel}
         
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {chartData != null ? (
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart chartingData={chartData} isLoading={isLoading} />
            </Grid>
          ) : (
            <h1>No Data</h1>
          )}
          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  
};

export default Dashboard;