import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Tabs, Modal, Button, Alert,notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined,TwitterOutlined,CheckOutlined } from '@ant-design/icons';
import ModalForm from './Form/FormService/ModalForm';
import { serviceAPI, visiterAPI } from '../fake-api/student-API';


function Service(props) {


    const [row, setRow] = useState(false);
    const [data, setData] = useState([])
    const [option, setOption] = useState(null)
    const [modalForm, setModalForm] = useState(false)
    const _requestData = async () => {
        const data = await serviceAPI()
        console.log("data", data)
        setData(data)
    }


    useEffect(() => {
        _requestData()
    })
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
    const handleSelect =  (data, type) => {
        if (type == "edit") {
            setRow(false);
            setModalForm({
                data,
                type
            })
        }
        if(type == "add"){
            setRow(false)
            setModalForm({
                data,
                type
            })
        }
        if (type == "del") {
            setRow(false)
            const r = window.confirm("Bạn có muốn xóa item này không")
            if(r == true) {
                openNotification() 
            }
        }
    }

    return (
        // <div>
        //     <div>
        //         <Button onClick={() => {
        //             handleSelect("" , "add")
        //         }} style={{ margin: "0  0  15px 30px", borderRadius: "15px" }} icon={<PlusOutlined />}>Thêm mới</Button>
        //         <Button onClick={() => {
        //             setData(false)
        //             _requestData()
        //         }} style={{ margin: "0  0  15px 5px", borderRadius: "15px"  }} icon={<ReloadOutlined />}>Làm mới</Button>
        //     </div>
        //     <Table
        //         columns={columns}
        //         dataSource={data}
        //         onRow={(r) => ({
        //             onClick: () => {
        //                 _handleRow(r)
        //             },
        //         })}
        //     />
        //     <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
        //         <Modal
        //             title="Chỉnh sửa"
        //             visible={row}
        //             footer={null}
        //             // style={{width: 250}}
        //             minWidth={400}
        //             onCancel={() => {
        //                 setRow(false)
        //                 setOption("");
        //             }}
        //             bodyStyle={{ borderRadius: '15px' }}
        //         >
        //             <div style={{ display: "flex", justifyContent: "space-around" }}>
        //                 <Button
        //                     style={{ alignItems: "center", width: '120px', height: '60px', borderRadius: '10px', backgroundColor: "DodgerBlue" }}
        //                     onClick={() => handleSelect(row, "edit")}
        //                 >
        //                     <EditOutlined />
        //                     Chỉnh sửa
        //                 </Button>
        //                 <Button
        //                     style={{ display: "flex", alignItems: "center", width: '120px', height: '60px', borderRadius: '10px', backgroundColor: "#616161" }}
        //                     onClick={() => handleSelect(row, "del")}
        //                     type="danger"
        //                 >
        //                     <DeleteOutlined />
        //                     Xóa
        //                 </Button>
        //             </div>
        //         </Modal>
        //     </div>
        //     <ModalForm
        //         visible={modalForm}
        //         onCancel={() => {
        //             console.log("asdada")
        //             setModalForm(false)
        //         }}
        //     />

        // </div>
        <div>
            
        </div>
    );
}

const columns = [
    {
        title : "ServiceCode" , 
        dataIndex : 'serviceCode',
        key : 'serviceCode'
    },
    {
        title : 'Name',
        dataIndex : 'name',
        key : 'name'
    },
    {
        title : 'Đơn Giá',
        dataIndex : 'priceUnit',
        key : 'priceUnit'
    },
    {
        title : 'Giá',
        dataIndex : 'price',
        key : 'price'
    }
]

export default Service;