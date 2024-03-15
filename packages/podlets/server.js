import fastifyPodlet from '@podium/fastify-podlet';
import fastifyStatic from '@fastify/static';
import Fastify from 'fastify';
import Podlet from '@podium/podlet';
import cors from '@fastify/cors'

const app = Fastify({
    logger: true
});

await app.register(cors, {});

const podlet = new Podlet({
    pathname: '/',
    version: '2.0.0',
    name: 'header',
    development: true
});

app.register(fastifyPodlet, podlet);

app.register(fastifyStatic, {
    root: new URL('./static', import.meta.url),
    prefix: '/static',
});

app.get('/', async (request, reply) => {
    reply.podiumSend(`<h1>Hello from Podium! <br> Podlet name: ${podlet.name}</h1>`);
});

app.get(podlet.manifest(), async (request, reply) => {
    reply.send(podlet);
});

try {
  await app.listen({ port: 7070 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}