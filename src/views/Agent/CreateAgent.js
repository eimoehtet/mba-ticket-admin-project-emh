import { Form, Input, Button , Breadcrumb, Layout, InputNumber} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CreateAgent.css';
import { api } from '../../api/api';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
const { Content } = Layout;


const CreateAgent = () => {
  const [form]=useForm();
  const accessToken=useSelector(state=>state.auth.token);
  console.log("token from auth",accessToken);
  const createAgentHandler = (values) => {
    const name=values.name;
    const username=values.username;
    const password=values.password;
    const mobile=values.mobile;
    const address=values.address;
    axios.post(`${api}/agents`,
    {
      name,
      username,
      password,
      agentDetail:{
        mobile,
        address
      }
    },{
      headers:{
          Authorization:"Bearer "+ accessToken
    }
  }
      
    ).then(res=>{
      console.log(res.data);
      form.resetFields();
    }).catch(err=>{
      alert(err);
    })
   
  
  };

  return (
    <>
    <Breadcrumb style={{ paddingLeft: 16 }}>
          <Breadcrumb.Item><Link to="/agents">Agents</Link></Breadcrumb.Item>
          <Breadcrumb.Item disable>Create</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          <Form name="nest-messages" form={form} onFinish={createAgentHandler} {...layout}>
        <h1 className='h1'>Create Agent</h1>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password"
       label="Password"
       rules={[
        {
          required: true,
        },
      ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="mobile" 
      label="Mobile"
       rules={[
        {
         required:true
        },
        {
          validator(_, value) {
            if (!value || value.length === 11) {
              return Promise.resolve();
            }
            return Promise.reject('Please enter 11 digit Number!');
          },
        },
      ]}
      >
          <Input type="number"/>
      </Form.Item>
      <Form.Item name="address"
      label="Address"
       rules={[
        {
          required: true,
        },
      ]}
      >
          <TextArea/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol,offset:4 }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
          </Content>
    </>
    
  );
};

export default CreateAgent;