import React, { useReducer, useEffect, useState } from "react";
import todoReducer from "../reducer/todoReducer";
import { GETALL, ADD, MarkComplete, EDIT, Delete } from "../utils/action";
import Items from "./items";
import { PageHeader, Input, Empty, notification } from "antd";

function Todo() {
  const { Search } = Input;
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch({ type: GETALL, payload: {} });
    renderNotification(
      "success",
      "VivritiCapital - Todo App",
      "Todo App loaded - With previous state.! Through localstorage"
    );
    return () => {
      notification.destroy();
    };
  }, []);

  const onAdditem = value => {
    if (value) {
      const payload = buildItem(value);
      setValue("");
      dispatch({ type: ADD, payload });
      renderNotification(
        "success",
        "VivritiCapital - Todo App",
        "Item Added to Tobo Container"
      );
    } else {
      renderNotification(
        "error",
        "VivritiCapital - Todo App",
        "Enter item in todo input to add the todo. Empty Todo is not allowed"
      );
    }
  };

  const renderNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

  const onAddItemChange = ({ currentTarget }) => {
    setValue(currentTarget.value);
  };

  const onMarkTodo = id => {
    dispatch({ type: MarkComplete, payload: { id } });
    renderNotification(
      "info",
      "VivritiCapital - Todo App",
      "Item marked as complete.! Check in completed items.!"
    );
  };

  const buildItem = title => {
    const lastTodoItem = todos.length ? todos[todos.length - 1] : 0;
    return {
      completed: false,
      title,
      id: lastTodoItem === 0 ? 1 : lastTodoItem.id + 1
    };
  };

  const onEditTodo = payload => {
    dispatch({ type: EDIT, payload });
    renderNotification(
      "success",
      "VivritiCapital - Todo App",
      "Todo Item updated successfully.!"
    );
  };

  const onDelete = id => {
    dispatch({ type: Delete, payload: { id } });
    renderNotification(
      "success",
      "VivritiCapital - Todo App",
      "Todo item delete successfully.!"
    );
  };

  return (
    <div className="container todoContainer">
      <div className="site-page-header-ghost-wrapper addItemContainer">
        <PageHeader ghost={false} title="Add Item" subTitle="Add items to Todo">
          <Search
            placeholder="Enter item for TODO"
            enterButton="Add"
            size="large"
            value={value}
            onChange={onAddItemChange}
            onSearch={onAdditem}
          />
        </PageHeader>
      </div>

      <div className="site-page-header-ghost-wrapper todoItemConteiner">
        <PageHeader
          ghost={false}
          title="Todo Items"
          subTitle="List of TODO items"
        >
          {todos && todos.length ? (
            <Items
              onEditTodo={onEditTodo}
              onDelete={onDelete}
              onChange={onMarkTodo}
              data={todos.filter(to => !to.completed)}
            ></Items>
          ) : (
            <Empty />
          )}
        </PageHeader>
      </div>

      <div className="site-page-header-ghost-wrapper completedItemContainer">
        <PageHeader
          ghost={false}
          title="Completed Items"
          subTitle="List of Completed items"
        >
          {todos && todos.length ? (
            <Items
              onDelete={onDelete}
              data={todos.filter(to => to.completed)}
            ></Items>
          ) : (
            <Empty />
          )}
        </PageHeader>
      </div>
    </div>
  );
}

export default Todo;
