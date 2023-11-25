import Header from "../../components/Header";
import Receita from "../../components/Receita";
import { Plus, X } from "@phosphor-icons/react";

export default function ListagemReceitas() {
  return (
    <>
      <Header />
      <div className="flex gap-[10px] items-center mb-[20px] mt-[10px]">
        <div className="font-bold text-2xl ml-[480px]">
          Resultados para "bolo"
        </div>
        <div className="">Filtros:</div>
        <input
          className={
            "shadow-xl bg-[#D9D9D9] rounded-3xl p-4 resize-none max-w-[10rem]"
          }
        />
        <span className="p-2 rounded-full bg-black">
          <Plus color="white" size="24" />
        </span>
      </div>
      <div className="flex flex-col items-center gap-[47px]">
        <Receita widthPx={975} heightPx={238} />
        <Receita widthPx={975} heightPx={238} />
        <Receita widthPx={975} heightPx={238} />
      </div>
    </>
  );
}
