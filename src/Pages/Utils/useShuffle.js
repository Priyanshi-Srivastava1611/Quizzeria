import { useState } from "react";
import React from "react";

const useShuffle = () => {
  const getLetter = (number) => {
    let letter;

    switch (number) {
      case 0:
        letter = "A.";
        break;
      case 1:
        letter = "B.";
        break;
      case 2:
        letter = "C.";
        break;
      case 3:
        letter = "D.";
        break;
      default:
        letter = null;
        break;
    }

    return letter;
  };
  const shuffle = (array) => {
    array = [...array];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };
  const timeConverter = (milliseconds) => {
    if (
      milliseconds === null ||
      milliseconds === undefined ||
      typeof milliseconds !== "number"
    ) {
      return null;
    }
    const hours = `0${Math.floor(milliseconds / 3600000)}`.slice(-2);
    const minutes = `0${Math.floor((milliseconds / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((milliseconds / 1000) % 60) % 60}`.slice(-2);

    return {
      hours,
      minutes,
      seconds,
    };
  };
  return {
    shuffle,
    getLetter,
    timeConverter,
  };
};

export default useShuffle;
