import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {uploadFile} from '../../../../../src/fileActions';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cardSlice } from '../../../../slice/cardSlice'
const UploadSection = () => {
  const dispatch = useDispatch();
  //const cardSlice = useSelector((state) => state.cardSlice);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const formData = new FormData();
        formData.append('file', file);
        console.log("dispatchaction'")
        fetch('http://localhost:8080/upload/excel', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
            // Do something with the response from the API
            console.log('API response:', data);
            dispatch(cardSlice.actions.uploadFile({data}));
            })
            .catch(error => {
            console.error('Error:', error);
            //dispatch(uploadFileFailure(error));
            });
      //  uploadFile(formData);
        }
    }
    return (
      <Button
      variant="contained"
      component="label"
      startIcon={<CloudUploadIcon />}
      style={{
        fontSize: '1.5rem',
        //margin: '101px 121px auto 300px',
        //padding: '19px 300px',
        //margin: 'auto',  // This will center the button
        //display: 'flex',
        //flexDirection: 'column',
        //alignItems: 'center',
        //marginTop: '100px',
        //marginLeft:'300px',
        //marginRight:'150px', // Add margin at the bottom
        // You can add more styles here
      }}
    >
      Upload File
      <input type="file" hidden onChange={handleFileUpload}/>
    </Button>
    
    
      );
 
};
 
 
 
export default connect(null, { uploadFile })(UploadSection);
