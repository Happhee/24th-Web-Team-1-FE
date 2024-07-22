import { z } from "zod";

import { ApiResponse } from "@api/api-config";

import { unSubscribeSchema } from "@subscription/schemas";

export type variantType = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

export type UnsubscribeFormData = z.infer<typeof unSubscribeSchema>;

export type SubscribeParams = {
    workbookId: string;
}

export type SubscribeBody = {
    email: string
}

export type MessageOnlyResponse = Omit<ApiResponse<any>, 'message'>


export type UnsubscribeBody = {
    email: string
    opinion: string
}