export const error = (err, req, res, next) => {
  const { message } = err;
  console.error(err.stack);
  res.status(500).json({ message });
}