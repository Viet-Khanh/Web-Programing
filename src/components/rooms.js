import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Tabs, Modal, Button, Alert, notification,Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined, TwitterOutlined, CheckOutlined, LeftCircleOutlined, CloseOutlined,ZoomInOutlined } from '@ant-design/icons';
import ModalForm from './Form/FormRooms/ModalForm';
import { roomAPI, serviceAPI, visiterAPI } from '../fake-api/student-API';
import { getAllRooms } from '../service/account';
import axios from 'axios';
import { apiClient } from '../service/apiClient';


function Rooms(props) {


    const [row, setRow] = useState(false);
    const [data, setData] = useState([])
    const [option, setOption] = useState(null)
    const [modalForm, setModalForm] = useState(false)
    const [showStudent, setShowStudent] = useState(true)
    const [dataStudent, setDataStudent] = useState([])


    const _requestData = async (param = {}) => {
        const data = await getAllRooms()
        console.log("datassssssssss", data.data)
        const dataConvert = data.data.map(i => {
            return i
        })
        setData(dataConvert)
    }


    useEffect(() => {
        _requestData()
    }, [])

    const openNotification = (type , msg) => {
        notification[type]({
            message: msg,
            description:
                <TwitterOutlined style={{ color: '#93b874' }} />,
            icon: type == "success" ? <CheckOutlined style={{ color: '#108ee9' }} /> : <CloseOutlined style={{ color: 'red' }} />,
        });
    };
    const _handleRow = (val) => {
        setRow(val);
    }
    const handleSelect = async (data, type) => {
        if (type == "edit") {
            setRow(false);
            setModalForm({
                data,
                type
            })
        }
        if (type == "add") {
            setRow(false)
            setModalForm({
                data,
                type
            })
        }
        if (type == "del") {
            // console.log({data , type})
            setRow(false)
            const r = window.confirm("Bạn có muốn xóa item này không")
            if (r == true) {
                try {
                    await axios.delete(`https://ltweb-demo.azurewebsites.net/api/room/${data.id}`)
                    openNotification('success' , "Xóa thành công")
                    _requestData();
                } catch (error) {
                    console.log("err", error)
                }
            }
        }
        if (type == 'show') {
            console.log("rowww", row)
            const _requestDataStudent = async () => {
                const { data } = await apiClient.get(`https://ltweb-demo.azurewebsites.net/api/room/${row.id}`)
                console.log("dataStudent", data.data.listStudent)
                setDataStudent(data.data.listStudent)
                setShowStudent(false)
            }
            _requestDataStudent()
        }
    }

    const { Search } = Input;
    const onSearch = async value => {
        try {
            const res = await apiClient.get(`https://ltweb-demo.azurewebsites.net/api/room/?name=${value}`)
            console.log("res" ,res.data.message)
            if(res.data.message == "Không tìm thấy phòng"){
                openNotification("warning" ,"Không tìm thấy tên phòng")
            }
            else{
                setData([res.data.data])
            }
            
        } catch (error) {
            console.log("err ", error )
        }
    };
    return (
        <div>
            {showStudent && <div>
                <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                    <div>
                        <Button onClick={() => {
                            handleSelect("", "add")
                        }} style={{ margin: "0  0  15px 30px", borderRadius: "15px" }} icon={<PlusOutlined />}>Thêm mới</Button>
                        <Button onClick={() => {
                            setData(false)
                            _requestData()
                        }} style={{ margin: "0  0  15px 5px", borderRadius: "15px" }} icon={<ReloadOutlined />}>Làm mới</Button>
                    </div>
                    <div style={{marginRight : '50px'}}>
                        <Space>
                            <Search
                                placeholder="Tìm kiếm..."
                                allowClear
                                enterButton="Tìm kiếm"
                                size="large"
                                onSearch={onSearch}
                            />
                        </Space>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    onRow={(r) => ({
                        onClick: () => {
                            _handleRow(r)
                        },
                    })}
                />
                <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                    <Modal
                        title="Chỉnh sửa"
                        visible={row}
                        footer={null}
                        // style={{width: 250}}
                        minWidth={600}
                        onCancel={() => {
                            setRow(false)
                            setOption("");
                        }}
                        bodyStyle={{ borderRadius: '15px' }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <Button
                                style={{ alignItems: "center", width: '120px', height: '60px', borderRadius: '10px', backgroundColor: "DodgerBlue" }}
                                onClick={() => handleSelect(row, "edit")}
                            >
                                <EditOutlined />
                                Chỉnh sửa
                            </Button>
                            <Button
                                style={{ display: "flex", alignItems: "center", width: '120px', height: '60px', borderRadius: '10px', backgroundColor: "#616161" }}
                                onClick={() => handleSelect(row, "del")}
                                type="danger"
                            >
                                <DeleteOutlined />
                                Xóa
                            </Button>
                            <Button
                                style={{ display: "flex", alignItems: "center", width: '200px', height: '60px', borderRadius: '10px', backgroundColor: "#616161", boxSizing: 'border-box' }}
                                onClick={() => handleSelect(row, "show")}
                                type="danger"
                            >
                                <ZoomInOutlined />
                                Xem danh sách phòng
                            </Button>
                        </div>
                    </Modal>
                </div>
                <ModalForm
                    visible={modalForm}
                    onCancel={() => {
                        console.log("asdada")
                        _requestData()
                        setModalForm(false)
                    }}
                />

            </div>}
            {!showStudent &&
                <div>
                    <div>
                        <LeftCircleOutlined onClick={() => {
                            setShowStudent(!showStudent)
                            setRow(false)
                            setOption("");
                        }} style={{ fontSize: "40px" }} />
                    </div>
                    <Table
                        columns={columnStudent}
                        dataSource={dataStudent}
                    />
                </div>
            }
        </div>
    );
}

const columns = [
    {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1
    },
    {
        title: "Tên phòng",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Kiểu phòng",
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'Số người tối đa',
        dataIndex: 'maximum',
        key: 'maximum'
    },
    {
        title: "Tổng số người",
        dataIndex: 'total',
        key: 'total'
    },
    {
        title: 'Giá',
        dataIndex: 'priceUnit',
        key: 'priceUnit'
    }
]

const columnStudent = [
    {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Mã sinh viên',
        dataIndex: 'studentCode',
        key: 'studentCode',
    },
    {
        title: 'Số chứng minh thư',
        dataIndex: 'identificationNo',
        key: 'identificationNo',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'birthDate',
        key: 'birthDate'
    },
    {
        title: 'Lớp',
        dataIndex: 'grade',
        key: 'grade'
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
]

export default Rooms;