import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./bill.css";
import { getBillByStudentId } from "../service/account";
import { notification } from "antd";
import moment from "moment";
import { TwitterOutlined, CloseOutlined, LoadingOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const Bill = (props) => {
  const navigate = useNavigate();
  const select = useSelector(state => state.login[0].isLogin);
  
  useEffect(() => {
    const check = localStorage.getItem("username")
    if(check == null){
      navigate("/")
    }
  }, []);
  
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await getBillByStudentId(id);
        const data = formatData(res.data.bill);
        setData(data);
        setValues(res.data);
        setLoading(false);
      } catch (error) {
        notification.open({
          message: error.response.data.message,
          description:
          <TwitterOutlined style={{color : '#93b874'}}/> ,
          icon: <CloseOutlined style={{ color: '#e80404' }} />,
      });
      }
    };
    fetchAPI();
  }, []);

  const formatData = (data) => {
    let uniqueDay = [];
    for (const item of data) {
      const day = moment(item.createdDate).format("DD-MM-YYYY");
      if (!uniqueDay.includes(day)) {
        uniqueDay.push(day);
      }
    }
    uniqueDay = uniqueDay.sort();
    let result = {};
    for (const day of uniqueDay) {
      result[day] = [];
    }
    for (const item of data) {
      const currDay = moment(item.createdDate).format("DD-MM-YYYY");
      for (const day of uniqueDay) {
        if (day === currDay) {
          let name = "";
          const price = item.object.price;
          if (item.type === "ParkingEntity") {
            name = "G???i xe-" + item.object.serviceCode + (price ? "" : " (FREE)");
          } else if (item.type === "FoodEntity") {
            name = `????? ??n-${item.object.serviceCode} (x${item.object.times})`;
          } else if (item.type === "LaundryEntity") {
            name = `Gi???t l??-${item.object.serviceCode} (${item.object.weight}kg)`
          }
          result[day].push({
            name,
            price
          });
        }
      }
    }
    return result;
  }


  if (loading) {
    return (
      <div className="loading-center">
        <LoadingOutlined style={{ fontSize: 50, color: "orange" }} spin />
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <div className="columns is-centered">
        <Link to="/home">
          <div className="mt-5 mr-3">
            <LeftCircleOutlined style={{ fontSize: 50, color: "orange" }} />
          </div>
        </Link>
        <div className="column is-half">
          <div className="card">
            <div className="card-content" style={{ backgroundColor: "#f3ede3"}}>
              <h1 className="title is-4 has-text-centered">H??A ????N TH??NG {values.month}/{values.year} </h1>
              <p>H??? v?? t??n: {values.name}</p>
              <p>M?? SV: {values.studentCode}</p>
              <hr className="divider" />
              <div className="columns">
                <div className="column">
                  <span className="title is-6">Ng??y</span>
                </div>
                <div className="column">
                  <span className="title is-6">S???n ph???m</span>
                </div>
                <div className="column has-text-right">
                  <span className="title is-6">Gi?? tr???</span>
                </div>
              </div>
              {Object.keys(data).map((day, index) => {
                return (
                  <>
                    <hr className="divider" />
                    <div key={index} className="columns">
                      <div className="column is-one-third">{day}</div>
                      <div className="column">
                        {data[day].map((item, index) => {
                          return (
                            <div className="columns">
                              <div key={index} className="column">
                                {item.name}
                              </div>
                              <div key={index} className="column has-text-right">
                                {item.price}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
              <hr className="divider" />
              <div className="columns">
                <div className="column"></div>
                <div className="column">
                  <span>Ti???n ph??ng</span>
                </div>
                <div className="column has-text-right">
                  <span>{values.roomFee}</span>
                </div>
              </div>
              <div className="columns">
                <div className="column"></div>
                <div className="column">
                  <span>Ti???n g???i xe v?? th??ng</span>
                </div>
                <div className="column has-text-right">
                  <span>{values.ticketFee}</span>
                </div>
              </div>
              <hr className="divider" />
              <div className="columns">
                <div className="column"></div>
                <div className="column">
                  <span className="title is-6">T???ng c???ng</span>
                </div>
                <div className="column has-text-right">
                  <span className="title is-6">{values.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;