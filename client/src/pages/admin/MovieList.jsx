import { data } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../api/movie";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderslice";

function MovieList() {
    const fakeMovies = [
        {
            "_id": "6850daba233b87c60244cadd",
            "title": "Avatar",
            "description": "Family Drama",
            "releaseDate": "2024-06-01",
            "duration": "125",
            "genre": "Drama",
            "poster": "https://ia800504.us.archive.org/2/items/MoviePosters/AvatarMv.jpg"
        }
    ];

    const tableHeaders = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            render: (text, record) => <img 
                                        width="75" height="115" 
                                        src={record.poster} style={{ objectFit: "cover" }} />
        },
        {
            title: 'Movie Name',
            dataIndex: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            render: (text, data) => {
                return moment(data.releaseDate).format("DD-MM-YYYY");
            } 
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            render: (text) => `${text} mins`
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        }, 
        {
            title: 'Action',
            render: (text, record) => {
                return(
                    <div>
                        <Button>
                            <EditOutlined />
                        </Button>
                        <Button>
                            <DeleteOutlined />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const [movies, setMovies] = useState(fakeMovies);
    const dispatch = useDispatch();


    useEffect(() => {
        getMoviesData();
    }, []);

    const getMoviesData = async () => {
        try {
            dispatch(showLoader());
            const response = await getAllMovies();
            const allMovies = response.data;
            setMovies(
                allMovies.map(function(item) {
                    return {
                        ...item,
                        key: `movie-${item._id}`
                    };
                })
            );
            dispatch(hideLoader());
        } catch (error) {
            console.error('Error fetching movies:', error); 
        }
    };
    
    return (
        <>
            <div className="d-flex justify-content-end">
                <Button>
                    Add Movie
                </Button>

                <Table dataSource={movies} columns={tableHeaders} />
            </div>
        </>
    );
}   
export default MovieList;