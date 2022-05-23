import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AppliedProject = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const [appliedProject, setAppliedProject] = useState([]);

    useEffect(() => {
        fetch("/api/enrolled/applied", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 0, member: id })
        })
            .then(res => res.json())
            .then(data => setAppliedProject(data?.applied))
    }, [])
    return (
        <div>
            <h5 className='text-center'>Applied Project</h5>
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
                <tbody>
                    {
                        appliedProject?.map((data, i) =>
                            <tr key={data?._id} className="text-center">
                                <th scope="row">{++i}</th>
                                <td>{data?.project?.name}</td>
                                <td>{data?.project?.category}</td>
                                <td>{data?.project?.state}</td>
                                <td>{data?.project?.description}</td>
                                <td>{moment(data?.createdAt).format("YYYY-MM-DD h:mm A")}</td>
                            </tr>
                        )
                    }
                    <tr className="text-center">
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AppliedProject;