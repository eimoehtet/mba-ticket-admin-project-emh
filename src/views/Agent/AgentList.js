import { EyeOutlined } from "@ant-design/icons";
import { Breadcrumb,Layout } from "antd";
import { Table,Input } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
const{Search}=Input;
const {Content} = Layout;
const AgentList = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [agents,setAgents]=useState([]);
  const [searchKeyword,setSearchKeyword]=useState('');
  const [searchAgents,setSearchAgents]=useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Detail',
          render: (_,record) => (
           <Link to={'/agents/'+record.id}><EyeOutlined/></Link>
          ),
        },
        
      ];
      //const agents=useSelector(state=>state.agents.agents);
     // const dispatch=useDispatch();
      const accessToken=useSelector(state=>state.auth.token);
      useEffect(()=>{
        axios.get(`${api}/agents`,{
            headers:{
                Authorization:"Bearer "+accessToken
            }
        }).then(res=>{
           // dispatch(agentActions.getAgentList(res.data));
            setAgents(res.data);
            setIsLoading(false);
        }).catch(err=>{
            console.log(err);
        })
      },[]);
      
      const onSearch = (e) => {
        
        setSearchKeyword(e.target.value);
        const filterdAgents=agents.filter((agent)=>{
          return agent.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
       
        setSearchAgents(filterdAgents);
      }
    return(
        <>
        <Breadcrumb style={{ paddingLeft: 16 }}>
          <Breadcrumb.Item>Agents</Breadcrumb.Item>
        </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
              <div>Agent List</div>
              <Search  
               placeholder="input search text" 
               allowClear
               onChange={onSearch}
               
               style={{ width: 304 ,margin:5 }}
              />
            
              <Table loading={isLoading} columns={columns} dataSource={searchKeyword?searchAgents:agents} scroll={{y : 400}} />

          </Content>
       </>
    )
};
export default AgentList;