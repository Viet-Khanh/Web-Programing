import React, { useEffect, useState } from 'react';
import {  Modal, Button, Form, notification } from 'antd';
import { TwitterOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';
import RenderForm from './RenderForm';
const ModalForm = ({ visible, onCancel = () => { }, jsonInit
}) => {
    const [form] = Form.useForm();
    const [dataInit, setDataInit] = useState({});

    useEffect(() => form.resetFields(), [dataInit]);

    const [addAccountForm, setAddAccountForm] = useState(jsonInit);
    useEffect(() => {
        if(visible.type == "add"){
            setDataInit({})
        }
        if(visible.type == "edit"){
            setDataInit(visible.data)
        }
    } , [visible])


    const onFinish = async(values) => {
        onCancel()
        if(visible.type == "add") {
            try {
                const res = await visible.action(values);
                notification.open({
                    message: res.data.message,
                    description:
                    <TwitterOutlined style={{color : '#93b874'}}/> ,
                    icon: <CheckOutlined style={{ color: '#108ee9' }} />,
                });
            } catch (error) {
                notification.open({
                    message: error.response.data.message,
                    description:
                    <TwitterOutlined style={{color : '#93b874'}}/> ,
                    icon: <CloseOutlined style={{ color: '#e80404' }} />,
                });
            }
        }
        if(visible.type == "edit") {
            try {
                const res = await visible.action(visible.data.id, values);
                notification.open({
                    message: res.data.message,
                    description:
                    <TwitterOutlined style={{color : '#93b874'}}/> ,
                    icon: <CheckOutlined style={{ color: '#108ee9' }} />,
                });
            } catch (error) {
                notification.open({
                    message: error.response.data.message,
                    description:
                    <TwitterOutlined style={{color : '#93b874'}}/> ,
                    icon: <CloseOutlined style={{ color: '#e80404' }} />,
                });
            }
        }
    };
    return (
        <div>
            <Modal
                title={visible.type == "edit" ? "Chỉnh sửa" : "Thêm mới"}
                visible={visible}
                onCancel={() => {
                    console.log("123")
                    onCancel();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={dataInit} 
                >
                    <RenderForm
                        jsonFrom={addAccountForm}
                        visible={visible}
                    />
                    <Form.Item style={{ marginTop: 20, paddingTop: 10, borderTop: '1px solid #ddd', marginRight: 15 }} wrapperCol={{ span: 24 }} >
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={false}>
                            {visible.type == "edit" ? "Chỉnh sửa" : "Thêm mới"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalForm;