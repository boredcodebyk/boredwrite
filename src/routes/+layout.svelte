<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
	import {
	 Button,
	 buttonVariants
	} from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	import { settingsDialogOpen } from "$lib/store";

	let { children } = $props();

   </script>
	
   <Dialog.Root bind:open={$settingsDialogOpen}>
	
	<Dialog.Content class="w-96" preventScroll={false}>
	 <Dialog.Header>
	  <Dialog.Title>Edit profile</Dialog.Title>
	  <Dialog.Description>
	   Make changes to your profile here. Click save when you're done.
	  </Dialog.Description>
	 </Dialog.Header>
	 <div class="grid gap-4 py-4">
	  <div class="grid grid-cols-4 items-center gap-4">
	   <Label for="name" class="text-right">Name</Label>
	   <Input id="name" value="Pedro Duarte" class="col-span-3" />
	  </div>
	  <div class="grid grid-cols-4 items-center gap-4">
	   <Label for="username" class="text-right">Username</Label>
	   <Input id="username" value="@peduarte" class="col-span-3" />
	  </div>
	 </div>
	 <Dialog.Footer>
	  <Button type="submit">Save changes</Button>
	 </Dialog.Footer>
	</Dialog.Content>
   </Dialog.Root>

<ModeWatcher/>
<Toaster/>

{@render children()}
