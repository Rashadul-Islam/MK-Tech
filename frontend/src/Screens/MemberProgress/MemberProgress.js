import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const MemberProgress = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const [getProject, setProject] = useState([])
    useEffect(() => {
        fetch("/api/enrolled/progressProject", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id, status: 1 })
        })
            .then(res => res.json())
            .then(data => setProject(data?.project))
    }, [])
    return (
        <div>
            <h5 className='text-center'>Progress Projects</h5>
            <table className="table table-hover mt-5 table-responsive-sm">
                <thead>
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Applied</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {getProject?.map((data, i) => (
                        <tr key={data?._id}>
                            <th scope="row">{++i}</th>
                            <td>{data?.project?.name}</td>
                            <td>{data?.project?.category}</td>
                            <td>{data?.project?.state}</td>
                            <td>{data?.project?.description}</td>
                            <td>{moment(data?.createdAt).format("YYYY-MM-DD h:mm A")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberProgress;