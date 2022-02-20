import SpinnerAsset from "./assets/spinner.gif";

export default function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        width={180}
        src={SpinnerAsset}
        alt="loading..."
        className="text-center mx-auto"
      />
    </div>
  );
}
