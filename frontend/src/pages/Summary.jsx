import { Link, useLocation } from "react-router-dom";
import {Box, styled} from '@mui/material';
import './summary.css'


const Container = styled(Box)`
  justify-content: center;
  align-items: center;
  display: grid;
  min-height: 100%;
`

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  padding: 20px 0px;
`

const MovieName = styled(Box)`
  font-size: 4vw;
  color: #0B2D36;
  font-weight: bold;
`

const MovieDetails = styled(Box)`
  padding: 20px 0 0 0;
`

const Rating= styled(Box)`
  margin-top: 30px;
  font-weight: bold;
  font-size:3vw;
  color: #0B2D36;
`

const Language = styled(Box)`
  margin-top: 30px;
  font-weight: bold;
  font-size:2.5vw;
  color: #0B2D36;
`

const Details = styled(Box)`
  margin-top: 20px;
  display: flex;
  font-weight: bold;
  font-size: 2.5vw;
  color: #0B2D36;
`

const Schedule = styled(Box)`
  font-weight: bold;
  font-size: 2vw;
  margin-top: 30px;
  color: #0B2D36;
`

const More = styled(Box)`
  margin: 10px 30px;
  font-weight: bold;
  font-size: 1rem;
  color: #0B2D36;
`


const Summary = () => {
    const location = useLocation();
    const propsData = location.state;

    return (
        <Container>
            <Content>
                <img style={{width:'40vh',height:'75vh',borderRadius:'10px', boxShadow:'0 0 20px 0px #696969'}} src={propsData.show.image==null ? `https://source.unsplash.com/1600x900/?movie` : propsData.show.image.medium} className="movieimage" alt="" />
                <MovieDetails>
                    <MovieName>{propsData.show.name}</MovieName>
                    <Rating>&#9733; {propsData.show.rating.average == null ? "not given yet" : propsData.show.rating.average + "/10"}</Rating>
                    <Language>{propsData.show.language}</Language>
                    <Details>
                        <div className="time">{propsData.show.runtime && propsData.show.runtime + " min"} &#x2022;</div>
                        <div className="genre">{propsData.show.genres[0]} &#x2022;</div>
                        <div className="date">&nbsp; {propsData.show.premiered}</div>
                    </Details>
                    <Schedule>{propsData.show.schedule.time +" "+ propsData.show.schedule.days}</Schedule>
                    <Link to="/form" state={propsData}><button className="buttoncss">Book Tickets ($10)</button></Link>
                </MovieDetails>
            </Content>
            <More>{propsData.show.summary}</More>
        </Container>
    )
}
export default Summary;