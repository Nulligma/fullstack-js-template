import jwt from 'jsonwebtoken';

export const generateToken = (res, email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return token;

    // res.cookie('jwt', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    // });
}