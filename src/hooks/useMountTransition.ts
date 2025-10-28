import { getCSSVariable } from "@/utils/getCSSVariable";
import { useEffect, useState } from "react";

const DEFAULT_DURATION = getCSSVariable("--transition-duration-default") || 300;

interface useMountTransitionProps {
  isMounted: boolean;
  unMountDelay?: number;
}

export const useMountTransition = ({ isMounted, unMountDelay = DEFAULT_DURATION }: useMountTransitionProps) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState<boolean>(false); //indicates whether the component is in "transition in" (visible and animated) state, used to control rendering and css animations

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>; //declares a timeoudId variable that stores timeout identifier returned by setTimeout

    if (isMounted && !hasTransitionedIn) {
      //checks if the modal is opened but it's not in 'transition in' state yet (it's not fully visible yet)
      setHasTransitionedIn(true); //if it's true the function setHasTransitionedIn state is set to true
    } else if (!isMounted && hasTransitionedIn) {
      //checks if the modal is not visible and is closed but it's in 'transition out' state
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unMountDelay); //sets the timeout that after unMountDelay milliseconds will set hasTransitionedIn to false, timeoutId stores the identifier of setTimeout in order to clear it later
    }

    return () => {
      //clean-up function that stop setTimeout
      clearTimeout(timeoutId);
    };
  }, [unMountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};
