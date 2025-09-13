import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql `SELECT * FROM products ORDER BY created_at DESC`;
        res.status(200).json({success : true , data : products});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await sql `SELECT * FROM products WHERE id = ${id}`;
        if (product) {
            res.status(200).json({success : true , data : product});
        } else {
            res.status(404).json({success : false , message : "Product not found"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const {name , description , price , image } = req.body;
    if(!name || !price || !description || !image){
        return res.status(400).json({success : false , message : "All fields are required"});
    }
    try {
        const newProduct = await sql `INSERT INTO products (name, description, price, image) VALUES (${name}, ${description}, ${price}, ${image}) RETURNING *`;
        res.status(201).json({success : true , data : newProduct});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price , image } = req.body;
    try {
        const updateProduct = await sql `UPDATE products SET name = ${name}, description = ${description}, price = ${price}, image = ${image} WHERE id = ${id} RETURNING *`;
        if (updateProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await sql `DELETE FROM products WHERE id = ${id} RETURNING *`;
        if (deleteProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: deleteProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
