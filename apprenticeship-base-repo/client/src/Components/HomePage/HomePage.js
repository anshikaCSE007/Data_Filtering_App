import "./HomePage.css";
import React,{useState} from "react"
import Dropdown from "./Dropdown/Dropdown"
import Sidebar from "./Sidebar/Sidebar"
function HomePage() {
	const gender =["Male","Female"]
	const nationality = ["Australia(AU)","Brazil(BR","Canada(CA)","France(FR)","Great Britain(GB)","USA(US)"]
	const numberOfResults = [10,20,50,100]
	const[gen,setGen] = useState(null)
	const[nat,setNat] = useState(null)
	const[res,setRes] = useState(null)
	return (
		<div className="App">
			<div className="app__dropdown" style={{width:200}}>
			<Dropdown options={gender} prompt="Select gender..." value ={gen} onChange={(val)=>setGen(val)}/>
			<Dropdown options={nationality} prompt="Select country..." value ={nat} onChange={(val)=>setNat(val)}/>
			<Dropdown options={numberOfResults} prompt="Number of results..." value ={res} onChange={(val)=>setRes(val)}/>
		</div>
			
		</div>
	);
}

export default HomePage;
