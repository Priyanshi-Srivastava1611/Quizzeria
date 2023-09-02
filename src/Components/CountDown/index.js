import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Dialog } from "@mui/material";
import Swal from "sweetalert2";

import useShuffle from "../../Pages/Utils/useShuffle";

const Countdown = ({ countdownTime, timeOver }) => {
  const totalTime = countdownTime * 1000;
  const { timeConverter } = useShuffle();
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          title: `Your Time's Up`,
          icon: "info",
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, [timerTime]);

  return (
    <Button.Group size="massive" basic floated="right">
      <Dialog
        className="ui active button"
        content="Hours"
        trigger={<Button active>{hours}</Button>}
        position="bottom left"
      />
      <Dialog
        className="ui active button"
        content="Minutes"
        trigger={<Button active>{minutes}</Button>}
        position="bottom left"
      />
      <Dialog
        className="ui active button"
        content="Seconds"
        trigger={<Button active>{seconds}</Button>}
        position="bottom left"
      />
    </Button.Group>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
