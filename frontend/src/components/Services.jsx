import React from "react";
import ServiceList from "./ServiceList";
import { useSearchParams } from "react-router-dom";
import ServiceDetails from "./ServiceDetails";

const Services = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  
  if(service) {
    return (
      <ServiceDetails serviceTitle={service} />
    )
  }
  return (
    <ServiceList />
  )
};

export default Services;
