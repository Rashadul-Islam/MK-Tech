import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CreateProject = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const [project, setProject] = useState({
        name: "",
        category: "",
        state: "open",
        description: ""
    })
    const handleChange = (e) => {
        const newProject = { ...project };
        newProject[e.target.name] = e.target.value;
        setProject(newProject);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/project/createProject", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.success === true) {
                    alert("new project created !!!");
                    document.getElementById("form").reset();
                }
            })
    }

    return (
        <div>
            <h5 className='text-center mt-3'>Add New Project</h5>
            <Form onSubmit={handleSubmit} id="form">
                <Row className='w-75 mx-auto mt-5'>
                    <Col md={6}>
                        <input type="text" onChange={handleChange} name="name" required className='form-control mb-3' placeholder='Project Name' />
                    </Col>
                    <Col md={6}>
                        <input type="text" onChange={handleChange} name="category" required className='form-control mb-3' placeholder='Project category' />
                    </Col>
                    <Col md={12}>
                        <textarea className="form-control mb-3" name='description' required onChange={handleChange} rows="5" placeholder='Project Description' />
                    </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success' type='submit'>Save</button>
                </div>
            </Form>
        </div>
    );
};

export default CreateProject;