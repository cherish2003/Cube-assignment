import React from "react";

type CustomerCardProps = {
  customer: {
    id: number;
    name: string;
    title: string;
    address: string;
  };
  isSelected: boolean;
  onClick: () => void;
};

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`h-full p-4 md:p-6 lg:p-10 border cursor-pointer 
  ${
    isSelected
      ? "bg-customGray border-b-4 border-b-slate-700  sm:border-r-slate-700 sm:border-r-4 sm:border-b-0"
      : "bg-white"
  }`}
    >
      <h3 className="text-xl font-bold">{customer.name}</h3>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
    </div>
  );
};
