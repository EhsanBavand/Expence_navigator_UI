import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import Layout from "../components/Layout"; // Import your Layout component
import {
  getIncomesByMonth,
  addIncome,
  updateIncome,
  deleteIncome,
  duplicateIncomeNextMonth,
} from "../services/api";

const IncomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [formData, setFormData] = useState({
    sourceType: "",
    owner: "",
    amount: "",
    date: "",
    isRecurring: false,
    isEstimated: false,
    description: "",
  });

  // Replace with your actual user ID from auth
  const userId = "user-123";

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const response = await getIncomesByMonth(
        userId,
        now.getMonth() + 1,
        now.getFullYear()
      );
      setIncomeList(response.data);
      setError(null);
    } catch (e) {
      setError("Failed to load incomes.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowAddModal = () => {
    setEditingIncome(null);
    setFormData({
      sourceType: "",
      owner: "",
      amount: "",
      date: "",
      isRecurring: false,
      isEstimated: false,
      description: "",
    });
    setShowModal(true);
  };

  const handleShowEditModal = (income) => {
    setEditingIncome(income);
    setFormData({
      sourceType: income.sourceType,
      owner: income.owner,
      amount: income.amount,
      date: income.date.split("T")[0],
      isRecurring: income.isRecurring,
      isEstimated: income.isEstimated,
      description: income.description || "",
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveIncome = async (e) => {
    e.preventDefault();

    const incomePayload = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      userId,
      month: new Date(formData.date).getMonth() + 1,
      year: new Date(formData.date).getFullYear(),
      createdBy: userId,
    };

    try {
      if (editingIncome) {
        await updateIncome({ ...incomePayload, id: editingIncome.id });
      } else {
        await addIncome(incomePayload);
      }
      setShowModal(false);
      fetchIncomes();
    } catch {
      setError("Failed to save income.");
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;

    try {
      await deleteIncome(id);
      fetchIncomes();
    } catch {
      setError("Failed to delete income.");
    }
  };

  const handleDuplicateNextMonth = async (id) => {
    try {
      await duplicateIncomeNextMonth(id);
      fetchIncomes(); // reload current month incomes
    } catch {
      setError("Failed to duplicate income.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "900px", margin: "auto" }} // limit width and center
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Income Overview</h4>
        <Button onClick={handleShowAddModal}>
          <i className="bi bi-plus-circle me-2"></i> New Income
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Owner</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Recurring</th>
                <th>Estimated</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No incomes found
                  </td>
                </tr>
              )}
              {incomeList.map((income) => (
                <tr key={income.id}>
                  <td>{new Date(income.date).toLocaleDateString()}</td>
                  <td>{income.owner}</td>
                  <td>{income.sourceType}</td>
                  <td>${income.amount.toFixed(2)}</td>
                  <td>{income.isRecurring ? "Yes" : "No"}</td>
                  <td>{income.isEstimated ? "Yes" : "No"}</td>
                  <td>{income.description}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowEditModal(income)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>

                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDuplicateNextMonth(income.id)}
                    >
                      <i className="bi bi-calendar-plus"></i>
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteIncome(income.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSaveIncome}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingIncome ? "Edit Income" : "Add New Income"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                name="owner"
                value={formData.owner}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Source Type</Form.Label>
              <Form.Control
                name="sourceType"
                value={formData.sourceType}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Recurring?"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Estimated?"
                name="isEstimated"
                checked={formData.isEstimated}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingIncome ? "Save Changes" : "Add Income"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default IncomePage;
