import { useUser } from './../customHooks';

const WithUser = props => useUser(props) && props.children;

export default WithUser; 