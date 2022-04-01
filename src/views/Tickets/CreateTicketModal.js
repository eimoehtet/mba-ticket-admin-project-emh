import { Form, Modal,Input, Button, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import {  useSelector } from "react-redux";
import { api } from "../../api/api";
const CreateTicketModal = (props) => {
  const[form]=useForm();
    const accessToken=useSelector(state=>state.auth.token);
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 18,
        },
      };
      const submitHandler = (values) =>{
          const name=values.name;
          const price=values.price;
          const stock=values.stock;
          axios.post(`${api}/tickets`,
          {
              name,
              price,
              stock
          },
          {
            headers:{
                Authorization:"Bearer "+accessToken
            }
          }
          ).then(res=>{
             props.handleOk(res.data);
             alert("Successfully created");
             form.resetFields();
          }).catch(err=>{
              console.log(err);
          })
      }
    return(
        <Modal title="Create Ticket" visible={props.visible} destroyOnClose={true}  onCancel={props.onCancel} footer={null}>
        <Form {...layout}
        form={form}
          onFinish={submitHandler}
         
        >
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
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
        rules={[
        {
          required: true,
         
        },
      ]}
      >
        <InputNumber />
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol,offset:4}}>
            <Button type="primary" htmlType="submit" block >Submit</Button>
        </Form.Item>
        </Form>
      </Modal>
    )
};
export default CreateTicketModal;