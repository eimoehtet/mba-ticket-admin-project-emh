import { Modal,Form,Input,Button} from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";

const UpdateTicketModal = (props) => {
  const accessToken=useSelector(state=>state.auth.token);
  console.log("authToken",accessToken);
 
  const submitHandler =(values) => {
   const name=values.name;
   const price=values.price;
   const stock=values.stock;
   axios.put(`${api}/tickets/`+props.id,
   {
     name,
     price,
     stock
   },
   {
     headers:{
       Authorization:"Bearer "+accessToken
     }
   }).then(res=>{
     console.log(res.data);
     props.handleOk(res.data);
   }).catch(err=>{
     console.log(err);
   })
 }
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };
    return (
        <Modal title="Create Ticket" visible={props.visible}  onCancel={props.onCancel} destroyOnClose={true} footer={null}>
        <Form {...layout}
        initialValues={{name:props.name,price:props.price,stock:props.stock}}
        onFinish={submitHandler}  
        >
        <Form.Item
        name="name"
        label="Name"
        
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
      >
        <Input />
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol,offset:4}}>
            <Button type="primary" htmlType="submit" block onClick={props.onOk}>Submit</Button>
        </Form.Item>
        </Form>
      </Modal>
    )
};
export default UpdateTicketModal;