import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./PropertyForm.css";
import getRandomImage from "./utils/getRandomImage";

const PropertyForm = ({
  getProperties,
  selectedProperty,
  setSelectedProperty,
}) => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [rentalIncome, setRentalIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const imagePath = getRandomImage();

  useEffect(() => {
    if (selectedProperty) {
      setPropertyAddress(selectedProperty.propertyAddress);
      setPurchasePrice(selectedProperty.purchasePrice);
      setDownPayment(selectedProperty.downPayment);
      setInterestRate(selectedProperty.interestRate);
      setLoanTerm(selectedProperty.loanTerm);
      setRentalIncome(selectedProperty.rentalIncome);
      setExpenses(selectedProperty.expenses);
    } else {
      resetForm();
    }
    // eslint-disable-next-line no-use-before-define
  }, [resetForm, selectedProperty]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const api =
      window.location.hostname === "localhost"
        ? "http://localhost:8081"
        : "https://investment-property-calc-api.herokuapp.com";

    try {
      if (selectedProperty) {
        await axios.patch(`${api}/property/${selectedProperty._id}`, {
          propertyAddress,
          purchasePrice,
          downPayment,
          interestRate,
          loanTerm,
          rentalIncome,
          expenses,
        });
        setSelectedProperty(null);
      } else {
        await axios.post(`${api}/properties`, {
          propertyAddress,
          purchasePrice,
          downPayment,
          interestRate,
          loanTerm,
          rentalIncome,
          expenses,
          imagePath,
        });
      }
      getProperties();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = useCallback(() => {
    setPropertyAddress("");
    setPurchasePrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("");
    setRentalIncome("");
    setExpenses("");
    setSelectedProperty(null);
  }, [
    setPropertyAddress,
    setPurchasePrice,
    setDownPayment,
    setInterestRate,
    setLoanTerm,
    setRentalIncome,
    setExpenses,
    setSelectedProperty,
  ]);

  return (
    <form id="property-form" className="container" onSubmit={handleSubmit}>
      <div className="row form-container">
        <div className="col-lg-6">
          <div>
            <label className="input-label" htmlFor="property-address">
              Property Address
              <input
                required
                type="text"
                id="property-address"
                className="input-field"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="123 Main St"
              />
            </label>
          </div>
          <div>
            <label className="input-label" htmlFor="purchase-price">
              Purchase Price
              <input
                required
                type="number"
                id="purchase-price"
                className="input-field"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="100000"
              />
            </label>
          </div>
          <div>
            <label className="input-label" htmlFor="down-payment">
              Down Payment
              <input
                required
                type="number"
                id="down-payment"
                className="input-field"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="20000"
              />
            </label>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <label className="input-label" htmlFor="interest-rate">
              Interest Rate
              <input
                required
                type="number"
                id="interest-rate"
                className="input-field"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="4.5"
              />
            </label>
          </div>
          <div>
            <label className="input-label" htmlFor="loan-term">
              Loan Term (Years)
              <input
                required
                type="number"
                id="loan-term"
                className="input-field"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="30"
              />
            </label>
          </div>
          <div>
            <label className="input-label" htmlFor="rental-income">
              Rental Income (Monthly)
              <input
                required
                type="number"
                id="rental-income"
                className="input-field"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(e.target.value)}
                placeholder="1500"
              />
            </label>
          </div>
          <div>
            <label className="input-label" htmlFor="expenses">
              Expenses (Monthly)
              <input
                required
                type="number"
                id="expenses"
                className="input-field"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="500"
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <input
          className="submit-btn"
          type="submit"
          value={selectedProperty ? "Update Property" : "Analyze Now"}
        />
      </div>
    </form>
  );
};

export default PropertyForm;
