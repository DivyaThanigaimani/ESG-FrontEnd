import { createSlice } from '@reduxjs/toolkit';
const initialState = {
   cardData:null
};

export const cardSlice=createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
      uploadFile(state, action) {
        console.log(action.payload)
       const cardList=action.payload;
            if (cardList!=null){
              const groupedData = cardList.data.reduce((acc, item) => {
                console.log(item);
                const { scope, ...rest } = item;
                if (!acc[scope]) {
                  acc[scope] = [];
                }
                acc[scope].push(rest);
              
                return acc;
                
            }, {});
            console.log(groupedData);
            
            for (const groupNumber in groupedData) {
              const group = groupedData[groupNumber];
              let totalPercent = 0;
            
              for (const obj of group) {
                totalPercent += obj.percent;
              }
            
              groupedData[groupNumber].totalPercent = totalPercent;
            }
            console.log(groupedData);
            state.cardData=groupedData;
          }
        
      },
    },
  });
//export const { uploadFile } = cardSlice.actions;
export default cardSlice;