import "./HomePage.css";
import React,{useState} from "react"
import Dropdown from "./Dropdown/Dropdown"
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
function HomePage() {
	const gender =["male","female"]
	const nationality = ["Australia(AU)","Brazil(BR)","Canada(CA)","France(FR)","Great Britain(GB)","USA(US)"]
	const natCode = {"Australia(AU)":"AU","Brazil(BR)":"BR","Canada(CA)":"CA","France(FR)":"FR","Great Britain(GB)":"GB","USA(US)":"US"}
	const numberOfResults = [10,20,50,100]
	const[gen,setGen] = useState(null)
	const[nat,setNat] = useState(null)
	const[res,setRes] = useState(10)
	const[page,setPage] = useState(1);
	const [data, setData] = useState("");
	const [OriginalData, setOriginalData] = useState([]);

	const fetchdata = () => {
		console.log(gen, res, nat);
		if (gen !== "" && nat !== "") {
		  return axios
			.get(
			  `https://randomuser.me/api/?page=${page}&gender=${gen}&results=${res}&nat=${natCode[nat]}`
			)
			.then(({ data }) => {
				console.log(data)
			  return data;
			})
			.catch((err) => {
			  console.error(err);
			});
		}
		return axios
		  .get(`https://randomuser.me/api/?page=${page}&results=${res}`)
		  .then(({ data }) => {
			  console.log(data)
			return data;
		  })
		  .catch((err) => {
			console.error(err);
		  });
	  };

	  const callapi = () => {
		fetchdata().then((newData) => {
		  setData(JSON.stringify(newData) || "No data");
		  const inter = newData.results;
		  console.log(inter)
		  setOriginalData(inter);
		});
	  };

		const useStyles = makeStyles({
			table: {
			  minWidth: 650,
			},
		  });

		  const handlePrevPageNumber = (page) => {
			if (page !== 1) {
			  setPage(page-1);
			  callapi();
			}
		  };

		  const handleNextPageNumber = (page) => {
			setPage(page + 1);
			callapi();
		  };
		  
		//   function createData(thumbnail,name, gender, nationality, email, phone) {
		// 	return { thumbnail,name, gender, nationality, email, phone };
		//   }
		  
		//   const rows = [
		// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0,98),
		// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3,90),
		// 	createData('Eclair', 262, 16.0, 24, 6.0,67),
		// 	createData('Cupcake', 305, 3.7, 67, 4.3,87),
		// 	createData('Gingerbread', 356, 16.0, 49, 3.9,98),
		//   ];

	const classes = useStyles();

	
	return (
		<div className="App">
			<div className="app__body">
			<div className="app__dropdown" style={{width:210}}>
			<Dropdown options={gender} prompt="Select gender..." value ={gen} onChange={(val1)=>setGen(val1)}/>
			<Dropdown options={nationality} prompt="Select country..." value ={nat} onChange={(val2)=>setNat(val2)}/>
			<Dropdown options={numberOfResults} prompt="Number of results..." value ={res} onChange={(val3)=>setRes(val3)}/>
			<Button className="load__button" onClick={callapi}>Click To Filter</Button>
			<button onClick={() => { handleNextPageNumber()}}>NEXT Page</button>
			<button onClick={() => { handlePrevPageNumber()}}>PREVIOUS Page</button>
			{/* <strong>page: {page}</strong> */}
			</div>
			
			<div className="table">
			<TableContainer component={Paper}>
			
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Thumbnail</TableCell>

            <TableCell align="right">Name&nbsp;</TableCell>
            <TableCell align="right">Gender&nbsp;</TableCell>
            <TableCell align="right">Nationality&nbsp;</TableCell>
            <TableCell align="right">Email&nbsp;</TableCell>
            <TableCell align="right">Phone&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
		{/* {OriginalData.map((details, idx) => (
          <Post
            key={idx}
            username={
              details.name.title +
              " " +
              details.name.first +
              " " +
              details.name.last
            }
            location={details.location.country}
            imagethumb={details.picture.thumbnail}
            gender={details.gender}
            phone={details.phone}
            email={details.email}
            imagelarge={details.picture.large}
          />
        ))} */}
          {OriginalData.map((row) => (
            <TableRow key={row.idx}>
              <TableCell component="th" scope="row">
                <img  src={row.picture.thumbnail}/>
              </TableCell>
              <TableCell align="right">{row.name.title +" " + row.name.first +" " +row.name.last}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.location.country}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
			</div>
			</div>
		</div>
	);
}

export default HomePage;
