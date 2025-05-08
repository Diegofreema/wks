import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';
import { StreamChat } from 'stream-chat';

const app = new Hono();
app.use('/api/*', cors());
const api_key = process.env.STREAM_API_KEY!;
const api_secret = process.env.STEAM_SECRET_KEY!;
const serverClient = StreamChat.getInstance(api_key, api_secret);
app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.get('/user/:id', (c) => {
  const id = c.req.param('id');
  const token = serverClient.createToken(id);
  return c.json({
    ok: true,
    token,
  });
});
export default app;
