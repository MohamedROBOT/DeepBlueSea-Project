import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Livemap from "./components/Livemap/Livemap";
import Predictions from "./components/Predictions/Predictions";
import Tagdetails from "./components/Tagdetails/Tagdetails";
import DashLogs from "./components/DashLogs/DashLogs";
import NotFound from "./NotFound";
import SharkDetailsPage from "./components/Livemap/SharkDetailsPage";
import { SharksProvider } from "./context/SharksContext";
import StudentMode from "./components/StudentMode/StudentMode";
import SharkQuiz from "./components/StudentMode/SharkQuiz";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "/", element: <Dashboard /> },
        { path: "livemap", element: <Livemap /> },
        { path: "predictions", element: <Predictions /> },
        { path: "tagdetails", element: <Tagdetails /> },
        { path: "dashlogs", element: <DashLogs /> },
        { path: "livemap/:sharkId", element: <SharkDetailsPage /> },
        { path: "studentmode", element: <StudentMode /> },
        { path: "studentmode/sharkquiz", element: <SharkQuiz /> },
       
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <SharksProvider>
      <RouterProvider router={router} />
    </SharksProvider>
  );
}

export default App;
