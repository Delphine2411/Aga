import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, reason } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Utilisez un mot de passe d'application
      },
    });

    // Lien de validation pour Adrien
    // Ce lien pointe vers l'étape 2 ci-dessous
    const approveUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/approve-cv?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, // Votre email
      subject: `📄 Nouvelle demande de CV de ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #3b82f6; border-radius: 10px;">
          <h2 style="color: #3b82f6;">Demande de CV reçue</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Raison :</strong> ${reason}</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
          <p>Si vous souhaitez envoyer votre CV à cette personne, cliquez sur le bouton ci-dessous :</p>
          <a href="${approveUrl}" 
             style="display: inline-block; padding: 12px 25px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
             ACCORDER ET ENVOYER LE CV
          </a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Demande envoyée" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}