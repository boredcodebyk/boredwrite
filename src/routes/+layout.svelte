<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
  import SettingsDialog from "./(component)/settingsDialog.svelte";
  import { toast } from "svelte-sonner";

  let { children } = $props();
  let konamiindex = $state(0);
  function handleKeydown(e: KeyboardEvent) {
    let konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    if (e.key === konamiCode[konamiindex]) {
      konamiindex++;
      if (konamiindex === konamiCode.length) {
		// Secret Feature here
        toast("Voila! Secret Mode");
		console.log("helo there!")
        konamiindex = 0;
      }
    } else {
		konamiindex = 0;
	}
  }
</script>

<SettingsDialog />

<ModeWatcher />
<Toaster />

{@render children()}

<svelte:document onkeydown={handleKeydown} />
