// import { useState, useEffect } from "react";
// import { CIcon } from "@/components/CIcon";
// import classNames from "classnames";
// import { CMutedText } from "@/components/CMutedText";
// import { CSpace } from "@/components/CSpace";

// export default function CRate({
//   rate,
//   hasReviewCount,
//   reviewCount,
//   hasOneStar,
//   isOneRow,
//   isProcedure,
// }) {
//   const renderIconContent = () => {
//     const contentArray = [];
//     for (let i = 0; i < 5; i++) {
//       contentArray.push(
//         <CIcon
//           key={i}
//           className={classNames(
//             i < Math.round(rate || 0) ? "text-yellow-500" : "text-zinc-300"
//           )}
//           icon={cIconStar}
//         />
//       );
//     }
//     return contentArray;
//   };

//   return (
//     <>
//       {isOneRow ? (
//         <CSpace className={"items-center"}>
//           {!isProcedure && <span>{rate ? rate : "-.-"}</span>}
//           {hasOneStar ? (
//             <div>
//               <CIcon className="text-yellow-500" icon={cIconStar} />
//             </div>
//           ) : (
//             <div className={"flex space-x-1"}>{renderIconContent()}</div>
//           )}
//           {hasReviewCount && (
//             <CMutedText
//               value={`${reviewCount ? reviewCount : "-"} reviews`}
//               rate={rate}
//               isProcedure={isProcedure}
//             />
//           )}
//         </CSpace>
//       ) : (
//         <div className={"inline-block text-center"}>
//           <div className={"inline-block"}>
//             <div className={"flex space-x-2 items-center"}>
//               <span>{rate}</span>
//               <div>
//                 <CIcon className="text-yellow-500" icon={cIconStar} />
//               </div>
//             </div>
//           </div>
//           <CMutedText value={`${reviewCount} reviews`} />
//         </div>
//       )}
//     </>
//   );
// }
