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
  
    // Update the questionData state with the new data 
    setQuestionData(myQuestionData); 
  
    // Update the localStorage with the new questionData 
    localStorage.setItem("questiondata", JSON.stringify(myQuestionData)); 
  } 

  // JWT'nin geçerliliğini kontrol eden fonksiyon
const checkJWTValidity = () => {
  const token = sessionStorage.getItem('token'); // SessionStorage'den token'ı al

  if (token) {
      return true; // Token varsa ve geçerliyse true döndür
  }

  return false; // Token yoksa veya hatalı ise false döndür
};

useEffect(() => {
  setIsLoggedIn(checkJWTValidity());
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