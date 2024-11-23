<script lang="ts">
  import { redirect } from "@sveltejs/kit";
  import { db, type Note } from "$lib/store";
  import { goto } from "$app/navigation";

  let uuid = crypto.randomUUID();
  let note: Note = {
    id: uuid,
    title: `Title ${uuid.split("-").pop()}`,
    data: "",
    dateCreated: Date.now(),
    dateModified: Date.now(),
  };
  try {
    db.notes
      .add(note)
      .then(() => {
        goto(`/note/${uuid}`, { replaceState: true });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
</script>
