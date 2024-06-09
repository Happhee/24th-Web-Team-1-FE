"use client";

import { EMAIL_CONTROL, SUBSCRIBE_ANNOUCE, SUBSCRIBE_USER_ACTIONS, SUBSCRIBE_TITLES } from "@main/constants/main";
import { useSubscribeForm } from "@main/hooks/useSubscribeForm";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@shared/components/ui/form"

export default function SubscribeBottomBar() {
    const { form, onSubmit } = useSubscribeForm();
    const { handleSubmit, control, formState } = form

    return (
        <div className="w-full flex items-center justify-center bg-background1 p-[16px]">
            <div className="bg-transparent w-full">
                <h3 className="text-[17px] h3-bold mb-4">{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_FEW}</h3>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder={EMAIL_CONTROL.EMAIL_PLACEHOLDER} {...field} className={`rounded-[10px] focus-visible:ring-transparent text-[16px] ${formState.errors.email ? 'border-error' : ''}`} />
                                    </FormControl>
                                    <FormMessage />
                                    <span className="text-[12px] font-semibold text-text-gray2 mt-[11px]">
                                        {SUBSCRIBE_ANNOUCE.SUBSCRIBE_CONSEQUENCE} <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PRIVACY_COLLECTION_NOTICE}</a>과 <a className="text-[12px] font-semibold underline">{SUBSCRIBE_ANNOUCE.PROMOTIONAL_CONSENT_NOTICE}</a>에 {SUBSCRIBE_ANNOUCE.AGREEMENT_NOTICE}
                                    </span>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row w-full space-x-[8px]">
                            <Button type="submit" className="w-full bg-main text-white rounded-none py-6">
                                {SUBSCRIBE_USER_ACTIONS.SUBSCRIBE_CONFIRM}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
