import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
//import PopularCard from './PopularCard';

//import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Generate from './Generate'
import * as XLSX from 'xlsx';
import UploadSection from 'layout/MainLayout/Header/UploadSection';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const cardList=useSelector((state) => state.cardSlice.cardData);
  console.log(localStorage.getItem("role")+"role");
  
  const isAdmin =localStorage.getItem("role") === 'Admin';
 
  //const chartData=useSelector((state) => state.cardSlice.carbonData);
  //console.log("The chart data is",chartData);
  console.log("The chart list is",cardList);
  useEffect(() => {
    setLoading(false);
  }, []);
  
  const generate = (cardList) => {
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

//generateChartDataExcel(chartData, category);
return (
  <MainCard title="Carbon Percentage - 2024">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          {cardList!=null && Object.prototype.hasOwnProperty.call(cardList, 1)?(
            <EarningCard carddata={cardList[1]}  scopeText="Scope 1" percentage={cardList[1].totalPercent} isLoading={isLoading} cardColor="#90CAF9" />):( <EarningCard percentage="0" isLoading={isLoading} scopeText="Scope 1" cardColor="#90CAF9" />)}
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          {cardList!=null && Object.prototype.hasOwnProperty.call(cardList, 2)?(
            <EarningCard carddata={cardList[2]} scopeText="Scope 2" percentage={cardList[2].totalPercent} isLoading={isLoading} cardColor="#1E88E5D9"/>):( <EarningCard percentage="0" isLoading={isLoading} scopeText="Scope 2" cardColor="#1E88E5D9" />)}
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
          {cardList!=null && Object.prototype.hasOwnProperty.call(cardList, 3)?(
            <EarningCard carddata={cardList[3]} scopeText="Scope 3" percentage={cardList[3].totalPercent} isLoading={isLoading} cardColor="#5E35B1"/>):( <EarningCard percentage="0" isLoading={isLoading} scopeText="Scope 3" cardColor="#5E35B1"/>)}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
      {isAdmin ? <UploadSection />:<div></div>}
      <Generate
    cardList={cardList}
    generate={generate}
/>

      </Grid>
      
    </Grid>
    </MainCard>
  );
  
};

export default Dashboard;