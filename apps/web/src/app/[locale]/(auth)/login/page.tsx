import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";

import { LoginForm } from "@/app/[locale]/(auth)/login/login-form";
import { Params } from "@/app/[locale]/types";
import { getTranslation } from "@/app/i18n";
import { AuthCard } from "@/components/auth/auth-layout";
import { isOIDCEnabled, oidcName } from "@/utils/constants";

// Self-hosted instances only have env vars for OIDC at runtime, so we need to
// use force-dynamic to avoid statically rendering this page during build time.
export const dynamic = "force-dynamic";

export default async function LoginPage({ params }: { params: Params }) {
  const { t } = await getTranslation(params.locale);
  return (
    <div>
      <AuthCard>
        <LoginForm
          oidcConfig={{ name: oidcName }}
        />
      </AuthCard>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { t } = await getTranslation(params.locale);
  return {
    title: t("login"),
  };
}
