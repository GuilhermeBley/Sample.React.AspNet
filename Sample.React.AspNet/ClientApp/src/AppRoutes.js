import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Login from "./pages/Login";
import { Home } from "./components/Home";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout"

const Private = ({ Item }, useLayout) => {
    const { signed } = useAuth();

    if (useLayout)
        return signed > 0 ? <Layout><Item/></Layout> : <Login/>
    return signed > 0 ? <Item /> : <Login />;
};

const AppRoutes = [
    {
        index: true,
        element: <Private Item={Home} useLayout={true} />
    },
    {
        path: '/counter',
        element: <Private Item={Counter} useLayout={true} />
    },
    {
        path: '/fetch-data',
        element: <Private Item={FetchData} useLayout={true} />
    },
    {
        path: '/Login',
        element: <Login />
    }
];

export default AppRoutes;
