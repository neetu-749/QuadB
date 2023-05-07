import axios from "axios";
import {useState, fetch, useEffect } from "react";
import Card from "../components/Card";
import {Box, styled, Link} from '@mui/material';


const Container = styled(Box)`
  background: black;
  text-align: center;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: scroll;
  padding: 20px 0;
`
const Poster = styled(Box)`
  background: #696969;
  display: inline-block;
  margin: 15px;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px 3px 
`

const Cont = styled(Box)`
   display:grid;
   text-align: left;
   grid-template-columns: 1fr;
`

const Rating = styled(Box)`
  border-radius: 10px;
  background-color: rgba(71, 64, 64, 0.699);
  position: relative;
  bottom: 24px;
  margin: 0 20px;
  color: white;
  text-align: center;
`

const Name = styled(Box)`
  float: left;
  display: inline;
  margin: 0 20px;
  font-size: 1.5rem;
`

const Genere = styled(Box)`
  float: left;
  display: inline;
  margin: 0 20px;
  font-size: 1rem;
`

const Language = styled(Box)`
  float: left;
  display: inline;
  margin: 0 20px;
  font-size: 1rem;
`
const Buttonn = styled(Link)`
  background-color: #0B2D36;
  color: white;
  cursor: pointer;
  padding: 15px;
  font-weight: bold;
  border: none;
  outline: none;
  margin: 0;
  border-radius: 5px;
  margin: 15px 20px;
  width: 20vw;
`




// const Home = () =>{
//     const [data, setData] = useState([]);
    
//     useEffect(() => {
//       const getdata = async()=>{
//         const res  = await axios.get('https://api.tvmaze.com/search/shows?q=all');
//         // console.log(res);
//         setData(res.data);
//       }
//       getdata();
//     }, [])
const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
        const getdata = async()=>{
          const res  = await axios.get('https://api.tvmaze.com/search/shows?q=all');
          console.log(res.data);
          setData(res.data);
        }
        getdata();
  }, [])
  
    


    return(
        <Container>
            {data.map((n)=>(
                <Poster>
                  <Cont>
                    <Rating>
                      &#9733;
                      {n.show.rating.average==null
                      ? "not given yet" :n.show.rating.average+"/10"}
                    </Rating>
                    <Name> {n.show.name} </Name>
                    <Genere> {n.show.genres[0]} </Genere>
                    <Language> {n.show.language} </Language>
                    <Buttonn state ={n} >
                    <button style={{background: '#696969', transition: '1s', color: '#0B2D36'}}>Book your Ticket</button>
                    </Buttonn>
                  </Cont>
                </Poster>
            ))}
        
        </Container>

    )
}

export default Home;