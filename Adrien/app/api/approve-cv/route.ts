import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetEmail = searchParams.get("email");
  const targetName = searchParams.get("name");

  if (!targetEmail) return NextResponse.json({ error: "Email manquant" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Chemin vers votre CV dans le dossier public
    const cvPath = path.join(process.cwd(), "public", "files", "CV_Adrien_DOGO.pdf");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: targetEmail,
      subject: `CV de Adrien DOGO`,
      html: `
        <p>Bonjour ${targetName},</p>
        <p>Adrien DOGO a bien reçu votre demande et a le plaisir de vous transmettre son CV en pièce jointe.</p>
        <p>Cordialement.</p>
      `,
      attachments: [
        {
          filename: "CV_Adrien_DOGO.pdf",
          path: cvPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Retourne une page de confirmation simple pour Adrien
    return new NextResponse(`
      <html>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; background: #000; color: #fff;">
          <div style="text-align: center; border: 1px solid #3b82f6; padding: 40px; border-radius: 20px;">
            <h1 style="color: #3b82f6;">✅ CV Envoyé !</h1>
            <p>Le CV a été transmis avec succès à ${targetEmail}.</p>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });

  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi" });
  }
}