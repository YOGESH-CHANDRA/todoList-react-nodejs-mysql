import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const [item, setItem] = useState("");

  // Display todolist
  const showTodoItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json(res);
      console.log(data);
      setTodoItems(data);
      console.log(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch and show data from data base at starting of app.
  useEffect(() => {
    showTodoItems();
  }, []);

  const changeHandler = (e) => {
    setItem(e.target.value);
  };

  // add item/task in database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      if (item !== "") {
        let trimItem = item;
        trimItem = trimItem.trim();

        if (trimItem != "") {
          setItem(trimItem);
          let body = { item };
          console.log(body);
          await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        }

        showTodoItems();

        setItem("");
      }
    } catch (error) {
      throw error;
    }
  };

  // delete item/task from database
  const deleteTask = async (id) => {
    try {
      const taskDelete = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      if (taskDelete.status === 200) {
        showTodoItems();
      }
      setTodoItems(
        await todoItems.filter((item, idnx) => {
          return item.id !== id;
        })
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
    {/* Todo list UI */}
      <div className="app">
        <h1>To Do List App</h1>
        <form>
          <label htmlFor="inputTask">Enter the task: </label>
          <input
            type="text"
            name="item"
            value={item}
            id="item"
            placeholder="Get groceries"
            onChange={changeHandler}
          />
          <button onClick={addItem}>Add Task</button>
        </form>
        <div className="todolist">
          {todoItems.map((item, index) => (
            <li className="item" key={index}>
              {item.task}
              <span onClick={() => deleteTask(item.id)}>X</span>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
