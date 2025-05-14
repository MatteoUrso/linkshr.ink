import { getAuthSession } from "@/lib//auth-session";
import { redirect } from "next/navigation";

export type WithAuthProps = {
  // TODO: Retrive the user type from the auth library and use it here
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
  };
};

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>
  ) {
    const session = await getAuthSession();

    if (!session) {
      redirect("/sign-in");
    }

    return (
      <WrappedComponent
        {...(props as P)}
        user={session.user}
        session={session.session}
      />
    );
  };
}
