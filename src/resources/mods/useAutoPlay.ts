import { storeToRefs } from "pinia";
import { CanvasNote } from "../note/store";
import { useGameFieldStore } from "../field/store";
import { wait } from "../../utils/functions/wait";

export const useAutoPlay = () => {
  const { COL_HEIGHT, SCROLL_SPEED } = storeToRefs(useGameFieldStore());

  const hit = async (note: CanvasNote, key: KeyboardEvent["key"]) => {
    await wait((COL_HEIGHT.value - note.y) / SCROLL_SPEED.value);
    document.dispatchEvent(new KeyboardEvent("keydown", { key }));
    await wait(100);
    document.dispatchEvent(new KeyboardEvent("keyup", { key }));
  };

  return { hit };
};
