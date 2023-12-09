import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import useAuth from "./hooks/useAuth"

const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />;
};

const AppRoutes = [
    {
        index: true,
        element: <Private Item={Home} />
    },
    {
        path: '/counter',
        element: <Private Item={Counter} />
    },
    {
        path: '/fetch-data',
        element: <Private Item={FetchData} />
    },
    {
        path: '/Login',
        element: <Login />
    }
];

export default AppRoutes;
