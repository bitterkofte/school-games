import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";

const AnimatedNumbers = ({ points }) => {
  const elRef = useRef();
  const previousValueRef = useRef(0); // Track previous value

  useEffect(() => {
    const countUp = new CountUp(elRef.current, points, {
      startVal: previousValueRef.current,
      duration: 1.9,
    });

    if (!countUp.error) {
      countUp.start(() => {
        previousValueRef.current = points; // Update for next animation
      });
    }
  }, [points]);

  return <div ref={elRef} />;
};
export default AnimatedNumbers;
