import { useState, useEffect } from "react";
import FormInput from "@/module/FormInput";
import RadioButton from "@/element/RadioButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import Textarea from "@/module/Textarea";

const AddTodoPages = () => {
  const [state, setAllState] = useState({
    title: "",
    status: "todo",
    description: "",
  });

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: state.title, status: state.status , description : state.description}),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data)
    if (data.status === "success") {
      setAllState({
        ...state,
        title: "",
        status: "todos",
      });
      toast.success("Todo added!");
    }
  };

  return (
    <div className="add-form">
      <h3>
        <GrAddCircle />
        Add New Todo
      </h3>
      <div className="add-form__form">
        <div className="add-form__input--first">
          <FormInput
            type="text"
            label="Title"
            name="title"
            placeholder="Write a title"
            value={state.title}
            onChange={(e) =>
              setAllState({ ...state, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="add-form__input--first">
          <FormInput
              label="Description"
              name="description"
              type="text"
              value={state.description}
              onChange={(e) => {setAllState({
                ...state,
                description : e.target.value
              })}}
              placeholder="write description"
            />
        </div>

        <div className="add-form__input--second">
          <RadioButton
            title="Todo"
            value="todo"
            state={state}
            setAllState={setAllState}
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            title="In Progress"
            value="inProgress"
            state={state}
            setAllState={setAllState}
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            title="Review"
            value="review"
            state={state}
            setAllState={setAllState}
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            title="Done"
            value="done"
            state={state}
            setAllState={setAllState}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoPages;
