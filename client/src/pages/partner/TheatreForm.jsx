import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row, Modal, Input } from "antd";
import { hideLoader, showLoader } from "../../redux/loaderslice";
import { addTheatre, updateTheatre } from "../../api/theatre";
import TextArea from "antd/es/input/TextArea";

function TheatreForm({
    isModalOpen,
    setIsModalOpen,
    selectedTheatre,
    setSelectedTheatre,
    formType,
    setFormType,
    getTheatresForPartner
}) {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);

    const handleFinish = async(values) => {
        try {
            dispatch(showLoader());
            let response = null;
            let formValues = {
                ...values,
                owner : user._id,
                isActive: false
            }
            if(formType === "add") {
                response = await addTheatre(formValues);
            } else {
                formValues.theatreId = selectedTheatre._id;
                response = await updateTheatre(formValues);
            }
            getTheatresForPartner()
        } catch (error) {
            console.error('Error occurred during add/update theatre', error);
        }
        dispatch(hideLoader());
        setFormType(null);
        setSelectedTheatre(null);
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setFormType(null);
        setSelectedTheatre(null);
        setIsModalOpen(false);
    }

    return (
        <>
            <Modal centered
                title={formType === "add" ? "Add Theatre" : "Update Theatre"}
                open={isModalOpen}
                onCancel={handleCancel}
                width={800}
                footer={null}
            >

            <Form layout="vertical" initialValues={selectedTheatre} onFinish={handleFinish}>
                <Row gutter={{xs: 6, sm:10, md:12, lg:16}}>
                    <Col span={24}>
                        <Form.Item label="Title" name="name" rules={[{required:true, message: 'Please input name'}]}>
                            <Input placeholder="Enter theatre name"></Input>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Address" name="address" rules={[{required:true, message: 'Address is required!'}]}>
                            <TextArea rows={4} placeholder="Enter theatre address" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Row gutter={{xs: 6, sm:10 , md:12, lg:16}}>

                            <Col span={12}>
                                <Form.Item label="Phone" name="phone" rules={[{required:true, message: 'Please input contact details'}]}>
                                    <Input placeholder="Enter contact number" />
                                </Form.Item>
                            </Col>  

                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{required:true, message: 'Please input email id'}]}>
                                    <Input placeholder="Enter email id"></Input>
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
    )
}

export default TheatreForm;