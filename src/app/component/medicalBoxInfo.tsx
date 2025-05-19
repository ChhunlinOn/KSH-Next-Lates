interface ResidentBoxInfoProps {
    name: string;
    value: string | number | null;
  }
  
  const MedicalBoxInfo: React.FC<ResidentBoxInfoProps> = ({ name, value }) => {
    return (
      <div className="border-b-2 border-gray-300 py-6 flex items-center">
        <div className="w-1/2 text-left font-bold text-md md:text-lg lg:text-xl">
          {name}
        </div>
        <div className="flex-1 flex items-center">
          <div className="text-[16px] md:text-lg lg:text-xl flex-1">
            {value}
          </div>
        </div>
      </div>
    );
  };
  
  export default MedicalBoxInfo;
  