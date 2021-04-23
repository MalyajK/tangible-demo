import React from "react";
import AllGoalsChart from "./AllGoalsChart";
import DepCompChart from "./DepCompChart";
import RevenueChart from "./RevenueChart";
import ExpenseChart from "./ExpenseChart";
import ProfitChart from "./ProfitChart";
import DebtorsChart from "./DebtorsChart";
import "../dashboard.css";

const Ceo = () => {
  return (
    <>
      <div className="row">
        <AllGoalsChart />
        <DepCompChart />
      </div>
      <div className="row">
        <RevenueChart />
        <ExpenseChart />
      </div>
      <div className="row">
        <ProfitChart />
        <DebtorsChart />
      </div>
    </>
  );
};

export default Ceo;
