import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (

    )}>
    </Route>
);

export default PrivateRoute