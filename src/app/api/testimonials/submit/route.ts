// Path: src/app/api/testimonials/submit/route.ts

import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';

// 1. Define the validation schema for a testimonial
const testimonialSchema = z.object({
  author: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  quote: z.string().min(10, { message: "Yorum en az 10 karakter olmalıdır." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);

    // 2. Validate the incoming data
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.format() }), { status: 400 });
    }

    const { author, quote } = parsed.data;

    // 3. Insert the validated data into the 'testimonials' table
    const { error: supabaseError } = await supabase
      .from('testimonials')
      .insert({ 
        author: author, 
        quote: quote,
        // is_approved defaults to 'false' in the database, so we don't need to set it here.
      });

    // 4. Handle any database errors
    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      return new Response(JSON.stringify({ error: 'Veritabanına kaydedilirken bir hata oluştu.' }), { status: 500 });
    }

    // 5. Return a success response
    return new Response(JSON.stringify({ message: 'Yorum başarıyla gönderildi.' }), { status: 200 });

  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: 'Bir hata oluştu.' }), { status: 500 });
  }
}