import { createSlice } from '@reduxjs/toolkit';
const initialState = {
   cardData:null,
   carbonData:null,
  graphData:null
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
      setCarbonData(state, action) {
       const payLoadData=action.payload.data;
       state.graphData=payLoadData;
       if(payLoadData.carbonReductionQuater!=null){
      const summer=payLoadData.carbonReductionQuater.summer/1000;
      const winter=payLoadData.carbonReductionQuater.winter/1000;
       const fall=payLoadData.carbonReductionQuater.fall/1000;
       console.log("PayloadData:",payLoadData);
        state.carbonData = {
          height: 480,
          type: 'bar',
          options: {
            chart: {
              id: 'bar-chart',
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%'
              }
            },
            xaxis: {
              type: 'category',
              categories: ['Summer', 'Winter', 'Fall']
            },
            legend: {
              show: true,
              fontSize: '14px',
              fontFamily: `'Roboto', sans-serif`,
              position: 'bottom',
              offsetX: 20,
              labels: {
                useSeriesColors: false
              },
              markers: {
                width: 16,
                height: 16,
                radius: 5
              },
              itemMargin: {
                horizontal: 15,
                vertical: 8
              }
            },
            fill: {
              type: 'solid'
            },
            dataLabels: {
              enabled: false
            },
            grid: {
              show: true
            }
          },
          series: [
            {
              name: 'Summer',
              data: [summer,0,0]
            },
            {
              name: 'Winter',
              data: [0, winter, 0]
            },
            {
              name: 'Fall',
              data: [0, 0, fall]
            },
            
          ]
        };
      }
      else{
      const next3Years=payLoadData.carbonReductionYear.nextThreeYears;
      const next5Years=payLoadData.carbonReductionYear.nextFiveYears;
       const next10Years=payLoadData.carbonReductionYear.nextTenYears;
       console.log("Payload1data:",payLoadData);
       state.graphData=payLoadData;
        state.carbonData = {
          height: 480,
          type: 'bar',
          options: {
            chart: {
              id: 'bar-chart',
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%'
              }
            },
            xaxis: {
              type: 'category',
              categories: ['Next 3 Years', 'Next 5 Years', 'Next 10 Years']
            },
            legend: {
              show: true,
              fontSize: '14px',
              fontFamily: `'Roboto', sans-serif`,
              position: 'bottom',
              offsetX: 20,
              labels: {
                useSeriesColors: false
              },
              markers: {
                width: 16,
                height: 16,
                radius: 5
              },
              itemMargin: {
                horizontal: 15,
                vertical: 8
              }
            },
            fill: {
              type: 'solid'
            },
            dataLabels: {
              enabled: false
            },
            grid: {
              show: true
            }
          },
          series: [
            {
              name: 'Summer',
              data: [next3Years.summer,next5Years.summer,next10Years.summer]
            },
            {
              name: 'Fall',
              data: [next5Years.fall, next5Years.fall,next10Years.fall]
            },
            {
              name: 'Winter',
              data: [next5Years.fall, next5Years.fall,next10Years.fall]
            },
            
          ]
        };
      }
    }
    },
    
  });
//export const { uploadFile } = cardSlice.actions;
export default cardSlice;