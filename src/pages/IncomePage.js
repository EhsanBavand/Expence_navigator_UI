import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const IncomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = (e) => {
    e.preventDefault();
    const newIncome = {
      id: Date.now(),
      source: e.target.source.value,
      amount: e.target.amount.value,
      date: e.target.date.value,
    };
    setIncomeList([...incomeList, newIncome]);
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Income Overview</h4>
        <Button onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>New Income
        </Button>
      </div>

      {/* 📊 Graph placeholder */}
      <div className="card p-3 mb-4">
        <h6>Income Chart</h6>
        <div className="text-muted">[Chart Component Here]</div>
      </div>

      {/* 🧾 Table */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeList.map((income) => (
            <tr key={income.id}>
              <td>{income.date}</td>
              <td>{income.source}</td>
              <td>${income.amount}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setIncomeList(incomeList.filter((i) => i.id !== income.id))
                  }
                >
                  <i className="bi bi-trash3"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ➕ Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddIncome}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Income</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control name="source" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control name="amount" type="number" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control name="date" type="date" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Income
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default IncomePage;
