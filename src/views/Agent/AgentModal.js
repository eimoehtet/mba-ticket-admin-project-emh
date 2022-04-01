import { Modal,Form, Input,Button } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { agentActions } from "../../store/agentSlice";
import { api } from "../../api/api";

const AgentModal = (props) => {
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 18,
        },
      };
      let{id}=useParams();
      const accessToken=useSelector(state=>state.auth.token);
      const dispatch=useDispatch();
      const updateBasicInfo = (values) => {
          const name=values.name;
          const username=values.username;
          axios.put(`${api}/agents/`+id,
          {
              name,
              username
          },
          {
              headers:{
                  Authorization:"Bearer "+accessToken
              }
          }
          ).then(res=>{
              dispatch(agentActions.updateAgentBasicInfo(res.data));
             
          }).catch(err=>{
              alert(err);
          })  
    }
  
    return(
        <Modal  title="Basic Info" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel} 
        footer={null}
        >
             <Form onFinish={updateBasicInfo} {...layout}  
               initialValues={{name:props.name,username:props.username}}
             >
            <Form.Item
            label="Name"
            name="name"
            >
                <Input/>
            
            </Form.Item>
            <Form.Item
            label="Username"
            name="username"
            >
            <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol,offset:19 }}>
                <Button type="primary" htmlType="submit" onClick={props.onOk}>Save</Button>
            </Form.Item>
        </Form>
       </Modal>
      
    )

};

export default AgentModal;