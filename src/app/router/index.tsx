import { createBrowserRouter } from "react-router-dom";
import ScanPage from "../../pages/ScanPage";
import HistoryPage from "../../pages/HistoryPage";
import ResultPage from "../../pages/ResultPage";
import LookupPage from "../../pages/LookupPage";
import HomePage from "../../pages/HomePage";
import Layout from "../Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "scan", element: <ScanPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "result/:id", element: <ResultPage /> },
      { path: "lookup", element: <LookupPage /> },
    ],
  },
]);

export default router;
