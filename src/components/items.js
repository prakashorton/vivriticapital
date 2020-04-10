import React, { useState } from "react";
import { List, Checkbox, Button, Input } from "antd";
import PropTypes from "prop-types";

function Items({ data, onChange, onEditTodo, onDelete }) {
  const [editModeInfo, setEditModeInfo] = useState({});
  const [value, setInput] = useState({});

  const onEditOrSave = (id, isEditMode) => {
    if (isEditMode) {
      setEditModeInfo({ id, isEditmode: true });
    } else {
      setEditModeInfo({});
      onEditTodo({ id, title: value, completed: false });
    }
  };

  const onChangeInputOnEditMode = event => {
    setInput(event.currentTarget.value);
  };

  return (
    <List
      size="large"
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <div className="pull-left">
            <Checkbox
              disabled={item.completed ? true : false}
              checked={item.completed ? true : false}
              onChange={() => {
                onChange(item.id);
              }}
            ></Checkbox>
          </div>
          <div style={{ width: "75%" }}>
            {editModeInfo.isEditmode && editModeInfo.id === item.id ? (
              <Input
                defaultValue={item.title}
                onChange={onChangeInputOnEditMode}
              />
            ) : (
              <p>
                {item.completed ? <strike>{item.title}</strike> : item.title}
              </p>
            )}
          </div>
          <div className="pull-right">
            {!item.completed &&
              (editModeInfo.isEditmode && editModeInfo.id === item.id ? (
                <Button
                  onClick={() => {
                    onEditOrSave(item.id, false);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    onEditOrSave(item.id, true);
                  }}
                >
                  Edit
                </Button>
              ))}
            <Button
              onClick={() => {
                onDelete(item.id);
              }}
              type="primary"
              danger
            >
              Delete
            </Button>
          </div>
        </List.Item>
      )}
    />
  );
}

Items.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onEditTodo: PropTypes.func,
  onDelete: PropTypes.func.isRequired
};

export default Items;
