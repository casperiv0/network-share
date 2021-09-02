import * as React from "react";
import Head from "next/head";
import { Dropzone } from "components/Dropzone";
import { Incoming } from "components/Incoming";
import { socket } from "lib/socket";
import { Events } from "types/Events";

export default function Index() {
  const [state, setState] = React.useState<"error" | null>(null);
  const [users, setUsers] = React.useState<number | null>(null);
  const usersText = users === 1 ? "user" : "users";

  React.useEffect(() => {
    socket.emit(Events.USER_JOIN);
  }, []);

  React.useEffect(() => {
    const usersHandler = (users: number) => {
      setUsers(users);
    };

    const errorHandler = () => setState("error");
    const connectHandler = () => setState(null);

    socket.on(Events.USER_JOIN, usersHandler);
    socket.on("connect_error", errorHandler);

    socket.on("connect", connectHandler);

    return () => {
      socket.off(Events.USER_JOIN, usersHandler);
      socket.off("connect_error", errorHandler);
      socket.off("connect", connectHandler);
    };
  }, []);

  return (
    <div className="bg-gray-800 flex flex-col">
      <Head>
        <title>Share files in realtime within the same network</title>
      </Head>

      {state === "error" ? (
        <div className="h-screen w-full flex items-center justify-center p-2">
          <p className="text-white font-bold text-center">
            An error occurred connecting to the socket. Please try again later.
          </p>
        </div>
      ) : (
        <>
          <Dropzone />
          <Incoming />

          <div className="absolute top-2 left-2 text-white font-medium">
            {users} {usersText} connected
          </div>
        </>
      )}
    </div>
  );
}
