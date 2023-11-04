import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import DropDownSection from './DropDownSection'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const cardList=useSelector((state) => state.cardSlice.cardData);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          {cardList!=null && Object.prototype.hasOwnProperty.call(cardList, 1)?(
            <EarningCard percentage={cardList[1].totalPercent} isLoading={isLoading} />):( <EarningCard percentage="10" isLoading={isLoading} />)}
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
         <DropDownSection></DropDownSection>
      </Grid>
      
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
