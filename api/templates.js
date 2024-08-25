// api/templates.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { user_id, template_data } = req.body;
        
        try {
            const result = await pool.query(
                'INSERT INTO templates (user_id, template_data, status) VALUES ($1, $2, $3) RETURNING *',
                [user_id, JSON.stringify(template_data), 'pending']
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).json({ error: 'Failed to save template' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
