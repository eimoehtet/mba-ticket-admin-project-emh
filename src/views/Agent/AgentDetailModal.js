import {Form,Input,Button,Modal} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { agentActions } from '../../store/agentSlice';
import { api } from '../../api/api';
const AgentDetailModal = (props) =>{
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 18,
        },
      };
     
      const accessToken=useSelector(state=>state.auth.token);
      const dispatch=useDispatch();
      const updateDetailInfo = (values) => {
          const mobile=values.mobile;
          const address=values.address;
        axios.put(`${api}/agents/detail/`+props.agentDetailId,
        {
            mobile,
            address
            
        },
        {
            headers:{
                Authorization:"Bearer "+accessToken
            }
        }
        ).then(res=>{
            console.log(res.data);
            dispatch(agentActions.updateAgentDetailInfo(res.data));
            
        }).catch(err=>{
            console.log(err);
        })
        
      };
    return(
        <Modal  title="Detail Info" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel} footer={null}
        >
            
             <Form onFinish={updateDetailInfo}  {...layout}
             initialValues={{mobile:props.mobile,address:props.address}}
             >
            <Form.Item
            label="Mobile"
            name="mobile"
            >
                <Input/>
            
            </Form.Item>
            <Form.Item
            label="Address"
            name="address"
            >
            <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol,offset:19 }}>
                <Button  type="primary" htmlType="submit" onClick={props.onOk}>Save</Button>
            </Form.Item>
        </Form>
       </Modal>
      
    )
};
export default AgentDetailModal;