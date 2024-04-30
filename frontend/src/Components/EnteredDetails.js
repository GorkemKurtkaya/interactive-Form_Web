// EnteredDetails.js 

import { useNavigate } from 'react-router-dom'; 

export default function EnteredDetails(props) { 
  const navigate = useNavigate(); 
console.log(props.questiondData.selectedStars);
  // Function to handle form submission 
  const submit = () => { 
    console.log(props.data); // Log basicData object 
    console.log(props.questiondData); // Log questionData object 
    navigate('/thanks'); // Navigate to the thanks page 
  }; 

  return ( 
    <div className="container-fluid qform"> 
      <div className="col-md-5 m-auto"> 
        <div className="mt-3"> 
          <div className="card text-left h-100"> 
            <div className="card-body my-3"> 
              <h4>Girilen Detaylar</h4> 

              {/* Display basicData */} 
              <p> 
                <b>İsim:</b> {props.data.name} 
              </p> 
              <p> 
                <b>Email:</b> {props.data.email} 
              </p> 
              <p> 
                <b>İletişim No.:</b> {props.data.contact} 
              </p> 

              <h4>Cevaplar</h4> 

              {/* Display questionData */} 
              <p> 
                <b>Meslek:</b> {props.questiondData.profession} 
              </p> 
              <p> 
                <b>İlgi Alanı:</b> {props.questiondData.interest} 
              </p> 
              <p> 
                <b>Referans:</b> {props.questiondData.reference} 
              </p> 
              <p> 
                <b>Yıldızlar:</b>   {props.questiondData.selectedStars}
              </p> 

              {/* Submit button */} 
              <button type="submit" onClick={submit} className="btn btn-success"> 
                Submit 
              </button> 

              {/* Page numbers */} 
              <center> 
                  <a href="/" className="badge rounded-pill disabled">1</a> 
                  <a href="/questions" className="badge rounded-pill disabled"><b>2</b></a> 
                  <a href="/details" className="badge badge-pill bg-success">3</a> 
                </center> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
} 