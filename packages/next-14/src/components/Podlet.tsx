import Script from 'next/script'
import { Fragment } from 'react'


type ServerSideProps = {
  content: string
}

const ServerSide = ({ content }: ServerSideProps) => {
    return (<div dangerouslySetInnerHTML={{ __html: content }} suppressHydrationWarning />);
}

type ClientSideProps = {
  js: Array<{ value: string, type: string }>
}

// Expects an array of objects of this shape: https://github.com/podium-lib/utils/blob/master/lib/asset-js.js
const  ClientSide = ({ js }: ClientSideProps) => {
    const scripts = js.map((script) => {
        return (<Script key={script.value} src={script.value} type={script.type} strategy="afterInteractive" />)
    });

    return (<>
        {scripts}
    </>)
}

type Render = ServerSideProps & ClientSideProps

// Expects this object shape: https://github.com/podium-lib/client/blob/master/lib/response.js
export function Podlet({ render }: {render: Render}) {
    return (
        <>
            <ServerSide content={render.content} />
            <ClientSide js={render.js} />
        </>
    )
}
