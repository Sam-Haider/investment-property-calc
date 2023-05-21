import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import PropertyForm from "./PropertyForm";
import "./Properties.css";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const api =
      window.location.hostname === "localhost"
        ? "http://localhost:8081"
        : "https://investment-property-calc-api.herokuapp.com";

    try {
      const response = await axios.get(`${api}/properties`);
      setAllProperties(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const renderProperties = () => {
    if (allProperties.length === 0) {
      return <p>No properties found.</p>;
    }

    return allProperties.map((property) => (
      <li key={property._id} className="property-container">
        <div className="property-image-div">
          <img
            className="property-image"
            src={property.imagePath}
            alt="a home"
          />
        </div>
        <div className="property-details">
          <h3 className="property-title">{property.propertyAddress}</h3>
          <div className="property-info">
            <span className="property-label">Purchase Price:</span> $
            {property.purchasePrice}
          </div>
          <div className="property-info">
            <span className="property-label">Down Payment:</span> $
            {property.downPayment}
          </div>
          <div className="property-info">
            <span className="property-label">Interest Rate:</span>{" "}
            {property.interestRate}%
          </div>
          <div className="property-info">
            <span className="property-label">Loan Term:</span>{" "}
            {property.loanTerm} Years
          </div>
          <div className="property-info">
            <span className="property-label">Monthly Rental Income:</span> $
            {property.rentalIncome}
          </div>
          <div className="property-info">
            <span className="property-label">Monthly Expenses:</span> $
            {property.expenses}
          </div>
          <hr className="property-divider" />
          <h2 className="property-analysis-title">Analysis:</h2>
          <div className="property-analysis">
            <div className="property-analysis-item">
              <span className="property-label">Loan Amount:</span>
              <div>${property.purchasePrice - property.downPayment}</div>
            </div>
            <div className="property-analysis-item">
              <span className="property-label">Monthly Mortgage Payment:</span>{" "}
              <div>${property.mortgagePayment}</div>
            </div>
            <div className="property-analysis-item">
              <span className="property-label">
                Total Monthly Expenses (incl. Mortgage):
              </span>{" "}
              <div>${property.expenses + property.mortgagePayment}</div>
            </div>
            <div className="property-analysis-item">
              <span className="property-label">Total Monthly Cash Flow:</span>
              <div>${property.cashFlow}</div>
            </div>
            <div className="property-analysis-item">
              <span className="property-label">Cash on Cash Return:</span>{" "}
              <div>{property.cocReturn.toFixed(2)}%</div>
            </div>
          </div>

          <div className="analysis-result">
            <div className="property-label">Result: </div>
            {property.cocReturn < 0 ? (
              <div className="do-not-invest">Don't invest</div>
            ) : (
              <div className="good-deal">Seems like a good deal!</div>
            )}
          </div>
          <div className="property-actions">
            <button
              className="property-action-button"
              onClick={() => handleEdit(property)}
            >
              <FaEdit />
            </button>
            <button
              className="property-action-button"
              onClick={() => handleDeleteConfirmation(property)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </li>
    ));
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteConfirmation = (property) => {
    setSelectedProperty(property);
    setConfirmDelete(true);
  };

  const cancelDelete = () => {
    setSelectedProperty(null);
    setConfirmDelete(false);
  };

  const deleteProperty = async () => {
    const api =
      window.location.hostname === "localhost"
        ? "http://localhost:8081"
        : "https://investment-property-calc-api.herokuapp.com";

    try {
      await axios.delete(`${api}/property/${selectedProperty._id}`);
      setSelectedProperty(null);
      setConfirmDelete(false);
      getProperties();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="properties-container">
        <h2 className="section-title">Analyze a Rental Property</h2>
        <PropertyForm
          getProperties={getProperties}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
        <h2 className="section-title">My Properties</h2>
        <ul className="properties-list">{renderProperties()}</ul>
      </div>
      {confirmDelete && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this property?</p>
          <div>
            <button className="confirm-button" onClick={deleteProperty}>
              Yes
            </button>
            <button className="cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Properties;
