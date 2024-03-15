import { HttpIncoming } from '@podium/utils';
import Layout from '@podium/layout';
import getConfig from 'next/config';
import { NextResponse } from 'next/server';

const { serverRuntimeConfig } = getConfig()
const config = serverRuntimeConfig.podium;

const lout = new Layout({
    name: config.name,
    pathname: config.pathname,
});

const podlets = config.podlets.map((podlet) => {
    return lout.client.register(podlet);
});



export async function GET(request: Request) {
 // some check to prevent this from running on all routes (like /favicon.ico etc)
    // console.log(req.url)

    let incoming = new HttpIncoming(request, NextResponse);
    incoming = await lout.process(incoming);

    // pass on all headers, params etc here?
    // how do we construct additional pathnames etc?
    const toFetch = podlets.map((podlet) => {
        return podlet.fetch(incoming);
    });

    const data = await Promise.all(toFetch);

    // Next.js / React can not serialize instance of classes :/
    return JSON.parse(JSON.stringify(data));
}