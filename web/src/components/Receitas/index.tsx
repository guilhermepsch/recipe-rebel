function Receita(){
  return (
    <div className="relative">
        <div className="w-[478.314px] h-[407.863px] rounded-[20px] overflow-hidden ml-20 mt-10">
          <img
            src="https://www.receitasnestle.com.br/sites/default/files/srh_recipes/c390f7572db6774bd6b3134580c7ea27.jpg"
            alt="rocambole"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[478.314px] h-[162.248px] flex-shrink-0 rounded-b-[20px] bg-black ml-20" style={{ opacity: '0.7' }}>
        <div className="h-full flex flex-col mt-[53.34px] ml-[32.87px] mr-[32.87px]">
          <p className="text-white font-bold text-xl">
            <span className="flex w-[259.439px] h-[14.379px] flex-col justify-center">
              Rocambole De Doce De Leite Perfeito
            </span>
          </p>
          <p className="text-white text-[14px] mt-[20px]">Essa receita funciona e é a melhor receita de rocambole do mundo!</p>
        </div>
        </div>
      </div>
  )
}

export default Receita;