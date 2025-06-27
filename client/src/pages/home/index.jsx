import { SearchOutlined } from "@ant-design/icons";
import {Row, Col, Input} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderslice";
import { getAllMovies } from "../../api/movie";

function Home() {

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }

  const getData = async() => {
    try {
      dispatch(showLoader());
      const response = await getAllMovies();
      setMovies(response.data);
      dispatch(hideLoader());
    } catch(error) {
      console.error('Error occurred while fetching movies', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined></SearchOutlined>}
          ></Input>
          <br></br>
          <br></br>
        </Col>
      </Row>

      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies && 
          movies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
          .map((movie) => (
            <Col className="gutter-row mb-5" key={movie.id} span={{xs: 24, sm:24, md:12, lg:10}}>
            <div className="text-center">
              <img className="cursor-pointer" src={movie.poster} alt="Movie Poster" width={200} style={{borderRadius: "8px"}}>
              </img>
              <h3>
                {movie.title}
              </h3>
            </div>
            </Col>
          ))
        }


      </Row>
    </>
  );
}   
export default Home;