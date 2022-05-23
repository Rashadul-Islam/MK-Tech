import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CompleteProject = () => {
    const [getProject, setProject] = useState([]);
    const token = useSelector((state) => state.userLogin.userInfo.token);

    const fetchData = () => {
        fetch("/api/project/complete", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ state: "finish" })
        })
            .then(res => res.json())
            .then(data => setProject(data?.project))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const finishProject = (id, token) => {
        fetch("/api/project/finish", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.success === true) {
                    fetchData();
                }
            })
    }

    return (
        <div>
            <h5 className='text-center'>Manage Project</h5>
            <table className="table table-hover mt-5 table-responsive-sm">
                <thead>
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {getProject?.map((data, i) => (
                        <tr key={data?._id}>
                            <th scope="row">{++i}</th>
                            <td>{data?.name}</td>
                            <td>{data?.category}</td>
                            <td>{data?.state}</td>
                            <td>{data?.description}</td>
                            <td >
                                <Link to={`/dashboard/completeProject/${data?._id}`} className="text-none btn btn-success btn-sm" >Members</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompleteProject;