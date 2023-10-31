import { FastifyInstance } from "fastify";
import { z } from 'zod'
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

export async function userRoutes(server: FastifyInstance) {
    server.get('/user', async () => {
        const query = 'SELECT * FROM usuarios';
        const { rows } = await pool.query(query);
        return rows;
    });

    server.post('/user', async (request, reply) => {
        const bodySchema = z.object({
            uuid: z.string(),
            email: z.string().email(),
        });
    
        const { uuid, email } = bodySchema.parse(request.body);
    
        const query = 'INSERT INTO usuarios (uuid, email) VALUES ($1, $2) RETURNING *';
        const values = [uuid, email];
    
        try {
            const { rows } = await pool.query(query, values);
            reply.status(200).send('Usuário cadastrado com sucesso.');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            reply.status(500).send('Erro ao cadastrar usuário.');
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
