import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Sidebar from "../../Components/Sidebar/Sidebar"

const AdminDashboard = () => {
    return (
        <Row>
            <Col md={2}>
                <Sidebar />
            </Col>
            <Col md={10}>
            </Col>
        </Row>
    );
};

export default AdminDashboard;