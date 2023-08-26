<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <Toolbar :tool-list="toolList" :t="(s: string)=> s"></Toolbar>
  <Icon name="ele-ArrowUp" />
</template>

<script setup lang="tsx">
import { ref } from "vue";
import Icon from "./components/icon.vue";
import Toolbar from "./components/toolbar.vue";





const toolList = ref([
  {
    icon: "ele-Help",
    name: "help",
    function: () => console.log("help"),
  },
  {
    icon: "ele-Delete",
    name: "delete",
    function: () => console.log("delete"),
  },
  {
    icon: "ele-Refresh",
    name: "restore",
    function: () => console.log("restore"),
  },
  {
    icon: "fa-regular fa-floppy-disk",
    name: "save",
    function: () => console.log("save"),
  },
  {
    icon: "ele-CopyDocument",
    name: "copy",
    // function: () => {
    //   useClipboard().copy(JSON.stringify(model.value));
    //   toast.success($lt("success"), $lt("copied"));
    // },
  },
  {
    icon: "ele-Upload",
    name: "upload",
    function: () => console.log("upload"),
  },
  {
    icon: "ele-Download",
    name: "download",
    function: () => console.log("download"),
  },
  {
    icon: "ele-RefreshRight",
    name: "redo",
    function: () => console.log("redo"),
  },
  {
    icon: "ele-RefreshLeft",
    name: "undo",
    function: () => {
      console.log("undo")
    },
  },
  {
    icon: "ele-FullScreen",
    name: "fullscreen",
    // function: () => {
    //   isFullScreen.value = !isFullScreen.value;
    //   const selected: any = toolList.value.find(
    //     (obj) => obj.name === "fullscreen" || obj.name === "minimize"
    //   );
    //   selected.icon =
    //     selected.icon === "ele-FullScreen" ? "ele-Rank" : "ele-FullScreen";
    //   selected.name =
    //     selected.name === "fullscreen" ? "minimize" : "fullscreen";
    // },
  },
]);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
