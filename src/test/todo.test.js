import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import Todo from "../components/todo";

configure({ adapter: new Adapter() });

describe("<Todo />", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(<Todo />);
  });

  it("renders correctly - snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders <Todo /> components", () => {
    expect(wrapper.find(".todoContainer")).toHaveLength(1);
  });

  it("renders three <PageHeader /> components for Add Item, Todo Item and Completed Item", () => {
    expect(wrapper.find(".site-page-header-ghost-wrapper")).toHaveLength(3);
  });

  it("renders a button to add todo item", () => {
    const addButton = wrapper.find("button");
    expect(addButton.contains(<span>Add</span>)).toBeTruthy();
    expect(addButton.props().className).toBe(
      "ant-btn ant-input-search-button ant-btn-primary ant-btn-lg"
    );
    expect(addButton.props().type).toBe("button");
  });

  it("renders a input box to enter todo item and the value to be empty", () => {
    const inputButton = wrapper.find("input");
    expect(inputButton.props().className).toBe("ant-input ant-input-lg");
    expect(inputButton.props().type).toBe("text");
    expect(inputButton.props().value).toBe("");
  });

  it("renders empty todo item if no value is given to input field", () => {
    const addButton = wrapper.find("button");
    addButton.simulate("click");
    expect(wrapper.find(".ant-list-items").length).toBe(0);
  });
});
