import { useEffect , useState } from 'react';
import Tasks from "@/module/Tasks";

const HomePage = () => {

     const [todos , setTodos] = useState([]);

     useEffect(() => {
          fetchTodos()
     }, []);

     const fetchTodos = async () => {
          const res = await fetch("/api/todos");
          const data = await res.json();
          if(data.status === "success") setTodos(data.data.todos)
     }

     return (
          <div className="home-page">
               <div className="home-page--todo">
                    <p>Todo</p>
                    <Tasks tasks={todos.todo} fetchTodos={fetchTodos} next="inProgress"/>
               </div>
               <div className="home-page--inProgress">
                    <p>In Progress</p>
                    <Tasks tasks={todos.inProgress} fetchTodos={fetchTodos} back="todo" next="review"/>
               </div>
               <div className="home-page--review">
                    <p>Review</p>
                    <Tasks tasks={todos.review} fetchTodos={fetchTodos} back="inProgress" next="done"/>
               </div>
               <div className="home-page--done">
                    <p>Done</p>
                    <Tasks tasks={todos.done} fetchTodos={fetchTodos} back="review"/>
               </div>
          </div>
     );
}

export default HomePage;
