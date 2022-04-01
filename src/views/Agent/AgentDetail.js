import { EditTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { agentActions } from '../../store/agentSlice';
import './AgentDetail.css';
import AgentDetailModal from './AgentDetailModal';
import AgentModal from './AgentModal';
import { api } from '../../api/api';
const AgentDetail = () => {
   
    const[loading,setLoading]=useState(true);
    const [isBasicModalVisible,setIsBasicModalVisible]=useState(false);
    const [isDetailModalVisible,setIsDetailModalVisible]=useState(false);
    const accessToken=useSelector(state=>state.auth.token);
    let{id}=useParams();
    const dispatch=useDispatch();
    const agent=useSelector(state=>state.agents.agent);
    useEffect(()=>{
        axios.get(`${api}/agents/`+id,{
            headers:{
                Authorization:"Bearer "+accessToken
            }
        }).then(res=>{
           
            dispatch(agentActions.getAgentDetail(res.data));
            setLoading(false);
        })
    },[]);
    const showDetailModal = () =>{
        setIsDetailModalVisible(true);
    }
    const showBasicModal = () =>{
        setIsBasicModalVisible(true);
    }
    const handleOk = () => {
        setIsBasicModalVisible(false);
        setIsDetailModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsBasicModalVisible(false);
        setIsDetailModalVisible(false);
      };
    return(
        loading ? <p>Loading...</p> : <div className="site-card-border-less-wrapper">
    <Card title="Basic Info" bordered={false} style={{ width: 300 }} >
      <p>ID: {agent.id}</p>
      <p>Name: {agent.name}</p>
      <p>Username: {agent.username}</p>
     <EditTwoTone onClick={showBasicModal}  />
    
    </Card>
    <br></br>
    <Card title="Detail Info" bordered={false} style={{ width: 300 }}>
      <p>Mobile:{agent.agentDetail.mobile}</p>
      <p>Address: {agent.agentDetail.address}</p>
      <EditTwoTone  onClick={showDetailModal}/>
    </Card>
    <AgentModal name={agent.name} username={agent.username} visible={isBasicModalVisible} onOk={handleOk} onCancel={handleCancel} />
    <AgentDetailModal mobile={agent.agentDetail.mobile} address={agent.agentDetail.address} agentDetailId={agent.agentDetail.id} visible={isDetailModalVisible} onOk={handleOk} onCancel={handleCancel}/>
  </div>
);
    
};
export default AgentDetail;