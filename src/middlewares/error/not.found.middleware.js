export default function notFoundMiddleware(req, res, next) {
  res.status(404).json({ error: 'Not Found' });
}