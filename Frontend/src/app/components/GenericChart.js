import ReactApexChart from 'react-apexcharts';
import { cyan } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';
const GenericChart = ({ yaxisData, xaxisData, chartName, month, year }) => {

   const data = [
      {
         name: chartName,
         type: 'area',
         data: yaxisData,
      },
   ];
   const chartOptions = {
      chart: {
         type: 'line',
         zoom: {
            enabled: false,
         },
      },
      dataLabels: {
         enabled: true,
         style: {
            colors: [cyan[600]],
            opacity: 0.6,
         },
      },
      stroke: {
         curve: 'smooth',
         colors: [cyan[600]],
      },
      fill: {
         type: 'solid',
         opacity: [0.35, 1],
         colors: [cyan[300], 'transparent'],
      },
      grid: {
         row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
         },
      },
      xaxis: {
         categories: xaxisData
      },
      noData: {
         text: 'No hay datos para mostrar.',
         align: 'center',
         verticalAlign: 'middle',
         offsetX: 0,
         offsetY: 0,
         style: {
            color: '#547290',
            fontSize: '16px',
         },
      },
   };
   return (
      <Box sx={{ minHeight: "100%", width: "100%" }}>
         <Typography
            sx={{ fontWeight: 'bold', color: '#16193b', marginTop: "10px" }}
            variant="h6"
            id="dashBoardTitle"
         >
            Grafica de {chartName} - {month} {year} 
         </Typography>
         <ReactApexChart options={chartOptions} series={data} height={400} />
      </Box>
   )
}

export default GenericChart;