
export type Prayer = {
    id: string,
    name: string,
    start: string,
    iqamah: string
}

export type Announcement = {
    id: string,
    timeStamp?: {seconds: number, nanoseconds: number},
    title?: string,
    description?: string
}