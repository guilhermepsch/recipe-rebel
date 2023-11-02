import Header from "../../components/Header";
import Receita from "../../components/Receita";

export default function Populares() {
  return (
    <>
      <Header />
      <div className="flex gap-20">
      <Receita widthPx={478.314} heightPx={407.863} />
      <Receita widthPx={478.314} heightPx={407.863} />
      <Receita widthPx={478.314} heightPx={407.863} />
      </div>
    </>
  );
}
