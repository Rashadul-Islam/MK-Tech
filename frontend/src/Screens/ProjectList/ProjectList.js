import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProjectList = () => {
    const token = useSelector((state) => state.userLogin.userInfo.token);
    const id = useSelector((state) => state.userLogin.userInfo._id);
    const [getProject, setproject] = useState([]);
    const [getEnrollData, setEnrollData] = useState([]);

    useEffect(() => {
        fetch("/api/project/getProject", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setproject(data?.project));
    }, []);

    useEffect(() => {
        getEnroll();
    }, []);

    const getEnroll = () => {
        fetch(`/api/enrolled/getEnroll/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setEnrollData(data?.enroll));
    };

    const enrollProject = (project, id) => {
        fetch("/api/enrolled", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ project: project, member: id, status: 0 }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success === true) {
                    alert("Successfully Enrolled !!!");
                    getEnroll();
                }
            });
    };
    return (
        <div>
            <h5 className="text-center">Open Project List</h5>
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
                            <td>
                                {getEnrollData.some(
                                    (enroll) => enroll?.project === data?._id
                                ) ? (
                                    <button className="btn btn-success btn-sm" disabled>Enrolled</button>
                                ) : (
                                    <button
                                        onClick={() => enrollProject(data?._id, id)}
                                        className="btn btn-info btn-sm"
                                    >
                                        Enroll
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

export default ProjectList;
