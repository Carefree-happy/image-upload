export enum UploadStatus {
    Loading,
    Error,
    Success,
}

export type Images = {
    status: string,
    file: string
}

export interface PhotoList {
    containerWidth: number,
    itemWidth: number,
    itemCount: number,
    sketchList: Images[],
    deleteItem: any,
    children: React.ElementType
}