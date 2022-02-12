import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })
};

export const verifyToken = async token =>{
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};