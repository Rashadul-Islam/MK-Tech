import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ProgressMember = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const { id } = useParams();
    const [getMembers, setMembers] = useState([]);

    const fetchData = () => {
        fetch("/api/enrolled/progressMember", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id, status: 1 })
        })
            .then(res => res.json())
            .then(data => setMembers(data?.member))
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const removeMember = (project, member, token) => {
        fetch("/api/enrolled/removeMember", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ project: project, member: member })
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
            <h5 className='text-center'>Progress Project Members</h5>
            <table className="table table-hover mt-5 table-responsive-sm">
                <thead>
                    <tr className="text-center">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Member</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {getMembers?.map((data, i) => (
                        <tr key={data?._id}>
                            <th scope="row">{++i}</th>
                            <td>{data?.project?.name}</td>
                            <td>{data?.project?.category}</td>
                            <td>{data?.project?.state}</td>
                            <td>{data?.project?.description}</td>
                            <td>{data?.member?.email}</td>
                            <td>
                                <button
                                    onClick={() => removeMember(data?.project?._id, data?.member?._id, token)}
                                    className="btn btn-info btn-sm"
                                >
                                    Remove
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProgressMember;