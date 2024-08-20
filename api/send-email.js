import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, age, gender, eating_style, food, bio } = req.body;

        // Validate input
        if (!name || !email || !bio) {
            console.error('Validation Error: Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create the transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Configure mail options
        const mailOptions = {
            from: email,
            to: 'sukritchopra2003@gmail.com',
            subject: `Message from ${name}`,
            text: `Bio: ${bio}\nAge: ${age}\nGender: ${gender}\nEating Style: ${eating_style}\nFood: ${food.join(', ')}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error); // Log the error for debugging
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
