import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow , BiLeftArrow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const Tasks = ({tasks , back , next , fetchTodos}) => {

     const changeStatus = async (id , status) => {
        const res = await fetch ("/api/todos",{
               method : "PATCH",
               body : JSON.stringify({id , status} ),
               headers : { "Content-Type" : "application/json"}
          }
        )
        const data = await res.json();
        if (data.status === "success") fetchTodos()
     }
     return (
          <div className="tasks">
               {tasks?.map((task) => <div key={task._id} className="tasks__card">
                         <span className={task.status}></span>
                         <div>
                              <RiMastodonLine/>
                              <Link href={`/${task._id}`}><FiEdit/></Link>  
                         </div>
                         <h4>{task.title}</h4>
                         <p>{task.description}</p>
                         <div>
                              {back ? <button 
                                   className="button-back"
                                   onClick={()=> changeStatus(task._id , back)}>
                                   <BiLeftArrow/>
                                   Back
                              </button>:null}
                              {next ? <button 
                                   className="button-next"
                                   onClick={()=> changeStatus(task._id , next)}
                                   >
                                   Next
                                   <BiRightArrow/>
                              </button>:null}
                         </div>
                         
                    </div>
               )}
          </div>
     );
}

export default Tasks;
