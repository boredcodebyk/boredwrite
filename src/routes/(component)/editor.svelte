<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import { editorComponent } from "$lib/editor";

  import "katex/dist/katex.min.css";
  import { type Note } from "$lib/store";

  let editorElement: HTMLDivElement;
  let editor: Editor;

  let { data }: {  data: Note } = $props();

  onMount(() => {
    editor = editorComponent({editorElement: editorElement, note: data})
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  function handleUndoRedo(e: KeyboardEvent) {
    if (e.key === "z" && e.ctrlKey) {
      e.preventDefault();
      editor.commands.undo();
    }
    if (e.key === "y" && e.ctrlKey) {
      e.preventDefault();
      editor.commands.redo();
    }
    if (e.key === "z" && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      editor.commands.redo();
    }
  }
</script>

<div bind:this={editorElement} class="h-fit w-full"></div>
