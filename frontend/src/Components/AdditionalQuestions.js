import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import StarRateApp from './star-rating.js'; // Updated import path
import "../App.css";
import Navbar from './navbar.jsx';

export default function AdditionalQuestions({ addQuestionData, addNewQuestion }) { 
  const [selectedStars, setSelectedStars] = useState(0); 
  const [profession, setProfession] = useState(""); 
  const [interest, setInterest] = useState(""); 
  const [reference, setReference] = useState(""); 
  const [otherProfession, setOtherProfession] = useState(""); 
  const [otherInterest, setOtherInterest] = useState(""); 
  const [otherReference, setOtherReference] = useState("");
  const [otherselectedStars , setofOtherselectedStars]=useState(0);
  const [questions, setQuestions] = useState([]); // New state for questions
  const [newQuestion, setNewQuestion] = useState("");  // New state for the new question
  
  const navigate = useNavigate(); 

  const onStarSelect = (stars) => {
    setSelectedStars(stars);
  };

  const submit = (e) => { 
    e.preventDefault(); 

    if (!profession || !interest || !reference || !selectedStars) { 
      alert("Tüm Alanları Doldurunuz!"); 
    } else { 
      if (profession === "Others") { 
        profession = otherProfession; 
      } 
      if (interest === "Others") { 
        interest = otherInterest; 
      } 
      if (reference === "Others") { 
        reference = otherReference; 
      }
      if (selectedStars === "Others") {
        selectedStars = otherselectedStars;
      }
      
      console.log(profession, interest, reference, selectedStars); 
      addQuestionData(profession, interest, reference, selectedStars); 

      console.log('Selected Stars:', selectedStars);

      navigate('/details'); 
    } 
  }; 
  
  const handleProfessionChange = (e) => { 
    setProfession(e.target.value); 
  }; 
  
  const handleInterestChange = (e) => { 
    setInterest(e.target.value); 
  }; 
  
  const handleReferenceChange = (e) => { 
    setReference(e.target.value); 
  };
  
  const handleStarChange = (e) => {
    setofOtherselectedStars(e.target.value);
  };

  const handleNewQuestionChange = (e) => { // Function to handle new question input
    setNewQuestion(e.target.value);
  };

  const addNewQuestionHandler = () => { // Function to add new question
    if (newQuestion.trim() !== "") { // Check if the new question is not empty
      setQuestions([...questions, { question: newQuestion, stars: selectedStars }]); // Add new question to questions array
      setNewQuestion(""); // Clear the input field after adding the question
      setSelectedStars(0); // Reset selectedStars to 0
    }
  };

  
  
  return ( 
    <div className="container-fluid qform"> 
    <Navbar/>
      <div className="col-md-5 m-auto"> 
        <div className="mt-3"> 
          <div className="card text-left h-100"> 
            <div className="card-body"> 
              <form onSubmit={submit}> 
                <label htmlFor=""> 
                  <h4>Sorular</h4> 
                </label> 
  
                <div className="form-group m-2" onChange={handleProfessionChange}> 
                  <label htmlFor="q1"> 
                    <b>1.</b> Mesleğiniz Nedir? 
                  </label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="ProfessionRadio"
                    id="student"
                    autoComplete="off"
                    className="m-2"
                    value="Student"
                  /> 
                  <label htmlFor="student"> Öğrenci</label> 
                  <br /> 
                  {/* Other options for profession with text input */} 
                  <input 
                    type="radio"
                    name="ProfessionRadio"
                    id="sde"
                    autoComplete="off"
                    className="m-2"
                    value="Software Engineer"
                  /> 
                  <label htmlFor="sde"> Yazılım Mühendisi</label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="ProfessionRadio"
                    id="teacher"
                    autoComplete="off"
                    className="m-2"
                    value="Teacher"
                  /> 
                  <label htmlFor="teacher"> Öğretmen</label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="ProfessionRadio"
                    id="others"
                    autoComplete="off"
                    className="m-2"
                    value="Others"
                  /> 
                  <label htmlFor="others">  Diğer:</label> 
                  <input 
                    type="text"
                    id="otherProfession"
                    autoComplete="off"
                    className="form-control m-2"
                    value={otherProfession} 
                    onChange={(e) => { setOtherProfession(e.target.value) }} 
                  /> 
                  <hr /> 
                </div> 
  
                {/* Interest options */} 
                <div className="form-group m-2" onChange={handleInterestChange}> 
                  <label htmlFor="q2"> 
                    <b>2.</b> İlgi Alanlarınız Nelerdir? 
                  </label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="interestRadio"
                    id="dsa"
                    autoComplete="off"
                    className="m-2"
                    value="DSA"
                  /> 
                  <label htmlFor="dsa"> DSA</label> 
                  <br /> 
                  {/* Other options for interest with text input */} 
                  <input 
                    type="radio"
                    name="interestRadio"
                    id="fullstack"
                    autoComplete="off"
                    className="m-2"
                    value="Full Stack Development"
                  /> 
                  <label htmlFor="fullstack"> Full Stack Development</label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="interestRadio"
                    id="dataScience"
                    autoComplete="off"
                    className="m-2"
                    value="Data Science"
                  /> 
                  <label htmlFor="dataScience"> Data Science</label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="interestRadio"
                    id="compeProgramming"
                    autoComplete="off"
                    className="m-2"
                    value="Competitive Programming"
                  /> 
                  <label htmlFor="compeProgramming"> Competitive Programming</label> 
                  <br /> 
                  <input 
                    type="radio"
                    name="interestRadio"
                    id="others"
                    autoComplete="off"
                    className="m-2"
                    value="Others"
                  /> 
                  <label htmlFor="others"> Diğer:</label> 
                  <input 
                    type="text"
                    id="otherInterest"
                    autoComplete="off"
                    className="form-control m-2"
                    value={otherInterest} 
                    onChange={(e) => { setOtherInterest(e.target.value) }} 
                  /> 
                  <hr /> 
                </div> 
  
                <div className="form-group m-2" onChange={handleReferenceChange}>
                  <label htmlFor="q3"> 
                    <b>3.</b> Bizden Nasıl Haberdar Oldunuz? 
                  </label>
                    <br />
                  <label htmlFor=" "> </label>
                  <br/> 
                  {/* Star rating component */} 
                  <StarRateApp onStarSelect={onStarSelect}
                  value={selectedStars} // Corrected to show selectedStars value
                  onChange={(e) => { setSelectedStars(e.target.value) }} // Corrected to set selectedStars 
                  />
                  <br />
                </div>


                {/* Text input for adding new question */}
                <div className="form-group m-2">
                  <label htmlFor="newQuestion">Yeni Soru Ekle</label>
                  <input
                    type="text"
                    id="newQuestion"
                    className="form-control"
                    value={newQuestion}
                    onChange={handleNewQuestionChange}
                  />
                  <button type="button" className="btn btn-primary mt-2" onClick={addNewQuestionHandler}>
                    Ekle
                  </button>
                </div>

                {/* Display added questions */}
                <div className="form-group m-2">
                  <label htmlFor="addedQuestions"><h5>Eklenen Sorular:</h5></label>
                  <br />
                  <br />
                  

                  <ul>
                    {questions.map((q, index) => (
                      <li key={index}>
                        {q.question}
                        <StarRateApp onStarSelect={() => {}} value={q.stars} />
                      </li>
                    ))}
                  </ul>
                </div>
                 
  
                
              
              <div className="form-group m-2" onChange={handleProfessionChange}> 
                  {/* Existing code for profession options */}
                </div> 

                <div className="form-group m-2" onChange={handleInterestChange}> 
                  {/* Existing code for interest options */}
                </div> 

                <div className="form-group m-2" onChange={handleReferenceChange}>
                  {/* Existing code for reference options */}
                </div>

                <div className="form-group m-2" onChange={handleStarChange}>
                  {/* Existing code for star rating */}
                </div>
                 
                <button type="submit" className="btn btn-success mx-3" style={{ float: 'right' }}> 
                  Next 
                </button>
              </form> 


              <center> 
                  <a href="/" className="badge rounded-pill disabled text-secondary">1</a> 
                  <a href="/questions" className="badge badge-pill bg-secondary"><b>2</b></a> 
                  <a href="/details" className="badge rounded-pill disabled text-secondary">3</a> 
                </center>
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}
