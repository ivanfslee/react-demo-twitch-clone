//we create our own browser history object rather than use react-router's
//so we can access it more directly in our components 
import { createBrowserHistory } from 'history'; 
export default createBrowserHistory();
