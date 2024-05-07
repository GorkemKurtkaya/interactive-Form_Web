// import React, { useState, useEffect } from 'react';
// import './sidebar.css';
// import { useNavigate } from 'react-router-dom';

// export default function SideBar({selectedOption, setSelectedOption}) {

//   const navigate = useNavigate();

// useEffect(() => {
  
// });
//   const handleLogout = () => {
//     window.localStorage.removeItem("token");
//     sessionStorage.removeItem('token'); // Token'ı sessionStorage'den kaldır
//     navigate('/sign'); // Çıkış yapıldığında login sayfasına yönlendir
//     window.location.reload(); // Sayfayı yenile
//   };


//   return (
//     <div className="">
//       <div className="gorkem-sidebar">
//         <div className="gorkem-logo" style={{ backgroundImage: `url(${"https://avatars.githubusercontent.com/u/27950435?s=200&v=4"})` }}></div>
//         <ul className="gorkem-options">
//           <li
//             className={`gorkem-option ${selectedOption === 'home' ? 'active' : ''}`}
//             onClick={() => setSelectedOption('home')}
//           >
//             <span className="gorkem-icon">
//               <i className="fa fa-house" />
//             </span>
//             <span className="gorkem-text">Home</span>
//           </li>
//           <li
//             className={`gorkem-option ${selectedOption === 'deneme' ? 'active' : ''}`}
//             onClick={() => setSelectedOption('deneme')}
//           >
//             <span className="gorkem-icon">
//               <i className="fa fa-file-code-o" />
//             </span>
//             <span className="gorkem-text">Deneme</span>
//           </li>
//           {/* <li
//                         className={`gorkem-sign-button btn-lg ${selectedOption === 'sign' ? 'active' : ''}`}
//                         onClick={() => setSelectedOption('sign')}
//                     >
//                         Sign
//                     </li> */}
//         </ul>


//         <button className="gorkem-sign-button btn-lg" onClick={handleLogout}>Logout</button>
//       </div>
//     </div>

//   );
// };
