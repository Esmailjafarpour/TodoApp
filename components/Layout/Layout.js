import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";

const Layout = ({children}) => {
     return (
          <div className="container">
               <header>
                    <p>Todo App N.J</p>
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
