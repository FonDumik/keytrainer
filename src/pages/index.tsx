import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Klavaogr = lazy(() => import("./Klavaogr/ui"));
const StartPage = lazy(() => import("./StartPage"));
const DocumentationRU = lazy(() => import("./DocumentationRU"));
const ClikClik = lazy(() => import("./ClikClik/ui"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />}></Route>
      <Route path="/klavaogr" element={<Klavaogr />}></Route>
      <Route path="/DocumentationRU" element={<DocumentationRU />}></Route>
      <Route path="/ClikClik" element={<ClikClik />}></Route>
    </Routes>
  );
};

export default Routing;
