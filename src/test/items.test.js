import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import Items from "../components/items";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });
describe("<Items />", () => {
  let wrapper = null;
  let props = {
    data: [
      {
        completed: false,
        title: "helloworld1",
        id: 1
      }
    ],
    onChange: jest.fn(),
    onEditTodo: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<Items {...props} />);
  });

  it("renders correctly - snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders <Item /> components", () => {
    expect(wrapper).not.toBeNull();
  });

  it("renders check is items are rendered", () => {
    const uiItems = wrapper.find(".ant-list-items");
    const uiItem = uiItems.find(".ant-list-item");
    expect(uiItems.exists()).toBeTruthy();
    expect(uiItem.exists()).toBeTruthy();
    expect(uiItem.find(".ant-checkbox-input").exists()).toBeTruthy();
    expect(uiItem.find(".itemTitle").props().children).toBe(
      props.data[0].title
    );
  });

  it("renders check if onChange is triggered when checkbox is clicked", () => {
    expect(props.onChange).toHaveBeenCalledTimes(0);
    const uiItems = wrapper.find(".ant-list-items");
    const uiItem = uiItems.find(".ant-list-item");
    expect(uiItem.find(".ant-checkbox-input").exists()).toBeTruthy();
    uiItem
      .find(".ant-checkbox-input")
      .simulate("change", { target: { checked: true } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it("renders check if onDelete is triggered when user delete todo item", () => {
    expect(props.onDelete).toHaveBeenCalledTimes(0);
    const deleteButton = `.deleteBtn_1`;
    const uiItems = wrapper.find(".ant-list-items");
    expect(uiItems.find(deleteButton).exists()).toBeTruthy();
    uiItems
      .find(deleteButton)
      .first()
      .simulate("click");
    expect(props.onDelete).toHaveBeenCalledTimes(1);
  });

  it("renders edit button and save the edited change", () => {
    expect(props.onEditTodo).toHaveBeenCalledTimes(0);
    const editButton = `.editBtn_1`;
    const uiItems = wrapper.find(".ant-list-items");
    expect(uiItems.find(editButton).exists()).toBeTruthy();
    uiItems
      .find(editButton)
      .first()
      .simulate("click");
    wrapper.update();
    expect(wrapper.find(".saveBtn_1")).toBeTruthy();
    wrapper
      .find(".saveBtn_1")
      .first()
      .simulate("click");
    expect(props.onEditTodo).toHaveBeenCalledTimes(1);
  });
});
