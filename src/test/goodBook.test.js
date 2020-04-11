import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import GoodBook from "../components/goodBook";

configure({ adapter: new Adapter() });

describe("<Todo />", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(<GoodBook />);
  });

  it("render - snapshot check", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("render", () => {
    expect(wrapper).not.toBeNull();
  });

  it("render input box to search the displayed items", () => {
    const inputButton = wrapper.find("input");
    expect(inputButton.props().className).toBe("ant-input ant-input-lg");
    expect(inputButton.props().type).toBe("text");
    expect(inputButton.props().value).toBe("");
    expect(inputButton.props().placeholder).toBe(
      "Enter item to Search from [Brand - Variety - Style - Country - Stars]"
    );
  });
});
