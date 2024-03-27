import React from "react";
import ConsejoDiarioForm from "../../components/ConsejosDiarios/ConsejoDiarioForm";
import ConsejoDiarioList from "../../components/ConsejosDiarios/ConsejoDiarioList";

const ConsejosPage = () => {
  return (
    <div className="grid grid-cols-[30%,70%] px-">
      <ConsejoDiarioForm></ConsejoDiarioForm>
      <ConsejoDiarioList></ConsejoDiarioList>
    </div>
  );
};

export default ConsejosPage;
