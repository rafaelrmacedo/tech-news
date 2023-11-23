import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { Pool } from 'pg';
import { log } from "console";

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

export async function userRoutes(server: FastifyInstance) {
    server.get('/users', async () => {
        const query = 'SELECT * FROM users';
        const { rows } = await pool.query(query);
        return rows;
    });

    server.post('/users-post', async (request, reply) => {
        log(request.body);
        const bodySchema = z.object({
            uuid: z.string().uuid(),
            email: z.string().email(),
        });

        log(bodySchema.parse(request.body));
    
        const { uuid, email } = bodySchema.parse(request.body);

        log(uuid);
        log(email);
    
        const query = 'INSERT INTO users (id, email) VALUES ($1, $2)';
        const values = [uuid, email];

        log(query);
        log(values);
    
        try {
            const { rows } = await pool.query(query, values);
            reply.status(200).send('Usuário cadastrado com sucesso.');
        } catch (error) {
            log(error);
            reply.status(500).send('Internal Server Error' + error);
        }
    });
    
    // server.put('/user/:uuid', async (request, reply) => {
    //     const paramsSchema = z.object({
    //         uuid: z.string(),
    //     });

    //     const { uuid } = paramsSchema.parse(request.params);

    //     const bodySchema = z.object({
    //         email: z.string().email(),
    //     });

    //     const { email } = bodySchema.parse(request.body);

    //     const query = 'UPDATE usuarios SET email = $1 WHERE uuid = $2 RETURNING *';
    //     const values = [email, uuid];
    //     const { rows } = await pool.query(query, values);

    //     if (rows.length === 0) {
    //         return reply.status(404).send();
    //     }

    //     return rows[0];
    // });

    server.delete('/user/:email', async (request, reply) => {
        const paramsSchema = z.object({
            email: z.string(),
        });

        const { email } = paramsSchema.parse(request.params);

        const query = 'DELETE FROM usuarios WHERE email = $1';
        const { rowCount } = await pool.query(query, [email]);

        if (rowCount === 0) {
            return reply.status(404).send('Usuário não encontrado');
        }

        return 'Usuário deletado';
    });
}
