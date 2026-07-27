
// notebook type
export interface Notebook {
    id: string,
    title: string,
    userId: string,
    stackId?: string,
    createdAt: string,
    updatedAt: string
}

// note type
export interface Note {
    id: string,
    title: string,
    userId: string,
    notebookId: string,
    createdAt: string,
    updatedAt: string
}

// stack type

export interface Stack {
    id: string,
    title: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}