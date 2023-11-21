import PropTypes from 'prop-types';
 
// material-ui
import { styled, } from '@mui/material/styles';
import {
  //Avatar,
  //Card,
  //CardContent,
  Grid,
  LinearProgress,
 // List,
 //ListItem,
  //ListItemAvatar,
  //ListItemText,
  //Typography,
  linearProgressClasses
} from '@mui/material';
 
// assets
//import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
 
// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}));
 

 
// ==============================|| PROGRESS BAR WITH LABEL ||============================== //
 
function LinearProgressWithLabel({ value, ...others }) {
  //const theme = useTheme();
 
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        
      </Grid>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} {...others} />
      </Grid>
    </Grid>
  );
}
 
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};
 
// ==============================|| SIDEBAR MENU Card ||============================== //
 
const MenuCard = () => {
  //const theme = useTheme();

};
 
export default MenuCard;
 