export const error = (err, req, res) => {
  const { message } = err;
  console.error(err.stack);
  res.status(500).json({ message });
}
