<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { liveQuery } from "dexie";
  import Editor from "../../(component)/editor.svelte";
  import { db, settingsDialogOpen } from "$lib/store";
  import { House, Sun, Moon } from "phosphor-svelte";
  import { goto } from "$app/navigation";
  import { toggleMode } from "mode-watcher";

  let open = $state(false);

  let { data } = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }

  let note = $derived(liveQuery(async () => {
    return await db.notes.where('id').equals(data.id).toArray();
  }))
  
  async function updateTitle(e: Event) {
    let newTitle = (e.target as HTMLInputElement).value
    await db.notes.update(data.id, {title: newTitle, dateModified: Date.now()})
  }
</script>



{#each $note as item}

  <title>{item.title} - boredwrite</title>

    <div class="h-dvh mx-12 my-6">
      <input
        bind:value={item.title}
        oninput={(e)=>updateTitle(e)}
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        class="prose prose-base text-4xl mx-4 text-current bg-transparent outline-none"
      />
      <Editor id={data.id} value={item.data} />
    
      <Command.Dialog bind:open>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Navigate">
            <Command.Item onclick={()=>{goto('/'); open = false;}}>
              <House/>
              <span>Home</span>
            </Command.Item>
            <Command.Item onclick={()=> {toggleMode(); open = false;}}>
              <Sun class="dark:scale-0 scale-100"/>
              <Moon class="absolute dark:scale-100 scale-0"/>
              <span>Toggle Theme</span>
            </Command.Item>
            <Command.Item>Calculator</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>
{/each}
<svelte:document onkeydown={handleKeydown} />
