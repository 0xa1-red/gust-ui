type Gust = {
    key: string,
    title: string,
    created_at: GustTimestamp,
    accessed: number,
    starred: number,
}

type GustContent = {
    key: string,
    title: string,
    content: string,
    created_at: GustTimestamp,
    accessed: number,
    starred: number,
}

type GustTimestamp = {
    secs_since_epoch: number
    nanos_since_epoch: number
}

type GustCollection = Gust[]

type GustListProps = {
    list: GustCollection
}

type NavProps = {
    currentPage: string
}

type ShowGustProps = {
    gustKey: string
}