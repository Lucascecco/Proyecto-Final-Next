import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: 'Administración',	
}

type Props = {};

export default function AdminPage({}: Props) {
  return (
    <div className="flex justify-center items-center flex-1 flex-grow flex-col">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="email" placeholder="Email" className="my-2" />
          <Input type="password" placeholder="Contraseña" />
        </CardContent>
        <CardFooter>
          <Button>Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
