import { showLoader } from '../../redux/loaderslice';
import { hideLoader } from '../../redux/loaderslice';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from '../../api/movie';
import { Col, Modal, Row, Form, Input, Select, Button, message, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

function MovieForm({
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    formType,
    getMoviesData
}) {
    const dispatch = useDispatch();
    const handleCancel = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    }

    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
            "YYYY-MM-DD"
        );
    }

    const handleFinish = async (formData) => {
        try {
            dispatch(showLoader());
            let response = null;
            if(formType === "add") {
                response = await addMovie(formData);
            } else {
                response = await updateMovie(selectedMovie._id, formData);
            }
            if (response.success) {
                getMoviesData();
                message.success('Added/Updated movie successfully');
                setIsModalOpen(false);
            } else {
                message.error(response.message);
            }
            setSelectedMovie(null);
            dispatch(hideLoader());
            setIsModalOpen(false);
        } catch (error) {
            dispatch(hideLoader());
            console.error('Error submitting form:', error);
        }
    }


    return (
        <>
            <Modal centered
                title={formType === "add" ? "Add Movie" : "Edit Movie"}
                open={isModalOpen}
                onCancel= {handleCancel}
                width = {800}
                footer={null}>
            

            <Form layout='vertical' initialValues={selectedMovie} onFinish={handleFinish}>
                <Row gutter={{xs: 6, sm:10 , md:12, lg:16}}>
                    <Col span={24}>
                        <Form.Item label="Title" name="title" rules={[{required:true, message: 'Please input movie title!'}]}>
                            <Input placeholder="Enter movie title" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Description" name="description" rules={[{required:true, message: 'Description is required!'}]}>
                            <TextArea rows={4} placeholder="Enter movie description" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Row gutter={{xs: 6, sm:10 , md:12, lg:16}}>

                            <Col span={12}>
                                <Form.Item label="Duration (mins)" name="duration" rules={[{required:true, message: 'Please input movie duration'}]}>
                                    <Input type="number" placeholder="Enter movie duration in minutes" />
                                </Form.Item>
                            </Col>  

                            <Col span={12}>
                                <Form.Item label="Release date" name="releaseDate" rules={[{required:true, message: 'Please input relase date'}]}>
                                    <Input type="date"></Input>
                                </Form.Item>
                            </Col>  
                        </Row>  
                    </Col>

                    <Col span={24}>
                        <Row gutter={{xs: 6, sm:10 , md:12, lg:16}}>

                            <Col span={8}>
                                <Form.Item label="Genre" name="genre" rules={[{required:true, message: 'Please input movie genre'}]}>
                                    <Select
                                        placeholder="Select Movie"
                                        options={[
                                            { value: "Action", label: "Action" },
                                            { value: "Comedy", label: "Comedy" },
                                            { value: "Horror", label: "Horror" },
                                            { value: "Love", label: "Love" },
                                            { value: "Patriot", label: "Patriot" },
                                            { value: "Bhakti", label: "Bhakti" },
                                            { value: "Thriller", label: "Thriller" },
                                            { value: "Mystery", label: "Mystery" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                <Form.Item label="Poster" name="poster" rules={[{required:true, message: 'Please input movie poster URL'}]}>
                                    <Input placeholder="Enter movie poster URL" />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" style={{ fontSize: "1rem", fontWeight: "600" }}>
                        Submit
                    </Button>

                    <Button className="mt-3" block onClick={handleCancel}>
                        Cancel
                    </Button>

                </Form.Item>
            </Form>
            </Modal>
        </>

    );
}

export default MovieForm;