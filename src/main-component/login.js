import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { checkLogin } from '../service/account';
import { SmileOutlined, AntCloudOutlined } from '@ant-design/icons'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/reducer';
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openNotification = () => {
    notification.open({
      message: 'Đăng nhập thành công',
      description: "=====================",
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username){
      dispatch(login())
      navigate('/home')
    }
  },[])

  const openNotification1 = () => {
    notification.warning({
      message: 'Tài khoản hoặc mật khẩu không chính xác',
      description: "=====================",
      icon: <AntCloudOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const onFinish = async ({ username, password }) => {
    try {
      const res = await checkLogin({ username, password });
      console.log("=====", res)
      dispatch(login())
      openNotification()
      navigate('/home')
      localStorage.setItem("username", username)
    } catch (error) {
      openNotification1()
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <div className="login">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{width : "40%"}}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>

  );
};

export default Login;