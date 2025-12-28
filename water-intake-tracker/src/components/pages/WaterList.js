import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function WaterList() {
  const navigate = useNavigate();
  const logged = JSON.parse(localStorage.getItem("loggedUser"));

  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [differenceResult, setDifferenceResult] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [quantity, setQuantity] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

  // Load entries
  useEffect(() => {
    if (!logged) 
        navigate("/login");

    const all = JSON.parse(localStorage.getItem("waterEntries") || "[]");
    const userEntries = all
      .filter((e) => e.userEmail === logged.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(userEntries);
  }, []);

  // Delete entry
  const confirmDelete = () => {
    if (deleteId === null) return;

    const all = JSON.parse(localStorage.getItem("waterEntries") || "[]");
    const updated = all.filter((e) => e.id !== deleteId);
    localStorage.setItem("waterEntries", JSON.stringify(updated));

    const userEntries = updated
      .filter((e) => e.userEmail === logged.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(userEntries);

    if (page >= userEntries.length) setPage(userEntries.length - 1);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Add entry
  const handleAdd = (e) => {
    e.preventDefault();
    if (!quantity) return;

    const allEntries = JSON.parse(localStorage.getItem("waterEntries") || "[]");
    const todayStr = new Date().toISOString().split("T")[0];

    const exists = allEntries.find(
      (e) => e.userEmail === logged.email && e.date === todayStr
    );
    if (exists) {
      alert("You have already added water intake for today!");
      setShowAddModal(false);
      return;
    }

    const timeStr = new Date().toLocaleTimeString();
    const newEntry = {
      id: Date.now(),
      userEmail: logged.email,
      date: todayStr,
      time: timeStr,
      quantity: Number(quantity),
    };

    allEntries.push(newEntry);
    localStorage.setItem("waterEntries", JSON.stringify(allEntries));

    const userEntries = allEntries
      .filter((e) => e.userEmail === logged.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(userEntries);

    setQuantity("");
    setShowAddModal(false);
    setPage(userEntries.length - 1);
  };

  // Edit entry
  const openEditModal = (entry) => {
    setEditId(entry.id);
    setEditQuantity(entry.quantity);
    setShowEditModal(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editQuantity) return;

    const allEntries = JSON.parse(localStorage.getItem("waterEntries") || "[]");
    const updated = allEntries.map((entry) =>
      entry.id === editId ? { ...entry, quantity: Number(editQuantity) } : entry
    );
    localStorage.setItem("waterEntries", JSON.stringify(updated));

    const userEntries = updated
      .filter((e) => e.userEmail === logged.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(userEntries);

    setShowEditModal(false);
    setEditId(null);
    setEditQuantity("");
  };

  // Difference calculation
  const handleDifference = () => {
    if (!fromDate || !toDate) {
      setDifferenceResult("Please select both dates!");
      return;
    }

    const filtered = entries.filter(
      (e) => e.date === fromDate || e.date === toDate
    );

    if (filtered.length < 2) {
      setDifferenceResult(
        "Both dates must be recorded water intake dates. Please check your inputs."
      );
      return;
    }

    const total1 = filtered.find((e) => e.date === fromDate)?.quantity || 0;
    const total2 = filtered.find((e) => e.date === toDate)?.quantity || 0;
    const diff = Math.abs(total1 - total2);

    setDifferenceResult(
      `Water intake difference between ${fromDate} and ${toDate} is ${diff} ml`
    );
  };

  const pages = entries.map((e) => e.date);
  const currentEntries = entries.filter((e) => e.date === pages[page]);

  return (
    <>
      <Navbar />
      <div className="container mt-4 pt-4">
        <h2 className="text-center mb-4">Your Water Intake</h2>

        <div className="mb-3 d-flex gap-2">
          <button
            className="btn btn-success"
            onClick={() => setShowAddModal(true)}
          >
            Add Today’s Intake
          </button>
        </div>

        <hr />

        <h4>Calculate Intake Difference</h4>
        <div className="d-flex gap-2 mb-2">
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleDifference}>
            Difference
          </button>
        </div>
        {differenceResult && (
          <div className="alert alert-info">{differenceResult}</div>
        )}

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Quantity (ml)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((e) => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td>{e.time}</td>
                <td>{e.quantity}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm flex-fill"
                      onClick={() => openEditModal(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm flex-fill"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-secondary"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="align-self-center">Page {page + 1}</span>
          <button
            className="btn btn-secondary"
            disabled={page === pages.length - 1 || pages.length === 0}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Today’s Water Intake</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <label className="form-label">Quantity (ml)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Water Intake</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleEdit}>
                <div className="modal-body">
                  <label className="form-label">Quantity (ml)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this entry?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WaterList;
