const http = require('http');
const data = JSON.stringify({ name: 'Test User', email: 'test@test.com', password: 'pass123' });
const req = http.request({
  hostname: 'localhost', port: 5000, path: '/api/auth/register', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
}, res => {
  let b = '';
  res.on('data', d => b += d);
  res.on('end', () => console.log('STATUS:', res.statusCode, '\nBODY:', b));
});
req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();
