import Image from "next/image";
import LoginFormPage from "./component/loginformpage";


export default function LoginPage() {
    return (
            <>
      <h1 className="text-3xl font-bold text-center my-8">Login</h1>
      <section className="container mx-auto grid grid-cols-12">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
         <Image
          className="hidden md:block"
            src={"/asset/login.jpg"}
            width={460}
            height={500}
            alt={"Authentication Image"}
         >

         </Image>
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
        <LoginFormPage></LoginFormPage>
        </div>
      </section>
    </>
    );
}
