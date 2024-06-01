import { Howl, Howler } from "howler";
import { useEffect, useState, useRef } from "react";
import buyingSFX from "../../assets/audio/Buying Sound Effect.mp3";
import lemonSFX from "../../assets/audio/lemon (edited).mp3";

function Achievements() {
    function playAudio(audio) {
        audio.play();
    }
    return (
        <>
            <Achievement
                name={"You Played!"}
                image={"fakeurl"}
                key={"You Played"}
                description={"something"}
            ></Achievement>
        </>
    );
}

export default Achievements;
