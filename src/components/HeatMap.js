import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";

import { getRelativePosition } from "chart.js/helpers";
import "./Heatmap.css";
Chart.register(MatrixController, MatrixElement);

function HeatMap() {
  //   const myChart = new Chart(document.getElementById("myChart"), config);
  //   console.log(data);

  function isoDayOfWeek(dt) {
    let wd = dt.getDay();
    wd = ((wd + 6) % 7) + 1;
    return "" + wd;
  }

  function generateData() {
    const d = new Date();
    const today = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      0,
      0,
      0,
      0
    );
    const data2 = [];
    const end = today;
    let dt = new Date(new Date().setDate(end.getDate() - 365));
    let cnt = 0;
    while (dt <= end && cnt < 365) {
      const iso = dt.toISOString().substring(0, 10);
      data2.push({
        x: iso,
        y: isoDayOfWeek(dt),
        d: iso,
        v: cnt>=300?Math.random() * 50:0,
      });
      cnt++;
      dt = new Date(dt.setDate(dt.getDate() + 1));
    }
    // console.log(data2);
    return data2;
  }

  const data = {
    datasets: [
      {
        label: "Heat map",
        data: generateData(),
        backgroundColor(c) {
          const value = c.dataset.data[c.dataIndex].v;
          const alpha = value / 60;
          return `rgba(0,100,0, ${alpha})`;
          //   return "white";
        },

        borderColor: "rgba(211,211,211,0.5)",
        borderWidth: 1,
        borderRadius: 1,
        hoverBackgroundColor: "rgba(255,26,104,0.2)",
        hoverBorderColor: "rgba(255,26,104,1)",
        width(c) {
          const a = c.chart.chartArea || {};
          return (a.right - a.left) / 53 - 1;
        },
        height(c) {
          const a = c.chart.chartArea || {};
          return (a.bottom - a.top) / 7 - 1;
        },
      },
    ],
  };

  const scales = {
    y: {
      type: "time",
      offset: true,
      time: {
        unit: "day",
        round: "day",
        isoWeek: 1,
        parser: "i",
        displayFormats: {
          day: "iii",
        },
      },
      reverse: true,
      position: "left",
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 2,
        font: {
          size: 8,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
    x: {
      type: "time",
      position: "bottom",
      offset: true,
      time: {
        unit: "week",
        round: "week",
        isoWeekDay: 1,
        displayFormats: {
          month: "MMM",
        },
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 7,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
  };

  const config = {
    type: "matrix",
    data,
    options: {
      maintainAspectRatio: false,
      scales: scales,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function (tooltipItems, data) {
              return "";
            },
            label: function (context) {
              let label = "";
              let date = context.dataset.data[context.dataIndex].x;
              label = date;
              label += " : ";
              label +=
                context.dataset.data[context.dataIndex].v + " submissions";
              return label;
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    const myChart = new Chart(document.getElementById("myChart"), config);
    console.log(data);
    return () => myChart.destroy();
  }, []);
  return (
    <div className="Heatmap">
      <div className="chartBox">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default HeatMap;

// function RandomNumbers(){
//     return Array.from({length : 12}, ()=> Math.floor(Math.random()*100)+1);
// }
// const data = [
//     {Day : 'Mon', frequency: RandomNumbers()},
//     {Day : 'Tue', frequency: RandomNumbers()},
//     {Day : 'Wed', frequency: RandomNumbers()},
//     {Day : 'Thu', frequency: RandomNumbers()},
//     {Day : 'Fri', frequency: RandomNumbers()},
//     {Day : 'Sat', frequency: RandomNumbers()},
//     {Day : 'Sun', frequency: RandomNumbers()},
// ]

// function Heatmap() {
//     const Chart = useRef()
//     const Dimensions = {
//         height : 600,
//         width : 1800,
//         margin : {top: 57, left : 50, bottom : 70, right : 50}
//     }
//     const rectSize =30
//     useEffect(()=>{
//         const svg = d3.select(Chart.current)
//                             .attr('width', Dimensions.width)
//                             .attr('height',Dimensions.height)
//                             .style('background-color','black')
//                             .style('margin',Dimensions.margin)

//         const y = d3.scaleLinear()
//                     .domain([0, data.length])
//                     .range(([0,Dimensions.height]))

//         svg.append('g')
//             .selectAll('text')
//             .data(data)
//             .join('text')
//             .text(d=>  `${d.Day}`)
//             .attr('y',(d,i) =>y(i) + Dimensions.margin.top)
//             .attr('x', Dimensions.margin.left)
//             .attr('fill','white')
//             .style('font-size', 14)

//         //day  blocks
//         data.forEach((day,i) =>{
//             svg.append('g')
//                 .selectAll('rect')
//                 .data(day.frequency)
//                 .join('rect')
//                 .attr('y',y(i) + Dimensions.margin.top - rectSize/2)
//                 .attr('x', (d,j)=> j*2*rectSize + (rectSize) + Dimensions.margin.left)
//                 .attr('width', rectSize)
//                 .attr('height', rectSize)
//                 .attr('fill', 'white')
//         })
//     })

//   return (
//     <div style={{marginTop : "57px"}}>
//        { console.log(data)}
//         <svg ref= {Chart}></svg>
//         </div>
//   )
// }
