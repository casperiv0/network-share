import * as React from "react";
import Head from "next/head";
import { Dropzone } from "components/Dropzone";
import { Incoming } from "components/Incoming";
import { socket } from "lib/socket";
import { Events } from "types/Events";

export default function Index() {
  const [users, setUsers] = React.useState<number | null>(null);
  const usersText = users === 1 ? "user" : "users";

  React.useEffect(() => {
    socket.emit(Events.USER_JOIN);
  }, []);

  React.useEffect(() => {
    const handler = (users: number) => {
      setUsers(users);
    };

    socket.on(Events.USER_JOIN, handler);

    return () => {
      socket.off(Events.USER_JOIN, handler);
    };
  }, []);

  return (
    <div className="bg-gray-800 flex flex-col">
      <Head>
        <title>Share files in realtime within the same network</title>
      </Head>

      <Dropzone />
      <Incoming />

      <div className="absolute top-2 left-2 text-white font-medium">
        {users} {usersText} connected
      </div>
    </div>
  );
}
