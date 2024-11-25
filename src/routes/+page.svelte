<script lang="ts">
  import { db, settingsDialogOpen } from "$lib/store";
  import { liveQuery } from "dexie";
  import { Sun, Moon, Gear } from "phosphor-svelte";
  import * as Table from "$lib/components/ui/table";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { DotsThree } from "phosphor-svelte";
  import { goto } from "$app/navigation";
  import { toggleMode } from "mode-watcher";
  import * as Command from "$lib/components/ui/command";

  let open = $state(false);
  let isDeleteConfirmBoxOpen = $state(false);
  let notes = $state(
    liveQuery(async () => {
      return await db.notes.toArray();
    })
  );

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:head>
  <title>home - boredwrite</title>
</svelte:head>

<div class="mx-24 my-12 flex flex-col">
  <h1 class="text-6xl py-4 px-2">Home</h1>
  <Button href="/new">New</Button>
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Title</Table.Head>
        <Table.Head>Date Modified</Table.Head>
        <Table.Head>Date Created</Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $notes as note (note.id)}
        <Table.Row
          onclick={() => goto(`/note/${note.id}`)}
          class="cursor-pointer"
        >
          <Table.Cell>{note.title}</Table.Cell>
          <Table.Cell>{new Date(note.dateModified).toLocaleString()}</Table.Cell
          >
          <Table.Cell>{new Date(note.dateCreated).toLocaleString()}</Table.Cell>
          <Table.Cell>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size="icon" class="relative size-8 p-0">
                  <span class="sr-only">Open menu</span>
                  <DotsThree class="size-4" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
                  <DropdownMenu.Item
                    onclick={() => goto(`/note/${note.id}`)}
                    class="cursor-pointer">Edit</DropdownMenu.Item
                  >
                  <!-- <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(note.id)}>
                  Copy payment ID
                </DropdownMenu.Item> -->
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onclick={() => (isDeleteConfirmBoxOpen = true)}
                  class="cursor-pointer">Delete</DropdownMenu.Item
                >
                <!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Table.Cell>
        </Table.Row>

        <AlertDialog.Root bind:open={isDeleteConfirmBoxOpen}>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This action cannot be undone. This will permanently delete your
                note from the local database.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
              <AlertDialog.Action
                onclick={async () => {
                  await db.notes.delete(note.id);
                  isDeleteConfirmBoxOpen = false;
                }}>Continue</AlertDialog.Action
              >
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      {:else}
        <Table.Row>
          <Table.Cell colspan={24} class="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>

  <Command.Dialog bind:open>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Theme">
        <Command.Item
          onclick={() => {
            toggleMode();
            open = false;
          }}
        >
          <Sun class="dark:scale-0 scale-100" />
          <Moon class="absolute dark:scale-100 scale-0" />
          <span>Toggle Theme</span>
        </Command.Item>
        <Command.Item
          onclick={() => {
            $settingsDialogOpen = true;
            open = false;
          }}
        >
          <Gear />
          <span>Settings</span>
        </Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Dialog>
</div>

<svelte:document onkeydown={handleKeydown} />
