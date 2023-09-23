import {useState, useEffect} from 'react';
import Navigation from './Navigation';
import NotFound from './NotFound';
import Index from './Index';
import NewGust from './NewGust';
import ShowGust from './ShowGust';

function Router() {
    const [page, setPage] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPage(window.location.pathname);
        }
        window.addEventListener("navigate", onLocationChange);
        return () => window.removeEventListener("navigate", onLocationChange);
    });

    const routingTable: {[key: string]: (values: PathValues) => JSX.Element} = {
        "/": (): JSX.Element => {
            return <Index />
        },
        "/new": (): JSX.Element => {
            return <NewGust />
        },
        "/g/{key}": (values: PathValues): JSX.Element => {
            return <ShowGust gustKey={values.key} />
        }
    }

    let content = <NotFound page={page} />
    for (const matcher in routingTable) {
        const m = parsePath(matcher, page)
        if (!m[0]) {
            continue
        }

        const fn = routingTable[matcher]
        content = fn(m[1])
    }

    return (
        <div>
            <Navigation currentPage={page} />
            {content}
        </div>
    )
}

export type PathValues = { [key: string]: string }

export const parsePath = (pattern: string, path: string): [boolean, PathValues] => {
    let res: PathValues = {};
    
    const parts: string[] = pattern.split("/");
    const matcher: RegExp = new RegExp('\{([a-zA-Z0-9\-]+)\}');

    let values: {[key: string]: string} = {}
    const patternParts = parts.map((part) => {
        if (matcher.test(part)) {
            const matches: RegExpExecArray | null = matcher.exec(part)
            const partName = matches?.[1]
            if (partName == null) {
                return part
            }

            values[partName] = ''
            return `(?<${partName}>[^\/]+)`
        }

        return part
    })

    const regPattern = new RegExp(patternParts.join('/'))
    const match = regPattern.exec(path)
    
    if (null == match) {
        return [false, res];
    }

    let index = 1
    for (const m in values) {
        res[m] = match[index]
        index ++
    }

    return [true, res];
}

export default Router