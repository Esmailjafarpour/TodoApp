import { useState , useEffect } from "react";
import { useRouter } from "next/Router";
import { getSession } from "next-auth/react";
import FormInput from "@/module/FormInput";
import Textarea from "@/module/Textarea";
import RadioButton from "@/element/RadioButton";
import { FiEdit } from "react-icons/fi";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

function editTaskId(props) {

     const Router = useRouter();
     const {query : { editTaskId } , isReady} = Router;
     const [state, setAllState] = useState({
          todos : [],
          index : "",
     });
     const [todo, setTodo] = useState({
          title : "",
          status : "todo",
          description : "",
          _id :"",
     });

     useEffect(() => {
          console.log(editTaskId)
         if (isReady) {
           fetch(`/api/${editTaskId}`)
           .then((res) => res.json())
           .then((data) => {
               const todos = data.data.todos
               const index = todos.findIndex((todo) => todo._id === editTaskId[0])
               const todo = todos[index]
               setAllState({
                    ...state,
                    todos : todos,
                    index : index,
               })
               setTodo({
                    title : todo.title,
                    status : todo.status,
                    description : todo.description,
                    _id : editTaskId[0]
               })
           })
         }
     }, []);

     const editHandler = (e) => {
          setTodo({
               ...todo,
               [e.target.name] : e.target.value
          })
     }

     const saveHandler = async () => {
          state.todos[state.index] = todo
          console.log(state.todos)
          const res = await fetch(`/api/${todo._id}`,{
               method : "PATCH",
               body : JSON.stringify({todos : state.todos}),
               headers : {"Content-Type" : "application/json"}
          })

          const data = await res.json();

          if (data.status === "success") Router.replace("/")
               
     }

     return (
          <div className="add-form">
               <div className="header">
                    <h3 className={`header-${todo.status}`}>
                         Edit todo in status {todo.status}
                         <FiEdit/>
                    </h3>
               </div>
               {todo?
                    <div className="add-form__form">
                         <div className="add-form__input--first">
                              <FormInput  
                                   label="Title"  
                                   name="title"  
                                   type="text" 
                                   value={todo.title}  
                                   onChange={(e)=> editHandler(e)} 
                              />
                         </div>

                         <div className="add-form__input--first">
                              <FormInput  
                                   label="Description"  
                                   name="description"  
                                   type="text" 
                                   value={todo.description}  
                                   onChange={(e)=> editHandler(e)} 
                              />
                         </div>

                         <div className="add-form__input--second">
                              <RadioButton
                                   title="Todo"
                                   value="todo"
                                   state={todo}
                                   setAllState={setTodo}
                              >
                              <BsAlignStart />
                              </RadioButton>
                              <RadioButton
                                   title="In Progress"
                                   value="inProgress"
                                   state={todo}
                                   setAllState={setTodo}
                              >
                              <FiSettings />
                              </RadioButton>
                              <RadioButton
                                   title="Review"
                                   value="review"
                                   state={todo}
                                   setAllState={setTodo}
                              >
                              <AiOutlineFileSearch />
                              </RadioButton>
                              <RadioButton
                                   title="Done"
                                   value="done"
                                   state={todo}
                                   setAllState={setTodo}
                              >
                              <MdDoneAll />
                              </RadioButton>
                         </div>

                         <div>
                              <button 
                                   className={`btn-${todo.status}`}
                                   onClick={() => saveHandler()}
                              >
                              Edit
                              </button>
                         </div>
                    </div>
               :
               null}
          </div>
     );
}

export default editTaskId;

export async function getServerSideProps({req}){

     const session = await getSession({req});

     return{
          props : {}
     }
}