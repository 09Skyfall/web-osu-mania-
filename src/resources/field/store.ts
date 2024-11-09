import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useResize } from "../../composables/useResize";
import { useSettingsStore } from "../settings/store";

export enum GAME_STATE {
  PAUSED = "PAUSED",
  RUNNING = "RUNNING",
  GAME_OVER = "GAME_OVER",
}

export const useGameFieldStore = defineStore("game-field", () => {
  const { borderBoxBlock: screenHeight } = useResize(window.document.documentElement);
  const { SCROLL_SPEED } = storeToRefs(useSettingsStore());

  const HIT_KEY_HEIGHT = ref(100); // px
  const COL_HEIGHT = computed(() => screenHeight.value - HIT_KEY_HEIGHT.value); // px
  const COL_WIDTH = ref(100); // px
  const DURATION = computed(() => COL_HEIGHT.value / SCROLL_SPEED.value); // ms

  const gameState = ref<GAME_STATE>(GAME_STATE.RUNNING);

  return {
    HIT_KEY_HEIGHT,
    COL_HEIGHT,
    COL_WIDTH,
    DURATION,
    gameState,
  };
});
