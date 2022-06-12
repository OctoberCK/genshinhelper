import { FlexibleSize } from "scriptable-jsx";

export function Comp1() {
  return (
    <stack
      size={new FlexibleSize(100, 50)}
      backgroundColor={new Color("#ff0000")}
    >
      <text>456</text>
    </stack>
  );
}
