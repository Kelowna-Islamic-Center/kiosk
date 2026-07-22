
export type Prayer = {
    id: string,
    name: string,
    start: string,
    iqamah: string
}

export type Announcement = {
    id: string,
    timeStamp?: {seconds: number, nanoseconds: number},
    locale?: string,
    title?: string,
    description?: string
}