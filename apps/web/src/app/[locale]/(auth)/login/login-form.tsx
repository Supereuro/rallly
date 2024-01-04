"use client";
import { Button } from "@rallly/ui/button";
import { LogInIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { usePostHog } from "posthog-js/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

import { trpc } from "@/app/providers";
import { VerifyCode, verifyCode } from "@/components/auth/auth-forms";
import { TextInput } from "@/components/text-input";
import { IfCloudHosted } from "@/contexts/environment";
import { isSelfHosted } from "@/utils/constants";
import { validEmail } from "@/utils/form-validation";

export function LoginForm({ oidcConfig }: { oidcConfig?: { name: string } }) {
  const { t } = useTranslation();

  const { register, handleSubmit, getValues, formState, setError } = useForm<{
    email: string;
  }>({
    defaultValues: { email: "" },
  });

  const session = useSession();
  const queryClient = trpc.useUtils();
  const [email, setEmail] = React.useState<string>();
  const posthog = usePostHog();
  const router = useRouter();
  const callbackUrl = (useSearchParams()?.get("callbackUrl") as string) ?? "/";

  return (
      <div className="mb-1 text-2xl font-bold">{t("login")}</div>
          <hr className="border-t border-grey-500 my-4" />
          <div className="grid gap-4">
              <Button
                icon={LogInIcon}
                size="lg"
                onClick={() => signIn("oidc")}
              >
                <Trans
                  i18nKey="loginWith"
                  values={{ provider: oidcConfig.name }}
                />
              </Button>              
            </div>
          </>
      </div>
  );
}
