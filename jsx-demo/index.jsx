import { render, FlexibleSize } from "scriptable-jsx";
import { Comp1 } from "./comp1";

const widget = new ListWidget();

render(
  <>
    <stack size={new FlexibleSize(100, 20)}>
      <text>Hello</text>
      <spacer length={50}></spacer>
      <text>World</text>
    </stack>
    <stack size={new FlexibleSize(100, 20)}>
      <text>123</text>
    </stack>
    <stack size={new FlexibleSize(100, 10)}>
      <date date={new Date()} applyTimeStyle></date>
    </stack>
    <Comp1 />
  </>,
  widget
);

widget.presentMedium();
