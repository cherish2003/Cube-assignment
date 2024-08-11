import React, { lazy, useState, Suspense, useCallback } from "react";
import { CustomerList } from "./CustomerList";
import Cubelogo from "../assets/react.svg";

type Customer = {
  id: number;
  name: string;
  title: string;
  address: string;
};

const CustomerDetails = lazy(() => import("./CustomerDetails"));

export const CustomerCom: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleSelectCustomer = useCallback((customer: Customer | null) => {
    setSelectedCustomer(customer);
  }, []);

  return (
    <div className="h-screen flex flex-col ">
      <div className="h-[10%] font-semibold border border-l-indigo-500 flex items-center justify-center text-[28px]">
        <img src={Cubelogo} alt="Cube Logo" className="w-8 h-8" />
        <div className="ml-2">Assignment</div>
      </div>
      <div className="h-[90%] flex flex-col md:flex-row w-full">
        <CustomerList
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={handleSelectCustomer}
        />
        <div className="h-full sm:w-full w-full md:w-3/4 ">
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                Loading Customer Details...
              </div>
            }
          >
            {selectedCustomer ? (
              <CustomerDetails customer={selectedCustomer} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-black">
                  <h2 className="text-xl font-semibold mb-2">
                    No Customer Selected
                  </h2>
                  <p>Please select a customer to view their details.</p>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};
