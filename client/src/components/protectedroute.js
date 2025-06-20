import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { showLoader, hideLoader } from '../redux/loaderslice';
import { SetUser } from '../redux/userslice';
import { currentUser } from '../api/user'; // Assuming you have a currentUser function in your API module
import React from 'react';

const { Header } = Layout;

const STORAGE_TOKEN = 'jwtToken';
function ProtectedRoute({children}) {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem(STORAGE_TOKEN);
        if (!jwtToken) {
            navigate('/login');
        } else {
            // Assuming you have an action to set the user from the token
            getValidUser();
        }
    }, []);

    const getValidUser = async() => {
        try {
            dispatch(showLoader());
            const response = await currentUser();
            dispatch(SetUser(response));
            dispatch(hideLoader());
        } catch (error) {
            console.error('Error fetching current user:', error);
            dispatch(SetUser(null));
            dispatch(hideLoader());
            localStorage.removeItem('jwtToken');
            navigate('/login');
        }
    }

    const navItems = [
        {    
            label: 'Home',
            icon: <HomeOutlined />,
        },
        {
            label: `${user ? user.username : 'Guest'}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span onClick={() => {
                            if(user.role === 'admin') {
                                navigate('/admin');
                            } else if(user.role === 'user') {
                                navigate('/profile');
                            } else {
                                navigate('/partner')
                            }
                            }}>
                            Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />,
                },
                {
                    label: ( 
                        <Link to="/login" onClick={() => {localStorage.removeItem(STORAGE_TOKEN);}}>
                        Logout
                        </Link>
                    ),
                    icon: <LogoutOutlined />,
                }
            ]
        }
    ]

    return (
        
        user && (
            <>
                <Layout>
                    <Header
                        className="d-flex justify-content-between"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                            Book My Show
                        </h3>
                        <Menu theme="dark" mode="horizontal" items={navItems}>
                        </Menu>
                    </Header>
                    <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                        {children}
                    </div>
                </Layout>
            </>
        )
    )
};


export default ProtectedRoute;