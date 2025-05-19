"use client";

import { createLink } from "../_lib/actions";
import { LINK_CONSTRAINTS } from "../_lib/constants";
import { FormSchema } from "../_lib/form-schema";
import { State } from "../_types/state";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof FormSchema>;

export function CreateNewLinkForm() {
  const [formState, formAction, formPending] = useActionState<State, FormData>(
    createLink,
    null
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  useEffect(() => {
    if (!formState) return;
    if (formState.status === "error") {
      formState.errors?.forEach((error) => {
        form.setError(error.field as FieldPath<FormFields>, {
          message: error.message,
          type: "manual",
        });
      });
    }
  }, [formState, form]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)));
          })(evt);
        }}
        noValidate // Questo previene la validazione nativa del browser che potrebbe avere problemi di accessibilità, lasciando il controllo a React Hook Form.
        className="flex flex-col gap-8"
        aria-label="Create new shortened link form"
      >
        {/* Essential Information */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-1 text-xl font-semibold">Link Details</legend>
          <div className="bg-slate-2 border-slate-6 flex flex-col gap-4 rounded-lg border p-6">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Original URL
                    <span aria-label="required" className="text-red-11 ml-1">
                      *
                    </span>
                    <span className="sr-only">(required)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/your-long-url"
                      type="url"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      required
                      aria-required="true"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title
                    <span className="sr-only">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Marketing Campaign"
                      maxLength={LINK_CONSTRAINTS.TITLE_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Internal name to identify this link in your dashboard
                  </FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Custom Slug
                    <span className="sr-only">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="random-code"
                      type="text"
                      autoCapitalize="none" // Prevent the keyboard from opening in uppercase
                      autoCorrect="off" // Prevent the keyboard from opening in suggestions
                      spellCheck="false" // Prevent the keyboard from opening in suggestions
                      maxLength={LINK_CONSTRAINTS.SHORTCODE_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave blank for an auto-generated slug.
                  </FormDescription>
                  {/* Anteprima del link - qui sotto */}
                  {/* <div className="bg-slate-3 mt-2 flex items-center rounded-md px-3 py-2 text-sm">
                    <span className="text-slate-11 font-medium">
                      linkshr.ink/
                    </span>
                    <span className="font-jetbrains text-slate-12">
                      {field.value || (
                        <span className="text-slate-9">random-code</span>
                      )}
                    </span>
                  </div> */}
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* UTM Parameters */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-1 text-xl font-semibold">UTM Parameters</legend>
          <div className="bg-slate-2 border-slate-6 flex flex-col gap-4 rounded-lg border p-6">
            <FormField
              control={form.control}
              name="utmSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="google, facebook, newsletter, twitter"
                      maxLength={LINK_CONSTRAINTS.UTM_SOURCE_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The source of the traffic. E.g., google, facebook,
                    newsletter, twitter.
                  </FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmMedium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medium</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cpc, banner, email, social, organic"
                      maxLength={LINK_CONSTRAINTS.UTM_MEDIUM_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The medium of the traffic.</FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmCampaign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="summer_sale, product_launch, black_friday"
                      maxLength={LINK_CONSTRAINTS.UTM_CAMPAIGN_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The name of the campaign or promotion.
                  </FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Term</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="running+shoes, organic+coffee"
                      maxLength={LINK_CONSTRAINTS.UTM_TERM_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The keywords or terms associated with the link.
                  </FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="utmContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="top_banner, sidebar_ad, footer_link"
                      maxLength={LINK_CONSTRAINTS.UTM_CONTENT_MAX_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The specific content or version of the ad or link.
                  </FormDescription>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* {formState?.status === "error" &&
          (!formState.errors || formState.errors.length === 0) && (
            <div
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="text-red-11"
            >
              {formState.message}
            </div>
          )} */}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || formPending}
          aria-busy={form.formState.isSubmitting || formPending}
          // className="w-fit"
        >
          {form.formState.isSubmitting || formPending ? (
            <>
              <Loader2 className="mr-2 animate-spin" aria-hidden="true" />
              <span>Creating...</span>
            </>
          ) : (
            "Create Link"
          )}
        </Button>
      </form>
    </Form>
  );
}
