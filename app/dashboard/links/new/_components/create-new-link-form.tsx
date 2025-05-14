"use client";

import { createLink } from "../_lib/actions";
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
      original_url: "",
      // short_code: "",
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
          <legend className="mb-0.5 text-xl font-semibold">Link Details</legend>
          <div className="bg-slate-2 border-slate-6 space-y-4 rounded-lg border p-6">
            <FormField
              control={form.control}
              name="original_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Original URL <span aria-label="required">*</span>
                    <span className="sr-only">(required)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/your-long-url"
                      required
                      aria-required="true"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter the full URL that you want to shorten, including
                    http:// or https://
                  </FormDescription>
                  <FormMessage />
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
