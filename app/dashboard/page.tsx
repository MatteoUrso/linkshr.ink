import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WithAuthProps, withAuth } from "@/lib/with-auth";
import { TrendingUpIcon } from "lucide-react";

function Page({ user }: WithAuthProps) {
  return (
    <>
      {/* Welcome section */}
      <section className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-slate-11 mt-1">
            Here&apos;s what&apos;s happening with your links today
          </p>
        </div>
      </section>
      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total clicks today</CardDescription>
            <CardTitle className="text-2xl tabular-nums">1,234</CardTitle>
            {/* <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div> */}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default withAuth(Page);
