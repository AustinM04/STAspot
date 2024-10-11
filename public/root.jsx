import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Header from "../src/components/header/Header.jsx";
import Home from "../src/components/home/Home.jsx";
import About from "../src/components/about/About.jsx";
import Lcards from "../src/components/individual components/landing cards/lcards.jsx";
/*
import Auth from "./components/authentication/auth.jsx";
import { BrowserRouter, Route } from 'react-router-dom';
import Ous from "./components/ous/Ous.jsx";
import Tickets from "./components/tickets/Tickets.jsx";


import Avatar from "./components/avatar/Avatar.jsx";
 */

function Root() {

    /*
       const [users, setUser] = useState([])
       const usersCollectionRef = collection(db, "users");

        useEffect(() => {
            const getUsers = async () => {
                try{
                    const data = await getDocs(usersCollectionRef);
                    console.log(data)
                }catch(err){
                    console.error(err);
                }
            }
            getUsers();
        },);

     */
    return (
        <div>
            <Header/>
            <Home/>
            <Lcards/>
            <About/>
        </div>

    )
}

export default Root
