const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.put('/api/carts', (req, res) => {
  const updatedCarts = req.body;
  router.db.set('carts', updatedCarts).write();
  res.json(updatedCarts);
});
server.put('/api/products', (req, res) => {
  const updatedCarts = req.body;
  router.db.set('products', updatedCarts).write();
  res.json(updatedCarts);
});

server.put('/api/orders', (req, res) => {
  const updatedOrders = req.body;
  router.db.set('orders', updatedOrders).write();
  res.json(updatedOrders);
});

server.put('/api/users', (req, res) => {
  const updatedUsers = req.body;
  router.db.set('users', updatedUsers).write();
  res.json(updatedUsers);
});

server.put('/api/forgot_password', (req, res) => {
  const updatedData = req.body;
  router.db.set('forgot_password', updatedData).write();
  res.json(updatedData);
});

// Use default router
server.use('/api',router)
server.listen(9999, () => {
  console.log('JSON Server is running')
})