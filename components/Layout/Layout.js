import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { useSession , signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Layout = ({children}) => {

     const { status } = useSession();
     
     const logOutHandler = () => {
          signOut()
     }

     return (
          <div className="container">
               <header>
                    <p>Todo App N.J</p>
                    {status === "authenticated" ? <button onClick={logOutHandler}>Log Out <FiLogOut/></button> : null}
               </header>
               <div className="container--main">
                    <aside>
                         <p>WellCome 👋</p>
                         <ul>
                              <li>
                                   <VscListSelection/>
                                   <Link href="/">Todos</Link>
                              </li>
                              <li>
                                   <BiMessageSquareAdd/>
                                   <Link href="/add-todo">Add Todos</Link>
                              </li>
                              <li>
                                   <RxDashboard/>
                                   <Link href="/profile">Profile</Link>
                              </li>
                         </ul>
                    </aside>
                    <section>{children}</section>
               </div>
               
          </div>
     );
}

export default Layout;
