import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import { updateTheatreStatus, getAllTheatres } from "../../api/theatre";
import { useDispatch } from "react-redux"; 
import { showLoader, hideLoader } from "../../redux/loaderslice";


function ThreatreList() {
  
  const tableHeaders = [
    {
      title : 'Theatre Name',
      dataIndex: 'name'
    }, 
    {
      title : 'Owner',
      dataIndex: 'owner',
      render: (text, record) => { 
        return record.owner && record.owner.name;
      }
    },
    {
      title : 'Address',
      dataIndex: 'address'
    },
    {
      title : 'Phone',
      dataIndex: 'phone'
    },
    {
      title : 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (text, record) => {
        return record.isActive ? "Approved" : "Pending / Blocked";
      }
    }, 
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {record.isActive ? ( 
              <Button onClick={() => handleStatusChange(record)}> Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(record)}> Approve</Button>
            )}
          </div>
        )
      }
    }
  ];

  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTheatresData()
  }, []);

  const getTheatresData = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllTheatres();
      const allTheatres = response.data.data;
      setTheatres(
        allTheatres.map(function(item) {
          return {
            ...item,
            key: `theatre-${item._id}`
          };
        })
      );
      dispatch(hideLoader());
    } catch (error) {
      console.error('Error fetching theatres:', error);
    }
  }

  const handleStatusChange = async (data) => {
    try {
      dispatch(showLoader());
      // Call API to change status
      let values = {
        ...data,
        isActive : !data.isActive,
        theatreId: data._id
      }
      const response = await updateTheatreStatus(values);
      if (response.status) {
        getTheatresData();
      }
      dispatch(hideLoader());
    } catch (error) {
      console.error('Error changing status:', error);
    }
    dispatch(hideLoader());
  };
  
  return (
    <>
      {
        theatres && theatres.length > 0 ? (
          <Table dataSource={theatres} columns={tableHeaders} />
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <h1>No theatres found</h1>
          </div>
        )
      }
    </>
  );
}

export default ThreatreList;