export const getProperties = async () => {
  const api =
    window.location.hostname === "localhost"
      ? "http://localhost:8081"
      : "https://investment-property-calc-api.herokuapp.com";

  try {
    const response = await fetch(`${api}/properties`);
    const properties = await response.json();
    return properties;
  } catch (error) {
    console.log("Error:", error);
  }
};
