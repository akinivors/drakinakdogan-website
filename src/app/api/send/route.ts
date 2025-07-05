import { Resend } from 'resend';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient'; // Import our new Supabase client

const resend = new Resend(process.env.RESEND_API_KEY);

// The validation schema remains the same
const sendEmailSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçersiz e-posta adresi." }),
  phone: z.string().min(10, { message: "Telefon numarası en az 10 karakter olmalıdır."}),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = sendEmailSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.format() }), { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;

    // --- Step 1: Send the email with Resend (as before) ---
    const { data, error: resendError } = await resend.emails.send({
      from: 'İletişim Formu <iletisim@draysinakdogan.com>',
      to: 'aysinakdogan@draysinakdogan.com',
      replyTo: email,
      subject: `Yeni Mesaj: ${name} - drakinakdogan.com`,
      html: `<p><strong>Gönderen:</strong> ${name}</p><p><strong>E-posta:</strong> ${email}</p><p><strong>Telefon:</strong> ${phone}</p><p><strong>Mesaj:</strong></p><p>${message}</p>`,
    });

    if (resendError) {
      return new Response(JSON.stringify({ error: resendError.message }), { status: 500 });
    }

    // --- Step 2: Save the message to Supabase (NEW) ---
    const { error: supabaseError } = await supabase
      .from('messages') // The name of our table
      .insert({ 
        name: name, 
        email: email, 
        phone: phone, 
        message: message 
      });

    // If there was an error saving to the database, log it on the server
    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      // We don't return an error to the user because the email was already sent successfully.
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Bir hata oluştu.' }), { status: 500 });
  }
} 