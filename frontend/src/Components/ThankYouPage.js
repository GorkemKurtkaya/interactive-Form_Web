// ThankYouPage.js 

import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function ThankYouPage() { 
	const navigate = useNavigate();
	const navigator = () => {
		navigate('/nowhere');
	}
return ( 
	<div className="container-fluid qform"> 
			<div className="col-md-5 m-auto"> 
				<div className="mt-3"> 
					<div className="card text-center h-100"> 
						<div className="card-body my-3"> 
							<h3>Cevapların İçin Teşekkürler!</h3> 
							<h6>Bu Sayfayı Kapatabilirsin.</h6> 
						</div> 
						<Button onClick={navigator}>Hiç bir yere gitmek ister misin?</Button>
					</div> 
				</div> 
			</div> 
		</div> 
); 
} 

export default ThankYouPage;
