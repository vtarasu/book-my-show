import { Form, Input, Button, message } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/user';
function Register() {
    const navigate = useNavigate();

    const onFinish = async (userData) => {
        try {
            const response = await registerUser(userData);
            navigate('/login');
        } catch(error) {
            console.error('Error registering user:', error.message);
            message.error('Registration failed. Please try again.');
        }
    }

    return (
        <>
            <main className="App-header">
                <h1>Register</h1>
                <section className="main-area mw-500 text-center">
                    <Form layout="vertical" onFinish={onFinish} className="d-block">

                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Enter your username" />
                        </Form.Item>

                        <Form.Item label="Email" name="email" className="d-block" rules={[{required: true, message: 'Please input your email!'}]}>
                            <Input type="email" placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" className="d-block" rules={[{required:true, message: 'Please input your password!'}]}>
                            <Input type="password" placeholder="Enter your password"></Input>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" className="d-block" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p className="d-block">
                            Already have an account? <Link to="/login">Login Now</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;