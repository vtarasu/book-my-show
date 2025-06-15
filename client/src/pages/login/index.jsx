import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/user'; // Assuming you have a loginUser function in your API module

function Login() {
    const STORAGE_KEY = 'jwtToken';
    const navigate = useNavigate();
    const onfinish = async(values) => {
        try {
            console.log('Login data:', values);
            const response = await loginUser(values);
            console.log('Login successful:', response);
            const jwtToken = response.data;
            localStorage.setItem(STORAGE_KEY, jwtToken);
            navigate('/home'); // Redirect to home page on successful login
        } catch(error) {
            console.error('Error logging in:', error.message);
            // Handle error (e.g., show a message to the user)
        }
    }
    return (
        <>
            <main className="App-header">
                <h1>Login</h1>
                <section>
                    <Form layout="vertical" onFinish={onfinish}>
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Enter your username" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input type="password" placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>
                            New User? <Link to="/register">Register Here</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;