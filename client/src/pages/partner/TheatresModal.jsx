import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderslice";
import { useSelector } from "react-redux";
import { getTheatresByOwner, getAllTheatres } from "../../api/theatre";
import { render } from "@testing-library/react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MovieForm from "../admin/MovieForm";
import DeleteMovie from "../admin/DeleteMovie";
import DeleteTheatre from "./DeleteTheatre";

function TheatresModal() {

    const tableHeaders = [
        {
            title: 'Theatre Name',
            dataIndex: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title : 'Email Id',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            render: (text, record) => {
                return record.isActive ? 'Active' : 'Inactive';
            }
        }, 
        {
            title : 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            setSelectedTheatre(record);
                            setFormType("edit");
                        }}>
                            <EditOutlined></EditOutlined>    
                        </Button>
                        <Button onClick={() => {
                            setIsDeleteModalOpen(true);
                            setSelectedTheatre(record);
                        }}>
                            <DeleteOutlined></DeleteOutlined>
                        </Button>
                    </div>
                )
            }
        }
    ]

    const [theatresList, setTheatresList] = useState([]);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        getTheatresForPartner();
    }, []);

    const getTheatresForPartner = async() => {
        try {
            dispatch(showLoader());
            const response = await getTheatresByOwner({ownerId : user._id});
            if(response.status) {
                const theatresdata = response.data;
                setTheatresList(
                    theatresdata.map(function(item) {
                        return {
                            ...item,
                            key: `theatre-${item._id}`
                        };
                    })
                );
            }
            dispatch(hideLoader());
        } catch(error) {
            console.error('Error fetching theatres for owner', error);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <Button onClick={ () => {
                    setFormType("add");
                    setIsModalOpen(true);
                    setSelectedTheatre(null);
                }}>
                    Add Theatre
                </Button>
                <Table dataSource={theatresList} columns={tableHeaders}></Table>
                {
                    isModalOpen && (
                        <MovieForm>

                        </MovieForm>
                    )
                }
                {
                    isDeleteModalOpen && (
                        <DeleteTheatre isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        selectedTheatre={selectedTheatre}
                        setSelectedTheatre={setSelectedTheatre}
                        getTheatresForPartner={getTheatresForPartner}
                        >
                            
                        </DeleteTheatre>
                    )
                }
            </div>
        </>
        
    )
};

export default TheatresModal;