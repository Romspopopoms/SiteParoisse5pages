// api/templates.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
    console.log('Request received:', req.method, req.body); // Log the request
    if (req.method === 'POST') {
        const { user_id, template_data } = req.body;
        console.log('Inserting into DB:', { user_id, template_data });
        
        try {
            const result = await pool.query(
                'INSERT INTO templates (user_id, template_data) VALUES ($1, $2) RETURNING *',
                [user_id, template_data]
            );
            console.log('Insert result:', result.rows[0]);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Database insert error:', error); // Log the error
            res.status(500).json({ error: 'Failed to save template' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
