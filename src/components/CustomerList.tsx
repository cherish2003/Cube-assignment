import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CustomerCard } from "./CustomerCard";
import { customers } from "../customers";
import useWindowSize from "../hooks/useWindowWidth";

type Customer = {
  id: number;
  name: string;
  title: string;
  address: string;
};

type CustomerListProps = {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer) => void;
};

export const CustomerList: React.FC<CustomerListProps> = ({
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const customer = customers[index];
      return (
        <div style={style} className="cursor-pointer">
          <CustomerCard
            customer={customer}
            isSelected={customer.id === selectedCustomer?.id}
            onClick={() => setSelectedCustomer(customer)}
          />
        </div>
      );
    },
    [selectedCustomer, setSelectedCustomer]
  );

  return (
    <div className="h-1/5 w-full sm:h-full sm:w-full md:w-1/4">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={customers.length}
            itemSize={isMobile ? width / 2 : 140}
            width={width}
            layout={isMobile ? "horizontal" : "vertical"}
            className={`no-scrollbar h-full ${
              isMobile ? "flex-row" : "flex-col"
            }`}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
