import React from 'react';

import { Card, Table, Button, Modal, Form, Input, InputNumber, Select } from 'antd';

const RenderForm = ({ jsonFrom, visible }) => { 
    console.log("cis" ,visible)
    return (
        <div> {
            jsonFrom.map((item, index) => {
                return (
                    <Form.Item
                        key={String(index)}
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        style={item.hidden ? { display: 'none' } : { margin: '8px 15px' }}
                    >
                        <Input />
                    </Form.Item>
                )
            })
        }
        </div>
    );
}

export default RenderForm;