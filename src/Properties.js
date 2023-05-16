import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyForm from "./PropertyForm";
import getRandomImage from "./utils/getRandomImage";
import "./Properties.css";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const api =
      window.location.hostname === "localhost"
        ? "http://localhost:8081"
        : "https://investmentpropcalcapi.herokuapp.com";

    try {
      const response = await axios.get(`${api}/property`);
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
        <div className="property-image">
          <img src={getRandomImage()} alt="a home" height="200" />
        </div>
        <div className="property-details">
          <h3>{property.propertyAddress}</h3>
          <div>
            <b>Purchase Price: </b>${property.purchasePrice}
          </div>
          <div>
            <b>Down Payment: </b>${property.downPayment}
          </div>
          <div>
            <b>Interest Rate: </b>
            {property.interestRate}%
          </div>
          <div>
            <b>Loan Term: </b>
            {property.loanTerm} Years
          </div>
          <div>
            <b>Monthly Rental Income: </b>${property.rentalIncome}
          </div>
          <div>
            <b>Monthly Expenses: </b>${property.expenses}
          </div>
          <hr />
          <h2>Analysis:</h2>
          <div>
            <b>Loan Amount: </b>${property.purchasePrice - property.downPayment}
          </div>
          <div>
            <b>Monthly Mortgage Payment: </b>${property.mortgagePayment}
          </div>
          <div>
            <b>Total Monthly Expenses (incl. Mortgage): </b>$
            {property.expenses + property.mortgagePayment}
          </div>
          <div>
            <b>Total Monthly Cash Flow: </b>${property.cashFlow}
          </div>
          <div>
            <b>Cash on Cash Return: </b>
            {property.cocReturn}%
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="properties-container">
      <h2 className="section-title">Submit a New Property:</h2>
      <PropertyForm getProperties={getProperties} />
      <h2 className="section-title">Saved Properties:</h2>
      <ul className="properties-list">{renderProperties()}</ul>
    </div>
  );
};

export default Properties;
