<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import { Paragraph } from "@tiptap/extension-paragraph";
  import Heading from "@tiptap/extension-heading";
  import { Document } from "@tiptap/extension-document";
  import { Text } from "@tiptap/extension-text";
  import { Bold } from "@tiptap/extension-bold";
  import { BulletList } from "@tiptap/extension-bullet-list";
  import { OrderedList } from "@tiptap/extension-ordered-list";
  import { ListItem } from "@tiptap/extension-list-item";
  import { Code } from "@tiptap/extension-code";
  import { Underline } from "@tiptap/extension-underline";
  import { Italic } from "@tiptap/extension-italic";
  import { Link } from "@tiptap/extension-link";
  import { Highlight } from "@tiptap/extension-highlight";
  import { Strike } from "@tiptap/extension-strike";
  import { Subscript } from "@tiptap/extension-subscript";
  import { Superscript } from "@tiptap/extension-superscript";
  import { History } from "@tiptap/extension-history";
  import { CharacterCount } from "@tiptap/extension-character-count";
  import { Placeholder } from "@tiptap/extension-placeholder";

  import { MathExtension } from "@aarkue/tiptap-math-extension";

  import "katex/dist/katex.min.css";
  import { db } from "$lib/store";
  import * as Card from "$lib/components/ui/card";
  import { toast } from "svelte-sonner";

  let editorElement: HTMLDivElement;
  let editor: Editor;

  let { id, value }: { id: string; value: string } = $props();

  onMount(() => {
    editor = new Editor({
      element: editorElement,
      editorProps: {
        attributes: {
          class:
            "prose prose-base sm:prose-sm lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-dvh max-w-none text-current prose-headings:text-current pb-72",
        },
      },
      extensions: [
        Document,
        CharacterCount,
        MathExtension.configure({ evaluation: true }),
        History,
        Text,
        Paragraph,
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        Bold,
        BulletList,
        OrderedList,
        Code,
        ListItem,
        Italic,
        Underline,
        Link,
        Highlight,
        Strike,
        Subscript,
        Superscript,
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "What's the title?...";
            }
            return "It's your canvas...";
          },
        }),
      ],
      content: value,

      onUpdate: ({ editor }) => {
        db.notes.update(id, {
          data: editor.getHTML(),
          dateModified: Date.now(),
        });
        toast(`${editor.storage.characterCount.words()} words`, {
          duration: Infinity,
          dismissable: true,
        });
      },
    });
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
