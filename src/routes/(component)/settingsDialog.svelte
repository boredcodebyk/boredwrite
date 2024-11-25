<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { settingsDialogOpen } from "$lib/store";
  import { Switch } from "$lib/components/ui/switch";
  import { toggleMode, mode, userPrefersMode, setMode } from "mode-watcher";
  import * as Popover from "$lib/components/ui/popover";
  import * as Command from "$lib/components/ui/command";
  import { CaretUpDown, Check } from "phosphor-svelte";
  import { tick } from "svelte";
  import { cn } from "$lib/utils";

  let themeMenuOpen = $state(false);
  let themeMenuTriggerRef = $state<HTMLButtonElement>(null!);

  interface themeType {
    value: "dark" | "light" | "system";
    label: string;
  }

  const theme: themeType[] = [
    {
      value: "light",
      label: "Light",
    },
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "system",
      label: "System",
    },
  ];

  function closeAndFocusTrigger() {
    themeMenuOpen = false;
    tick().then(() => {
      themeMenuTriggerRef.focus();
    });
  }
</script>

<Dialog.Root bind:open={$settingsDialogOpen}>
  <Dialog.Content class="max-w-4xl" preventScroll={false}>
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Dark Mode</Label>
        

        <Popover.Root bind:open={themeMenuOpen}>
          <Popover.Trigger bind:ref={themeMenuTriggerRef}>
            {#snippet child({ props })}
              <Button
                variant="outline"
                class="w-[200px] justify-between"
                {...props}
                role="combobox"
              >
                {theme.filter((value) => value.value === $userPrefersMode)[0][
                  "label"
                ] || "Select theme..."}
                <CaretUpDown class="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            {/snippet}
          </Popover.Trigger>
          <Popover.Content class="w-[200px] p-0">
            <Command.Root>
              <Command.List>
                <Command.Group>
                  {#each theme as t}
                    <Command.Item
                      value={t.value}
                      onSelect={() => {
                        setMode(t.value);
                        closeAndFocusTrigger();
                      }}
                    >
                      <Check
                        class={cn(
                          "mr-2 size-4",
                          theme.filter((value) => value.value === $userPrefersMode)[0][
                  "label"
                ] !== t.value && "text-transparent"
                        )}
                      />
                      {t.label}
                    </Command.Item>
                  {/each}
                </Command.Group>
              </Command.List>
            </Command.Root>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
