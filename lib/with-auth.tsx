import { type SelectSession, type SelectUser } from "@/db/schema";
import { getAuthSession } from "@/lib//auth-session";
import { redirect } from "next/navigation";

export type WithAuthProps = {
  user: SelectUser;
  session: SelectSession;
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
