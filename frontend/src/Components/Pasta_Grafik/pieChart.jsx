// import React from "react";
// import { Pie } from "@ant-design/charts";
// import styled from "styled-components";

// const Wrapper = styled.div`
//   margin: 64px 32px;
// `;

// const PieChart = () => {
//   // Veri seti
//   const pieChartData = [
//     { type: "A", value: 30 },
//     { type: "B", value: 20 },
//     { type: "C", value: 15 },
//     { type: "D", value: 10 },
//     { type: "E", value: 25 },
//   ];

//   // Grafik yapılandırması
//   const config = {
//     appendPadding: 10,
//     data: pieChartData,
//     angleField: "value",
//     colorField: "type",
//     radius: 0.8,
//     innerratius: 0.6,
//     label: {
//       offset: "-30%",
//       content: "{value}",
//       style: {
//         fontSize: 12,
//         textAlign: "center",
//       },
//     },
//     interactions: [{ type: "element-selected" }],
//     statistic: {
//       title: false,
//       content: {
//         formatter: () => `Toplam\n100`,
//       },
//     },
//   };

//   return (
//     <Wrapper>
//       <Pie {...config} />
//     </Wrapper>
//   );
// };

// export default PieChart;
