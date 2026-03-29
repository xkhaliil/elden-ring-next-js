"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import bosses from "@/public/bosses.jpg";
import items from "@/public/items.jpg";
import weapons from "@/public/weapons.jpg";
import Image from "next/image";

export default function Categories() {
  return (
    <div
      className="mt-56 flex h-screen flex-col items-center justify-center gap-6 bg-linear-to-b from-[#080A0A] to-[#240000] pb-96 md:mt-0 md:pb-44"
      id="categories"
    >
      <h1 className="text-4xl font-bold text-white">Categories</h1>
      <div className="grid grid-cols-1 gap-6 p-3 md:grid-cols-3">
        <Card className="relative mx-auto w-full max-w-sm justify-between pt-0">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <Image
            src={bosses}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardHeader>
            <CardTitle>Bosses</CardTitle>
            <CardDescription>Explore the bosses of Elden Ring</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/bosses";
              }}
            >
              Search Bosses
            </Button>
          </CardFooter>
        </Card>
        {/* second card  */}
        <Card className="relative mx-auto w-full max-w-sm justify-between pt-0">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <Image
            src={weapons}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardHeader>
            <CardTitle>Weapons</CardTitle>
            <CardDescription>Explore the weapons of Elden Ring</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/weapons";
              }}
            >
              Search Weapons
            </Button>
          </CardFooter>
        </Card>
        <Card className="relative mx-auto w-full max-w-sm justify-between pt-0">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <Image
            src={items}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>Explore the items of Elden Ring</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/items";
              }}
            >
              Search Items
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
