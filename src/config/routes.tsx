import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Chat from "../pages/Chat";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/chat',
        element: <Chat />,
    }
]);

export default router;
