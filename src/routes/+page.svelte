<script lang="ts">
  import { db } from "$lib/store";
  import { liveQuery } from "dexie";
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { DotsThree } from "phosphor-svelte";
  import { goto } from "$app/navigation";
  let notes = $state(
    liveQuery(async () => {
      return await db.notes.toArray();
    })
  );
</script>
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
      <Table.Row>
        <Table.Cell>{note.title}</Table.Cell>
        <Table.Cell>{new Date(note.dateModified).toLocaleString()}</Table.Cell>
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
                <DropdownMenu.Item onclick={() => goto(`/note/${note.id}`)}
                  >Edit</DropdownMenu.Item
                >
                <!-- <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(note.id)}>
                  Copy payment ID
                </DropdownMenu.Item> -->
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>View customer</DropdownMenu.Item>
              <DropdownMenu.Item>View payment details</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row>
    {:else}
      <Table.Row>
        <Table.Cell colspan={24} class="h-24 text-center">
          No results.
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>

</div>