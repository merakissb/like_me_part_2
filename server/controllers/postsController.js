// server/controllers/postsController.js

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  port: 5432
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to database');
});

// metodo para obtener todos los posts
export const getPosts = async (req, res) => {
  try {
    const dbInstance = await pool.connect();
    const query = `SELECT * FROM posts`;
    const response = await dbInstance.query(query);
    res.status(200).json(response.rows);
    dbInstance.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al obtener posts' });
  }
};

// metodo para agregar un post
export const addPost = async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    if (!titulo || !img || !descripcion) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }
    const dbInstance = await pool.connect();
    const query = `INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)`;
    const values = [titulo, img, descripcion];
    await dbInstance.query(query, values);
    res.status(200).json({ msg: 'Post agregado' });
    dbInstance.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al agregar post' });
  }
};

// metodo para eliminar un post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const dbInstance = await pool.connect();
    const query = `DELETE FROM posts WHERE id = $1`;
    const values = [id];
    await dbInstance.query(query, values);
    res.status(200).json({ msg: 'Post eliminado' });
    dbInstance.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al eliminar post' });
  }
};

// metodo para dar like a un post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const dbInstance = await pool.connect();
    // COALESCE es para que si el valor es null, se convierta en 0 y se pueda sumar
    const query = `UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1`;
    const values = [id];
    await dbInstance.query(query, values);
    res.status(200).json({ msg: 'Like dado' });
    dbInstance.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al dar like' });
  }
};