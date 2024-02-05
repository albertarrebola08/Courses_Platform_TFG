import { useLocation } from "react-router-dom";

const Error404Page = () => {
  const location = useLocation();
  const url = location.pathname;

  return (
    <div className="flex justify-around items-center gap-8 flex-wrap">
      <div className="flex flex-col gap-2">
        <h1>Pàgina no trobada :(</h1>
        <h3 className="text-lg">
          La direcció <span className="text-blue-900 font-bold">{url}</span> no
          existeix...
        </h3>
      </div>
      <img
        className="w-[40%]"
        src="../../../src/assets/programming.png"
        alt=""
      />
    </div>
  );
};

export default Error404Page;
