import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/user.service";
import ModalDelete from "../../components/modalDelete/modalDelete";
import ModalEdit from "../../components/modalEdit/modalEdit";
import ModalView from "../../components/modalView/modalView";
import { getReportData } from "../../services/check.service";
import ReportModal from "../../components/modalReport/reportModal";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [userToUpdate, setUserToUpdate] = useState(false);
  const [userToView, setUserToView] = useState(false);

  const [rutToDelete, setRutToDelete] = useState("");
  const [showingDeleteModal, setShowingDeleteModal] = useState(false);
  const [showingUpdateModal, setShowingUpdateModal] = useState(false);
  const [showingViewModal, setShowingViewModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handlePages = (page) => {
    if (page === "create-user") {
      navigate("/createUser");
    }
  };

  const handleDeleteConfirmation = (rut) => {
    setRutToDelete(rut);
    setShowingDeleteModal(true);
  };

  const handleUpdateUser = (user) => {
    setUserToUpdate(user);
    setShowingUpdateModal(true);
  };

  const handleViewUser = (user) => {
    setUserToView(user);
    setShowingViewModal(true);
  };

  const handleReport = (rut) => {
    getReportData(rut).then((data) => {
      setReportData(data);
      setShowReportModal(true);
    });
  };

  return (
    <div>
      <h1>
        Lista de Usuarios{" "}
        <button
          className="btn btn-outline-success"
          onClick={() => handlePages("create-user")}
        >
          <i className="bi bi-person-plus"></i>
        </button>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rut}>
              <td>{user.rut}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido_paterno}</td>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                
                <button
                  className="btn btn-outline-info"
                  onClick={() => handleViewUser(user)} 
                  style={{ margin: '0 10px'}}
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleUpdateUser(user)}
                  style={{ margin: '0 10px'}}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteConfirmation(user.rut)}
                  style={{ margin: '0 10px'}}
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleReport(user.rut)}
                  style={{ margin: '0 10px'}}
                >
                  <i className="bi bi-bar-chart-line"></i> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDelete
        rut={rutToDelete}
        showingModal={showingDeleteModal}
        closeModal={() => setShowingDeleteModal(false)}
      />
      <ModalEdit
        user={userToUpdate}
        showingModal={showingUpdateModal}
        closeModal={() => setShowingUpdateModal(false)}
      />
      <ModalView
        user={userToView}
        showingModal={showingViewModal}
        closeModal={() => setShowingViewModal(false)}
      />
      <ReportModal
        data={reportData}
        showingModal={showReportModal}
        closeModal={() => setShowReportModal(false)}
      />
    </div>
  );
};

export default UserList;
