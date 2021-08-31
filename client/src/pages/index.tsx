import * as React from "react";
import { Dropzone } from "components/Dropzone";
import { Incoming } from "components/Incoming";

export default function Index() {
  return (
    <div className="flex flex-col">
      <Dropzone />
      <Incoming />
    </div>
  );
}
