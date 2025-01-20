'use client';
import { signIn } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const errors = {
  Signin: 'Try signing with a different account',
  AccessDenied: "You don't have access to this website. Use different account",
  OAuthSignin: 'Try signing with a different account, OAuthSignin',
  OAuthCallback: 'Try signing with a different account, OAuthCallback',
  OAuthCreateAccount:
    'Try signing with a different account, OAuthCreateAccount',
  EmailCreateAccount:
    'Try signing with a different account, EmailCreateAccount',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
  Configuration: 'Error at our end. Inform us',
};

const Error = () => {
  const params = useSearchParams();
  const error = params.get('error');

  const errorMessage = error && (errors[error] ?? errors.default);

  return (
    <>
      <div>{JSON.stringify(error)}</div>
    </>
  );
};
const ErrorPage = () => {
  return (
    <Suspense>
      <Error />
    </Suspense>
  );
};

export default ErrorPage;
