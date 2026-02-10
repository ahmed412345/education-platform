import nodemailer from "nodemailer";

export async function sendEmailOtp(to: string, otpCode: string) {
    // 1. إعداد المرسل باستخدام Brevo SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // بورت 587 يتطلب false
        auth: {
            // انصحك بشدة تضع هذه القيم في ملف .env
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASS,
        },
    });

    const mailOptions = {
        // 2. تحديث الـ From ليطابق الدومين الموثق (noura.sbs)
        from: `"Noura Sensei Support" <no-reply@noura.sbs>`,
        to: to,
        subject: "Verification Code - Verify Your Account",
        // أضفت نسخة text بسيطة لزيادة موثوقية الإيميل عند الفلاتر
        text: `Your verification code is: ${otpCode}. It is valid for 15 minutes.`,
        html: `
            <div style="font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #eee; direction: ltr;">
                <h2 style="color: #333;">Welcome!</h2>
                <p style="color: #555;">Please use the following code to verify your account:</p>
                <div style="background-color: #f9f9f9; padding: 10px; display: inline-block; border-radius: 8px;">
                    <h1 style="color: #4CAF50; letter-spacing: 5px; margin: 0;">${otpCode}</h1>
                </div>
                <p style="color: #888; margin-top: 15px;">This code is valid for 15 minutes.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <small style="color: #aaa;">If you didn't request this, please ignore this email.</small>
            </div>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent via Brevo: " + info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error sending email via Brevo:", error);
        throw error;
    }
}
