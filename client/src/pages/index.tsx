import * as React from "react";
import { Dropzone } from "components/Sharing/Dropzone";
import { Incoming } from "components/Sharing/Incoming";

export default function Index() {
  return (
    <div className="flex flex-col">
      <Dropzone />
      <Incoming />
    </div>
  );
}
