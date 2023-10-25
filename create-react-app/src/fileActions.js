
export const uploadFileSuccess = (data) => ({
    type: 'UPLOAD_FILE_SUCCESS',
    payload: data,
  });
  
  export const uploadFileFailure = (error) => ({
    type: 'UPLOAD_FILE_FAILURE',
    payload: error,
  });
  
  export const uploadFile = (formData) => {
   
    console.log(formData)
    return (dispatch) => {
      //  dispatch(uploadFileLoading()); // Dispatch loading action

        fetch('http://localhost:8080/upload/excel', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized access');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json(); // Parse response as JSON
        })
        .then((data) => {
            console.log('API response:', data);
            dispatch(uploadFileSuccess(data));
        })
        .catch((error) => {
            console.error('Error:', error);
            dispatch(uploadFileFailure(error));
        });
    };
  };
  