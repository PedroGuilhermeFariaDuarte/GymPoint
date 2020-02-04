export default (req, res, next) => {
  if (!req.adminID) {
    return res.status(402).json({ message: 'You not permission' });
  }
  next();
};
