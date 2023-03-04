import React, { useState, useEffect } from "react";
import "../App.css";
import logo from "../images/todo.png";

// to get items from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleButton, setToggleButton] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  // Adding list item
  const addItem = () => {
    if (!inputData) {
      alert("Add task first");
    } else if (inputData && !toggleButton) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      setToggleButton(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  // Deleting a single list
  const removeItem = (index) => {
    const deletedItem = items.filter((element) => {
      return index !== element.id;
    });

    setItems(deletedItem);
  };
  // Deleting all list
  const removeAll = () => {
    setItems([]);
  };

  // update or edit items
  const updateItem = (id) => {
    let newItem = items.find((element) => {
      return element.id === id;
    });
    console.log(newItem);
    setToggleButton(false);
    setInputData(newItem.name);
    setIsEditItem(id);
  };

  // strike out item
  const strikeOutItem = (id) => {
    const newList = items.map((element) => {
      if (element.id === id) {
        return { ...element, isDone: !element.isDone };
      }
      return element;
    });
    setItems(newList);
  };

  // adding data to local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-container">
      <div className="box-container">
        {/* <figure>
          <img src={logo} />
          <figcaption>Add all Your Todo's here</figcaption>
        </figure> */}
        <div className="box">
          <div className="heading">
            <img className="logo" src={logo} alt="logo" />
            <h2>Todo List</h2>
            <div></div>
          </div>
          <div className="input-box eachList">
            <input
              type="text"
              placeholder="Add Items....."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i
                className=" fa-solid fa-plus "
                title="Add item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className=" fa-solid fa-edit "
                title="Update item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachList" key={element.id}>
                  <span
                    className={element.isDone ? "done" : ""}
                    onDoubleClick={() => strikeOutItem(element.id)}
                  >
                    {element.name}
                  </span>
                  <div className="btn-group">
                    <i
                      className="fa-solid fa-edit"
                      title="Edit"
                      onClick={() => updateItem(element.id)}
                    ></i>
                    <i
                      className=" fa-solid fa-trash "
                      title="Delete"
                      onClick={() => removeItem(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}

            <button className="clear-btn" onClick={removeAll}>
              <span> Clear All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
