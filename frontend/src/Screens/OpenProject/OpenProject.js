import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const OpenProject = () => {
  const token = useSelector((state) => state.userLogin.userInfo.token);
  const [getProject, setproject] = useState([]);

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
            <th scope="col">Created</th>
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
              <td>{moment(data?.createdAt).format("YYYY-MM-DD h:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenProject;
