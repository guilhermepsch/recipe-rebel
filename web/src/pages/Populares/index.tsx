import Header from "../../components/Header";
import Receita from "../../components/Receitas";

export default function Populares() {
  return (
    <>
      <Header />
      <div className="flex">
      <Receita />
      <Receita />
      <Receita />
      </div>
    </>
  );
}
