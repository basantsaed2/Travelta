import React, { useState } from "react";
import TitlePage from "../../../../Components/TitlePage";
import { WalletPage } from "../../../../Pages/AllPages";
import AddButton from "../../../../Components/Buttons/AddButton";
import { Link } from "react-router-dom";
import CurrencyPage from "../../../../Pages/Dashboard/AgentDashboard/Setting/Currency/CurrencyPage";
import AddCurrency from "../../../../Pages/Dashboard/AgentDashboard/Setting/Currency/AddCurrency";
import TitleSection from "../../../../Components/TitleSection";

const CurrencyLayoutPage = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={"Add Currency"} />
      <AddCurrency update={update} setUpdate={setUpdate} />
      <TitleSection text={"Currency"}  />
      <CurrencyPage update={update}  />
    </>
  );
};

export default CurrencyLayoutPage;
