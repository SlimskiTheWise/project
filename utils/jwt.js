import jwt from 'jsonwebtoken';

export async function generateToken(user) {
    const key = process.env.JWT_SECRET;
    const token = jwt.sign({_id: user._id, username: user.username}, key)
    return token
}