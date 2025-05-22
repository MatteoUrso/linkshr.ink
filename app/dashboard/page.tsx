import { WithAuthProps, withAuth } from "@/lib/with-auth";

function Page({ user }: WithAuthProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome section */}
      <h1 className="font-sora text-2xl font-semibold">
        Welcome back, {user.name}
      </h1>
      {/* Key metrics */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="relative">
            <CardDescription>Total clicks today</CardDescription>
            <CardTitle className="text-2xl tabular-nums">1,234</CardTitle>
            <div className="absolute top-4 right-4">
              <div
                className={cn(
                  "focus:ring-slate-8 border-slate-6 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
                  "text-slate-12",
                  "flex gap-1 rounded-lg text-xs"
                )}
              >
                <TrendingUpIcon className="size-3" />
                +12.5%
              </div>
            </div>
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
      </div> */}
    </div>
  );
}

export default withAuth(Page);
