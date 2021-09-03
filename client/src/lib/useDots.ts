import * as React from "react";

const MAX_LENGTH = 3;

/**
 * @param use whether the hook should be used. Only change state when needed
 */
export function useDots(use: boolean) {
  const [dots, setDots] = React.useState<"."[]>(["."]);

  React.useEffect(() => {
    if (use === false) return;

    const interval = setInterval(() => {
      setDots((p) => {
        if (p.length === MAX_LENGTH) {
          return ["."];
        }

        return [...p, "."];
      });
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, [use]);

  return dots;
}
