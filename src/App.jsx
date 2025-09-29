import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Livemap from "./components/Livemap/Livemap";
import Predictions from "./components/Predictions/Predictions";
import Tagdetails from "./components/Tagdetails/Tagdetails";
import DashLogs from "./components/DashLogs/DashLogs";
import Chatbot from "./components/Chatbot/Chatbot";
import NotFound from "./NotFound";



function App() {
  const router = createBrowserRouter([
    {path: "", element: <Layout />, children: [
      {
        index: true, element: <Dashboard />
      },
      {
        path: "/", element: <Dashboard />
      },
      {
        path: "livemap", element: <Livemap />
      },
      {
        path: "predictions", element: <Predictions />
      },
      {
        path: "tagdetails", element: <Tagdetails />
      },
      {
        path: "dashlogs", element: <DashLogs />
      },
      {
        path: "chatbot", element: <Chatbot />
      },
      {path: "*", element: <NotFound />}
    ]}
    
  ])
  return <RouterProvider router={router} />
}

export default App;
