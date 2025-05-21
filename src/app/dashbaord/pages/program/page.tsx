'use client';
import React from "react";
import ProgramBox from "../../../component/programBox";
import { useState , useEffect} from "react";
import dotenv from "dotenv";

const ProgramPage = () => {
  dotenv.config();
  const api_url = process.env.NEXT_PUBLIC_API_URL;  
  const token = process.env.NEXT_PUBLIC_TOKEN;
  const [programs, setPrograms] = useState<any[]>([]);

  const handlefetchPrograms = async () => {
    try {
      const response = await fetch(
        `${api_url}/program-types?populate=*`, // Replace with your API endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your API token
          },
        }
      );
      const data = await response.json();
      console.log(data.data[3].attributes.img_url.data[0].attributes.url);
      setPrograms(data.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };
  useEffect(() => {
    handlefetchPrograms();
  }
  , []);
  // const programs = [
  //   {
  //     id: 1,
  //     title: "Foyer",
  //     image: "https://cdn.pixabay.com/photo/2020/01/03/05/36/house-4737447_1280.png",
  //     level: "Level 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Factory",
  //     image: "https://img.freepik.com/premium-vector/drawing-factory-with-smoke-coming-out-it_272293-3155.jpg",
  //     level: "Level 2",
  //   },
  //   {
  //     id: 3,
  //     title: "PikArtist",
  //     image: "https://medias.artmajeur.com/standard/16275250_pokemon-1-1500.jpg?v=1738567822",
  //     level: "Level 3",
  //   },
  //   {
  //     id: 4,
  //     title: "Out Of The Wall",
  //     image: "https://foundersguide.com/wp-content/uploads/2016/11/company-culture.png",
  //     level: "Level 4",
  //   },
  // ];

  return (


<div className="max-w-screen-xl mx-auto my-10 px-4">
  <div className="text-center text-3xl sm:text-4xl font-bold text-green-800 mb-12">
    Our Programs
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
    {programs.map((program) => (
      <ProgramBox
        key={program.id}
        title={program.attributes.program_type_name}
        image={
  Array.isArray(program?.attributes?.img_url?.data) && program.attributes.img_url.data.length > 0
    ? program.attributes.img_url.data[0].attributes.url
    : "/placeholder.png"
}
        level={program.level}
      />
    ))}
  </div>
</div>


  );
};

export default ProgramPage;
