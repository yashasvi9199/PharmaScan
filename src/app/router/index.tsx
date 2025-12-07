import { createBrowserRouter } from "react-router-dom";
import ScanPage from "../../pages/ScanPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScanPage />,
  },
  {
    path: "/scan",
    element: <ScanPage />,
  }
]);

export default router;
