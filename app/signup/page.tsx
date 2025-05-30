// app/signup/page.tsx
import { SignupForm } from "@/components/auth/signup-form";
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SearchParamErrorDisplay } from "@/components/auth/search-param-error-display";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/"); // If already logged in, redirect to home
  }

  return (
    <AuthFormWrapper
      title="Create an Account"
      description="Join SceneIt to track your favorite movies."
      footerText="Already have an account?"
      footerLinkHref="/login"
      footerLinkText="Sign In"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamErrorDisplay searchParams={resolvedSearchParams} />
      </Suspense>
      <SignupForm />
    </AuthFormWrapper>
  );
}