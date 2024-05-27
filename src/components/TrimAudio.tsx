"use client";
import {
  Box,
  Button,
  Divider,
  Group,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faVolumeOff,
  faScissors,
  faDownload,
  faBackward,
  faForward,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faGear,
} from "@fortawesome/free-solid-svg-icons";


const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#ccc",
  progressColor: "#0178ff",
  cursorColor: "transparent",
  responsive: true,
  height: 80,
  normalize: true,
  backend: "WebAudio",
  barWidth: 2,
  barGap: 3,
});

const formatTime = (seconds: any) => {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 8);
};

const TrimAudio = () => {
  const waveformRef = useRef<any>(null);
  const wavesurfer = useRef<any>(null);
  const [playing, setP1aying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");
  const [zoom, setZoom] = useState(20);
  const [startSeconds, setStartSeconds] = useState<any>();
  const [startMinutes, setStartMinutes] = useState<any>();
  const [currentSeconds, setCurrentSeconds] = useState<any>();
  const [currentMinutes, setCurrentMinutes] = useState<any>();

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options as WaveSurferOptions);
   //  wavesurfer.current.load(audioFileURL);

    wavesurfer.current.on("ready", () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      const date = new Date(0);
      date.setSeconds(wavesurfer.current.getDuration());
      setStartMinutes(date.getMinutes() - new Date(0).getMinutes());
      setStartSeconds(date.getSeconds() - new Date(0).getSeconds());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
      const date = new Date(0);
      date.setSeconds(wavesurfer.current.getCurrentTime());
      setCurrentMinutes(date.getMinutes() - new Date(0).getMinutes());
      setCurrentSeconds(date.getSeconds() - new Date(0).getSeconds());
    });

    return () => {
      wavesurfer.current.un("audioprocess");
      wavesurfer.current.un("ready");
      wavesurfer.current.destroy();
    };
  }, []);

  const handlePlayPause = () => {
    setP1aying((prev) => !prev);
    wavesurfer.current.playPause();
  };

  const handleZoom = (e: any) => {
    setZoom(e);
    wavesurfer.current.zoom(e);
  };

  const moveBackward = () => {
    let secondsToSet = wavesurfer.current.getCurrentTime() - 5;

    if (secondsToSet / duration < 0) {
      secondsToSet = 0;
    }
    wavesurfer.current.seekTo(secondsToSet / duration);
  };

  const moveForward = () => {
    let secondsToSet = wavesurfer.current.getCurrentTime() + 5;
    if (secondsToSet / duration > 1) {
      secondsToSet = duration;
    }
    wavesurfer.current.seekTo(secondsToSet / duration);
  };

  const downloadFile = () => {
    const a = document.createElement("a");
   //  a.href = audioFileURL;
    a.download = "song";
    a.click();
  };

  return (
    <Stack className="w-[calc(100vw-70px)] px-5">
      <Group justify="space-between" w={"100%"}>
        <Group>
          <Button variant="subtle" color="black" className="">
            <FontAwesomeIcon icon={faScissors} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Text className="">Split</Text>
          </Button>
          <Button variant="subtle" color="black" onClick={downloadFile}>
            Download Section
          </Button>
        </Group>
        <Group>
          <Button variant="subtle" color="black" onClick={moveBackward}>
            <FontAwesomeIcon icon={faBackward} />
          </Button>
          <Button variant="subtle" color="black" onClick={handlePlayPause}>
            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
          </Button>
          <Button variant="subtle" color="black" onClick={moveForward}>
            <FontAwesomeIcon icon={faForward} />
          </Button>
          <Text>
            {currentMinutes}:{currentSeconds} / {startMinutes}:{startSeconds}
          </Text>
        </Group>
        <Group>
          <Button
            variant="subtle"
            color="black"
            onClick={() => {
              {
                zoom >= 5 ? setZoom((prev) => prev - 5) : setZoom(0);
                wavesurfer.current.zoom(zoom);
              }
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          </Button>
          <Slider
            w={100}
            color="#5966ec"
            value={zoom}
            onChange={(e) => {
              console.log(e);
              handleZoom(e);
            }}
          />
          <Button
            variant="subtle"
            color="black"
            onClick={() => {
              zoom <= 95 ? setZoom((prev) => prev + 5) : setZoom(100);
              wavesurfer.current.zoom(zoom);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </Button>
          <Button
            variant="subtle"
            color="black"
            onClick={() => {
              setZoom(0);
              wavesurfer.current.zoom(0);
            }}
          >
            Fit
          </Button>
          <Divider orientation="vertical" my={"md"} color="gray" h={"30px"} />
          <Button variant="subtle" color="black">
            <FontAwesomeIcon icon={faGear} />
          </Button>
        </Group>
      </Group>
      <Box ref={waveformRef} />
    </Stack>
  );
};

export default TrimAudio;
