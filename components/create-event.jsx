"use client"
import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import EventForm from "./event-form";
  
const CreateEventDrawer = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClose= ()=>{
        setIsOpen(false);
        router.replace(window?.location?.pathname);
    }

    const router=useRouter();
    const searchParams= useSearchParams();

    useEffect(()=>{
        if(searchParams.get("create")==="true"){
            setIsOpen(true);
        }
    },[searchParams]);


  return (
    <Drawer open={isOpen} >
    <DrawerTitle></DrawerTitle>
    <DrawerContent>
      <div >
        
        <EventForm onSubmitForm={()=>{
            handleClose();
        }}>

        </EventForm>
        <DrawerFooter className="max-w-full flex items-center justify-center">
          <DrawerClose asChild >
            <Button onClick={handleClose} variant="outline"  className="bg-black text-white max-w-2xl" >Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
  );
};

export default CreateEventDrawer;
