import PropTypes from 'prop-types';
import { connect } from 'react-redux';
 
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
 
// project imports
import LogoSection from '../LogoSection';
//import UploadSection from './UploadSection';
 
// assets
import { IconMenu2 } from '@tabler/icons';
 
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
 
const Header = ({ handleLeftDrawerToggle}) => {
  const theme = useTheme();
  const storedFirstName = localStorage.getItem('firstName');
  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
 
      {/* header search */}
      <Box sx={{ flexGrow: 0.25 }} />
     
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
 
      {/* Display Hello, firstName */}
      <Typography variant="subtitle1" sx={{ marginRight: '16px', fontSize: '20px'}}>
        Hello, {storedFirstName}
      </Typography>
    </>
  );
};
 
Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
  storedFirstName: PropTypes.string // Make sure to add the correct prop type for storedFirstName
};
 
// Connect the Header component to the Redux store
const mapStateToProps = (state) => ({
  storedFirstName: state.cardSlice.firstName
});
 
export default connect(mapStateToProps)(Header);
 
