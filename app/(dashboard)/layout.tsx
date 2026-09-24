import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusIcon, LogOutIcon } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const endpoints = session?.user?.id
    ? await prisma.endpoint.findMany({
        where: { ownerId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const initials = session?.user?.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo className="px-2 py-1" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Endpoints</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<Link href="/dashboard">All endpoints</Link>} />
                </SidebarMenuItem>
                {endpoints.map((ep) => (
                  <SidebarMenuItem key={ep.id}>
                    <SidebarMenuButton
                      render={<Link href={`/dashboard/${ep.id}`}>{ep.name}</Link>}
                    />
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link href="/dashboard/new">
                        <PlusIcon />
                        <span>New endpoint</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm">{session?.user?.email}</span>
                </Button>
              }
            />
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem
                render={
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/sign-in" });
                    }}
                  >
                    <button type="submit" className="flex w-full items-center gap-2">
                      <LogOutIcon className="h-4 w-4" />
                      Sign out
                    </button>
                  </form>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}