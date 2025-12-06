const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

const signToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN});
}

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password){
        return res.status(400).send('Please write email and password');
    }

    console.log("Login attempt:", email, password);
    const query = `SELECT * FROM USER WHERE EMAIL='${email}'`;
    db.get(query, (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }

        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error verifying password.');
            }

            const token = signToken(row.ID, row.ROLE);

            return res.status(200).json({
                message: 'Login successful',
                user:{
                    id: row.ID,
                    name: row.NAME,
                    email: row.EMAIL,
                    role: row.ROLE,
                },
                token,
            });
        });
    });
};

module.exports={login,};


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).send('Access denied: Token missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid or expired token');
        }
        req.user = { id: decoded.id, role: decoded.role };
        next();
    });
};