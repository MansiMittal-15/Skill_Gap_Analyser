import React from "react";
import { services } from "../utils/ServicePageContent";

const ServiceDetails = ({ serviceTitle }) => {
  const serviceData = services[serviceTitle];
  return (
    <div>
      <div>Hello this is the service page</div>
    </div>
  );
};

export default ServiceDetails;
