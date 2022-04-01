import { Form, Input, Button, Row, Col ,message} from 'antd';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { api } from '../../api/api';
const LoginPage = () => {
const navigate=useNavigate();
const dispatch=useDispatch();
const loginHandler = (values) => {
  const username=values.username;
  const password=values.password;
  axios.post(`${api}/auth/admin/login`,{
    username,
    password
  }).
  then(res=>{
    console.log(res.data);
    dispatch(authActions.login(res.data.accessToken));
    localStorage.setItem('token',res.data.accessToken);
    navigate('/');
  }).catch(err=>{
    console.dir(err);
    message.error(err.response.data.message);
  })
 
}

  return (
      <Row justify='center' className="form-container">
          <Col 
            sm={18}
            md={16}
            xl={12}
          >
          <Row justify='center'>
          <Col 
            xs={20}
            sm={20}
            md={20}
            lg={8}
            xl={14}
            xxl={14}
          >
          <h1  className='form-header'>Login as Admin</h1>
    <Form
      onFinish={loginHandler}
      className='form'
      size='large'
      name="basic"
      layout='vertical'
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
        
        <span className='forgot-link'>Forgot password?</span>
      <Form.Item >
        <Button  type="primary" htmlType="submit"  className='button' >
          Login
        </Button>
      </Form.Item>
      <p className='text'>Don't have an account? <span className='register-text'>Register</span></p>
    </Form>
          </Col>
      </Row>
         </Col>
      </Row>
      
  );
};

export  {LoginPage};