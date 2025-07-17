import type { NextPage } from "next";
import SimpleButton from "@/components/SimpleButton";

const HelloWorld: NextPage = () => {
  const count = 100;

  const hundleOnClick = () => {
    console.log("Clicked from Hello_World");
  };

  return (
    <>
      <h1>title</h1>
      <p>helloworld {count}</p>
      <SimpleButton text={"From HelloWorld"} onClick={hundleOnClick} />
    </>
  );
};

export default HelloWorld;
