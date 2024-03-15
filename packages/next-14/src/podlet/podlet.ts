import { HttpIncoming } from '@podium/utils';
import Layout from '@podium/layout';
import { NextRequest, NextResponse } from 'next/server';

const serverRuntimeConfig = {
  podium: {
    name: 'nextjs-demo',
    pathname: '/',
    podlets: [
      {
        name: 'header',
        uri: 'http://localhost:7070/manifest.json',
      },
      {
        name: 'footer',
        uri: 'http://localhost:8080/footer/manifest.json',
      }
    ]
  },
}

const config = serverRuntimeConfig.podium;

const lout = new Layout({
    name: config.name,
    pathname: config.pathname,
});

const podlets = config.podlets.map((podlet) => {
    return lout.client.register(podlet);
});

export async function layout() {
    let incoming = new HttpIncoming(NextRequest, NextResponse);
    incoming = await lout.process(incoming);

    const toFetch = podlets.map((podlet) => {
        return podlet.fetch(incoming);
    });

    const data = await Promise.all(toFetch);

    // Next.js / React can not serialize instance of classes :/
    return JSON.parse(JSON.stringify(data));
}