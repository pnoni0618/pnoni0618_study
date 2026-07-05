import Viewer from "./viewer";
import Controller from "./controller";

export default function CounterPage() {
  return (
    <div className="p-10 gap-6 flex ">
      <Viewer />
      <Controller />
    </div>
  );
}
