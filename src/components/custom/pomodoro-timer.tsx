import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

function PomodoroTimer() {
  const [time, setTime] = useState<number>(25 * 60);
  const [isStartTimer, setIsStartTimer] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<string>("pomodoro");

  function formatTime() {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  function toggleTimer() {
    setIsStartTimer(!isStartTimer);
  }

  function setTimer(type: string) {
    setCurrentType(type);
    switch (type) {
      case "pomodoro": {
        setTime(25 * 60);
        break;
      }
      case "shortBreak": {
        setTime(5 * 60);
        break;
      }
      case "longBreak": {
        setTime(15 * 60);
        break;
      }
      default: {
        setTime(25 * 60);
      }
    }
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isStartTimer && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      const alarmSound = new Audio("src/assets/alarm.mp3");
      alarmSound.play();

      setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }, 5000);

      setIsStartTimer(false);
      setTimer(currentType);
    }

    return () => clearInterval(timer);
  }, [currentType, isStartTimer, time]);

  return (
    <Card className="w-[30em] p-4">
      <CardContent>
        <div className="flex flex-row justify-evenly gap-2">
          <Button variant="ghost" onClick={() => setTimer("pomodoro")}>
            Pomodoro
          </Button>
          <Button variant="ghost" onClick={() => setTimer("shortBreak")}>
            Short Break
          </Button>
          <Button variant="ghost" onClick={() => setTimer("longBreak")}>
            Long Break
          </Button>
        </div>
        <div className="text-center">
          <p className="text-[100px]">{formatTime()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-2 justify-center">
        {!isStartTimer ? (
          <Button className="w-20" onClick={toggleTimer} variant="outline">
            Start
          </Button>
        ) : (
          <Button className="w-20" onClick={toggleTimer} variant="outline">
            Stop
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTimer(currentType)}
        >
          <RotateCcw className="h-[20px] w-[20px]" />
        </Button>
      </CardFooter>
    </Card>
  );
}
export default PomodoroTimer;
