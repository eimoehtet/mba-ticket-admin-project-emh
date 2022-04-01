import { Button, Layout, Menu} from 'antd';
import React, { useState } from 'react';
import './MainLayout.css'
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BorderOutlined,
  LogoutOutlined,

} from '@ant-design/icons';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;
const MainLayout = () => {
 const[collapsed,setCollapsed]= useState(false);
 const dispatch=useDispatch();

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const logoutHandler = () =>{
    dispatch(authActions.logout());
    localStorage.removeItem('token');

  }
    return (
      <Layout style={{height:"100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<BorderOutlined/>} >
             <Link to='/tickets'>Tickets</Link> 
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Agent">
              <Menu.Item key="2" ><Link to='/agents/create'>Create</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/agents">List</Link></Menu.Item>
            </SubMenu>
          </Menu>
         
        </Sider>
        
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick:toggle,
            })}
           <span style={{paddingLeft:1030}} ><Button onClick={logoutHandler}><LogoutOutlined/></Button></span> 
          </Header>
          
          <Outlet/>
          
        </Layout>
      </Layout>
    );
  }
export {MainLayout};