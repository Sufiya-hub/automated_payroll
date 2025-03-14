import { Pool } from 'pg';

const DATABASEURI = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: DATABASEURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

// export default pool;
