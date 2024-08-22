const logo = "/src/assets/logo.png";
import NavList from "./NavList";
export default function NavBar() {
  return (
    <div className="container py-1 mx-auto mt-2 rounded-sm shadow-lg bg-primary shadow-primary/40 backdrop-blur-sm hover:backdrop-blur-lg">
      <div className="flex">
        <div className="flex gap-2 pl-10 basis-1/2">
          <img src={logo} className="cursor-pointer w-14 h-14" alt="logo" />
          <span className="inline-block pt-2 text-2xl font-bold cursor-pointer">
            SHARESLICE
          </span>
        </div>
        <div className="basis-1/3"></div>
        <div className="flex basis-1/4">
          <NavList />
        </div>
      </div>
    </div>
  );
}
