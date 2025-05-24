"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProgramActivityProvider } from "@/app/Context/ProgramactivityContext";
import ProgramActivityList from "@/app/component/activitylist";

const FoyerActivityPage = () => {
  const { id } = useParams();
  console.log(id);

 
  return (
    <ProgramActivityProvider programId={id as string}>

     <ProgramActivityList/>
     
    </ProgramActivityProvider>
  );
};

export default FoyerActivityPage;



