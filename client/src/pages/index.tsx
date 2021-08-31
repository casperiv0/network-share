import * as React from "react";
import Head from "next/head";
import { Dropzone } from "components/Dropzone";
import { Incoming } from "components/Incoming";

export default function Index() {
  return (
    <div className="bg-gray-800 flex flex-col">
      <Head>
        <title>Share files in realtime within the same network</title>
      </Head>

      <Dropzone />
      <Incoming />
    </div>
  );
}
