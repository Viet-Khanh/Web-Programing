import React, { useEffect } from 'react';

import { Table, Tag, Space, Tabs, Button } from 'antd';
import Student from '../components/student';
import Visiter from '../components/visiter';
import Rooms from '../components/rooms';
import Service from '../components/service';
import Food from '../components/Service/food-service';
import Packing from '../components/Service/packing-service';
import Laundry from '../components/Service/laundry-service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import { login } from '../store/reducer';
import Vehicle from "../components/vehicle";

const Home = () => {
    const { TabPane } = Tabs;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const select = useSelector(state => state.login[0].isLogin)
    console.log("selllllllll", select)
    useEffect(() => {
        if (!select) {
            navigate('/')
        }
    })
    return (
        <div>
            <LogoutOutlined onClick={() => {
                localStorage.removeItem('username')
                dispatch(login())
                navigate('/')
            }} style={{display : 'flex' ,justifyContent : 'flex-end' , marginRight : "50px" , fontSize : "25px"}}/>
            <div>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Quản lý sinh viên" key="1">
                        <Student />
                    </TabPane>
                    <TabPane tab="Quản lý khách" key="2">
                        <Visiter />
                    </TabPane>
                    <TabPane tab="Quản lý phòng" key="3">
                        <Rooms />
                    </TabPane>
                    <TabPane tab="Quản lý dịch vụ" key="4">
                        <Service />
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Food" key="1">
                                <Food />
                            </TabPane>
                            <TabPane tab="Packing" key="2">
                                <Packing />
                            </TabPane>
                            <TabPane tab="Laundry" key="3">
                                <Laundry />
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="Quản lý xe" key="5">
                        <Vehicle />
                    </TabPane>
                </Tabs>
            </div>

        </div>
    );
};

export default Home;