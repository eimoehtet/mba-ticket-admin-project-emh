import { DeleteFilled, EditFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb,Layout, Table,Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import CreateTicketModal from "./CreateTicketModal";
import './Tickets.css';
import UpdateTicketModal from "./UpdateTicketModal";
import { Input } from "antd";
import { api } from "../../api/api";

const {Content} = Layout;
const {Search} =Input;
const Tickets = () => {
  const [selectedTicket,setSelectedTicket]=useState(null);
  const [isCreateModalVisible,setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible,setIsUpdateModalVisible] = useState(false);
  const [loading,setLoading]=useState(true);
  const [tickets,setTickets]=useState([]);
  const [searchKeyword,setSearchKeyword]=useState('');
  const [searchTickets,setSearchTickets]=useState([]);
  const accessToken=useSelector(state=>state.auth.token);
  useEffect(()=>{
    axios.get(`${api}/tickets`,{
      headers:{
        Authorization:"Bearer "+accessToken
      }
    }).then(res=>{
      setTickets(res.data);
      setLoading(false);
    }).catch(err=>{
      console.log(err);
    })
  },[]);
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };
  const showUpdateModal = (ticket) => {
    setSelectedTicket(ticket)
    setIsUpdateModalVisible(true);
  };
  const handleUpdateOk = (data) => {
    console.log("Update data",data);
    let updatedTickets = [...tickets];
    var index = updatedTickets.findIndex(e=>e.id==data.id);
    let updatedTicket = {...updatedTickets[index]};
    updatedTicket.id=data.id;
    updatedTicket.name = data.name;
    updatedTicket.price = data.price;
    updatedTicket.stock = data.stock;
    updatedTickets[index] = updatedTicket;
    console.log('updated tickets',updatedTickets);
    setTickets(updatedTickets);
  };

  const handleCreateOk = (data) =>{
    setTickets([...tickets,data]);
  }

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setIsUpdateModalVisible(false);
  };
  const deleteTicket = (record) =>{
  setSelectedTicket(record);
   axios.delete(`${api}/tickets/`+record.id,{
     headers:{
       Authorization:"Bearer "+accessToken
     }
   }).then(
    setTickets((tickets)=>{
      return tickets.filter((ticket)=>ticket.id !== record.id);
    })
   ).catch(err=>{
     console.log(err);
   })
  }
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <a><EditFilled  onClick={()=>{showUpdateModal(record)}}/></a>
          <a><DeleteFilled onClick={()=>{deleteTicket(record)}}/></a>
        </Space>
      ),
    }
  ]
  const onSearch = (e) =>{
    setSearchKeyword(e.target.value);
    const filteredTickets=tickets.filter((ticket)=>{
      return ticket.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchTickets(filteredTickets);
  }
    return (
        <>
        <Breadcrumb style={{ paddingLeft: 16 }}>
          <Breadcrumb.Item>Tickets</Breadcrumb.Item>
        </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          > 
            <div className="icon"><PlusCircleOutlined onClick={showCreateModal} /></div>
            <Search
              placeholder="input search text" 
              allowClear
              onChange={onSearch}
              
              style={{ width: 304 ,margin:5 }}
            />
             <Table columns={columns} loading={loading} dataSource={searchKeyword ? searchTickets : tickets} pagination={true} scroll={{ y: 300 }}/>
             
              <CreateTicketModal handleOk={handleCreateOk} visible={isCreateModalVisible} onCancel={handleCancel} onOk={()=>{setIsCreateModalVisible(false)}}/>
              <UpdateTicketModal handleOk={handleUpdateOk} id={selectedTicket ?.id} name={selectedTicket ?.name} price={selectedTicket ?.price} stock={selectedTicket ?.stock}  visible={isUpdateModalVisible} onCancel={handleCancel} onOk={()=>{setIsUpdateModalVisible(false)}} />
          </Content>
       </>
    )
}
export default Tickets;