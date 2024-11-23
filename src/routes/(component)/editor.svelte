<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import { Paragraph } from "@tiptap/extension-paragraph";
  import Heading from "@tiptap/extension-heading";
  import { Document } from "@tiptap/extension-document";
  import { Text } from "@tiptap/extension-text";
  import { Bold } from "@tiptap/extension-bold";
  import { BulletList } from "@tiptap/extension-bullet-list";
  import { ListItem } from "@tiptap/extension-list-item";
  import { Code } from "@tiptap/extension-code";
  import { Underline } from "@tiptap/extension-underline";
  import { Italic } from "@tiptap/extension-italic";
  import { CharacterCount } from "@tiptap/extension-character-count";
  import { db } from "$lib/store";
  import * as Card from "$lib/components/ui/card";

  let editorElement: HTMLDivElement;
  let editor: Editor;

  let showWordCount = $state(true);

  let { id, value }: { id: string; value: string } = $props();

  onMount(() => {
    editor = new Editor({
      element: editorElement,
      editorProps: {
        attributes: {
          class:
            "prose prose-base sm:prose-sm lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-dvh max-w-none",
        },
      },
      extensions: [
        Document,
        CharacterCount,
        Text,
        Paragraph,
        Heading.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        Bold,
        BulletList,
        Code,
        ListItem,
        Italic,
        Underline,
      ],
      content: value,

      onUpdate: ({ editor }) => {
        db.notes.update(id, {
          data: editor.getHTML(),
          dateModified: Date.now(),
        });
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div bind:this={editorElement} class="h-fit w-full">
  {#if editor}
    {#if showWordCount}
      <Card.Root class="fixed bottom-0 right-0 mx-4 my-2">
        
        <Card.Content>
          <p>{editor.storage.characterCount.words()} words</p>
        </Card.Content>
      </Card.Root>
    {/if}
  {/if}
</div>
