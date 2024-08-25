// api/templates.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { user_id, template_data } = req.body;
        
        try {
            const result = await pool.query(
                'INSERT INTO templates (user_id, template_data) VALUES ($1, $2) RETURNING *',
                [user_id, template_data]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save template' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
