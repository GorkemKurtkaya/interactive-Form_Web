import './App.css'; 
import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import BasicInfo from './Components/BasicInfo'; 
import AdditionalQuestions from './Components/AdditionalQuestions';
import EnteredDetails from './Components/EnteredDetails'; 
import ThankYouPage from './Components/ThankYouPage'; 
import { About } from './Components/About'; 
import  Sign  from './Components/login-signup';
import  Formcreate  from './Components/formcreate';
import FormsList from './Components/getforms';
import FormShare from './Components/formshare';
import Navbar from './Components/navbar';
import Sidebar from './Components/sidebar/sidebar';
import NewFormsList from './Components/newgetforms';
import {Spinner} from './Components/spinner';
  
function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumu state'i eklendi
  // basicdatayı localstorage'dan al veya boş bir nesne olarak başlat
  const initBasicData = JSON.parse(localStorage.getItem('data')) || {}; 
  // questiondatayı localstorage'dan al veya boş bir nesne olarak başlat 
  const initQuestionsData = JSON.parse(localStorage.getItem('questiondata')) || {}; 
  
  // basicData ve questionData state'lerini başlat
  const [basicData, setBasicData] = useState(initBasicData); 
  const [questionData, setQuestionData] = useState(initQuestionsData); 
  
  // güncellenen basicData'yı localstorage'a kaydet
  useEffect(() => { 
    localStorage.setItem('data', JSON.stringify(basicData)); 
  }, [basicData]); 
  
  // güncellenen questionData'yı localstorage'a kaydet 
  useEffect(() => { 
    localStorage.setItem('questiondata', JSON.stringify(questionData)); 
  }, [questionData]); 
  
  // fonksiyonlarımızı tanımlayalım 
  const addBasicData = (name, email, contact) => { 
    // verilen temel verilerle bir nesne oluştur 
    const myBasicData = { 
      name: name, 
      email: email, 
      contact: contact 
    }; 
  
    //  yeni verilerle basicData'yı güncelle 
    setBasicData(myBasicData); 
  
    // yeni basicData ile localstorage'ı güncelle 
    localStorage.setItem("data", JSON.stringify(myBasicData)); 
  } 
  
  // fonksiyonlarımızı tanımlayalım
  const addQuestionData = (profession, interest, reference, selectedStars) => { 
    // verilen verilerle bir nesne oluştur
    const myQuestionData = { 
      profession: profession, 
      interest: interest, 
      reference: reference ,
      selectedStars:selectedStars
    }; 
  
    // yeni verilerle questionData'yı güncelle
    setQuestionData(myQuestionData); 
  
    //localStorage'ı güncelle
    localStorage.setItem("questiondata", JSON.stringify(myQuestionData)); 
  } 

// JWT kontrol fonksiyonu
const checkJWTValidity = async () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // Eğer token yoksa geçersiz kabul edelim
  }

  try {
    const response = await fetch('http://localhost:3000/auth/get_admin_by_token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token geçersiz veya süresi dolmuş, giriş yapılmasın
        sessionStorage.removeItem('token'); // Tokenı sil
        return false;
      } else {
        throw new Error('Sunucudan geçersiz bir yanıt alındı.');
      }
    }

    // Sunucudan başarılı yanıt alındı, token geçerli
    return true;
  } catch (error) {
    console.error('JWT kontrol hatası:', error.message);
    return false;
  }
};

useEffect(() => {
  const checkLoggedIn = async () => {
    const isLoggedIn = await checkJWTValidity();
    setIsLoggedIn(isLoggedIn);
  };

  checkLoggedIn();
}, []);



  
  // Render the application 
  return ( 
    <Router> 
      {/* Define the routes */} 
      {!isLoggedIn ? (
        <Routes>
          <Route path='*' element={
        <div>
            <navigate to="/sign" />
            <h1 className='uyarımesaj'>Yetkisiz Giriş</h1>
        </div>}
          />
          <Route path='/noWhere' element={<Spinner />} />
          <Route path='/sign' element={<Sign />} />
          <Route 
            path='/questions'
            element={<AdditionalQuestions addQuestionData={addQuestionData} />} 
          />

          <Route 
            path='/forms/formshare/:formId'
            element={<FormShare />} 
          /> 
          {/* Render the ThankYouPage component */} 
          <Route 
            path='/thanks'
            element={<ThankYouPage />} 
          /> 

          </Routes>
      ) : (
          <Routes>
         <Route path='/sign' element={ <Navigate replace to="/" />} />
          <Route path='*' element={<div >NOT FOUND </div>} />
  
          {/* Render the BasicInfo component with the addBasicData function */} 
          <Route path='/' element={<BasicInfo addBasicData={addBasicData} />} /> 
    
          {/* Render the AdditionalQuestions component with the addQuestionData function */} 
          <Route 
            path='/questions'
            element={<AdditionalQuestions addQuestionData={addQuestionData} />} 
          /> 
    
          {/* Render the EnteredDetails component with basicData and questionData */} 
          <Route 
            path='/details'
            element={<EnteredDetails data={basicData} questiondData={questionData} />} 
          /> 
    
          {/* Render the ThankYouPage component */} 
          <Route 
            path='/thanks'
            element={<ThankYouPage />} 
          /> 
    
          {/* Render the About component */} 
          <Route 
            path='/about'
            element={<About />} 
          /> 
  
            
          <Route 
            path='/formcreate'
            element={<Formcreate />} 
          />
  
          <Route 
            path='/formslist'
            element={<FormsList />} 
          />
          
          <Route 
            path='/navbar'
            element={<Navbar />} 
          />

          <Route 
            path='/sidebar'
            element={<Sidebar />} 
          />
          <Route 
            path='/newformslist'
            element={<NewFormsList />} 
          />
          
  
  
        </Routes> 
        )}
      
    </Router> 
  ); 
} 
  
// Export the App component as the default export 
export default App;