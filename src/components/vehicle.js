import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined,TwitterOutlined ,CheckOutlined} from '@ant-design/icons';
import ModalForm from './Form/VehicleForm/ModalForm';
import { getAllVehicles, updateVehicle, addVehicle, deleteVehilce } from '../service/account';

function Vehicle(props) {
    const [row, setRow] = useState(false);
    const [data, setData] = useState([])
    const [option, setOption] = useState(null)
    const [modalForm, setModalForm] = useState(false)
    const _requestData = async () => {
		const vehicleData = await getAllVehicles();
        setData(vehicleData.data);
    }

    useEffect(() => {
        _requestData();
    }, []);

    const openNotification = () => {
        notification.open({
          message: 'Xóa thành công',
          description:
          <TwitterOutlined style={{color : '#93b874'}}/> ,
          icon: <CheckOutlined style={{ color: '#108ee9' }} />,
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
                type,
                action: updateVehicle
            })
        }
        if(type == "add"){
            setRow(false)
            setModalForm({
                data,
                type,
                action: addVehicle
            })
        }
        if (type == "del") {
            const r = window.confirm("Bạn có muốn xóa item này không")
            if(r == true) {
                await deleteVehilce(row.id)
                openNotification()
            }
            setRow(false)
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => {
                    handleSelect("" , "add")
                }} style={{ margin: "0  0  15px 30px", borderRadius: "15px" }} icon={<PlusOutlined />}>Thêm mới</Button>
                <Button onClick={() => {
                    setData(false)
                    _requestData()
                }} style={{ margin: "0  0  15px 5px", borderRadius: "15px" }} icon={<ReloadOutlined />}>Làm mới</Button>
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
                    minWidth={400}
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
                    </div>
                </Modal>
            </div>
            <ModalForm
                visible={modalForm}
                onCancel={() => {
                    console.log("asdada")
                    setModalForm(false)
                }}
                jsonInit={jsonInit}
            />

        </div>
    );
}

const columns = [
    {
        title : "STT",
        key : "index",
        render: (text, record, index) => index + 1
    },
    {
        title : "Tên" , 
        dataIndex : ["studentObject", "name"],
        key : "name",
        render: text => text
    },
    {
        title : "Mã sinh viên",
        dataIndex : ["studentObject", "studentCode"],
        key : "studentCode",
        render: text => text
    },
    {
		title : "Biển số xe",
        dataIndex : "numberPlate",
        key : "numberPlate"
    },
    {
        title : "Trạng thái",
        dataIndex : "hasTicket",
        key : "hasTicket",
        render: text => text ? "Đã đăng ký" : "Chưa đăng ký"
    }
]

const jsonInit = [
    {
        name: 'numberPlate',
        label: 'Biển số xe',
        rules: [{required : true, message : "Không được bỏ trống"}],
    },
    {
        name: 'hasTicket',
        label: 'Trạng thái',
        rules: [{ required: true, message: 'Không được bỏ trống' }],
    },
    {
        name: 'studentId',
        label: 'Sinh viên',
        rules: [{ required: true, message: 'Không được bỏ trống' }],
    }
];

export default Vehicle;