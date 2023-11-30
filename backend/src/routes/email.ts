import { FastifyInstance } from "fastify";
import nodemailer from 'nodemailer';
import { Pool } from 'pg';

let pool: Pool;
try {
    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
    });
} catch (error) {
    console.error('Error creating pool:', error);
}

export async function emailRoutes(server: FastifyInstance) {
    server.post('/send-emails', async (request, reply) => {
        const content = request.body;

        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: process.env.EMAIL?.toString(),
                pass: process.env.PASSWORD?.toString(), 
            },
        });

        try {
            const { rows } = await pool.query('SELECT email FROM users');
            const emails = rows.map(row => row.email);

            const mailOptions = {
                from: 'Rafael.Macedo@Fundacion-jala.org',
                subject: 'Newsletter Tech',
                text: content,
                to: '',  // placeholder
            };

            for (const email of emails) {
                mailOptions.to = email;
                await transporter.sendMail(mailOptions);
            }

            reply.status(200).send('Emails sent successfully!');
        } catch (error) {
            console.error('Error sending emails:', error);
            reply.status(500).send('Error sending emails.');
        }
    });

}
