'use client';
import React from "react";
import ProgramBox from "../../../component/programBox";
import { useProgram } from "@/app/Context/ProgramTypecontext";

const ProgramPage = () => {
  const {programs} = useProgram();
  return (


<div className="max-w-screen-xl mx-auto my-10 px-4">
  <div className="text-center text-3xl sm:text-4xl font-bold text-green-800 mb-12">
    Our Programs
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
    {programs.map((program) => (
      <ProgramBox
        key={program.id}
        id={program.id}
        title={program.program_type_name}
        image={program.img_url}
        level={program.id}
      />
    ))}
  </div>
</div>


  );
};

export default ProgramPage;
