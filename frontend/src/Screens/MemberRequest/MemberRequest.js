import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MemberRequest = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const [memberRequest, setMemberRequest] = useState([]);

    const fetchData = () => {
        fetch("/api/project/memberRequest", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setMemberRequest(data?.request));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const acceptMember = (id, token) => {
        fetch("/api/enrolled/confirmMember", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ project: id })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success === true) {
                    fetchData();
                }
            });
    }

    return (
        <div>
            <h5 className="text-center">Confirm Project Member</h5>
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
                    {memberRequest?.map((data, i) => (
                        <tr key={data?._id}>
                            <th scope="row">{++i}</th>
                            <td>{data?.name}</td>
                            <td>{data?.category}</td>
                            <td>{data?.state}</td>
                            <td>{data?.description}</td>
                            <td>
                                {parseInt(data?.enroll?.total) < 3 ? (
                                    <button className="btn btn-success btn-sm" disabled>
                                        Confirm Members
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => acceptMember(data?._id, token)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Confirm Members
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberRequest;
