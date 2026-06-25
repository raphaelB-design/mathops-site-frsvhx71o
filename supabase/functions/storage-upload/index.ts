// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
import { randomUUID } from "node:crypto"

export default {
  fetch: withSupabase({ auth: "publishable" }, async (req, { supabase }) => {
    const formData = await req.formData()
    const file = formData.get('file')

    // TODO: update your-bucket to the bucket you want to write files
    const { data, error } = await supabase
      .storage
      .from('Imagens')
      .upload(
        `${file.name}-${randomUUID()}`,
        file,
        { contentType: file.type }
      )

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 },
      );
    }

    return Response.json({ data });
  }),
};