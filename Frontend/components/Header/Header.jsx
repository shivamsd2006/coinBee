import Button from "../../UiComponents/Button";

function Header() {
    return (
        <>
            <header className=" flex justify-end w-full ">
                <div>
                    <h1 className="text-[#FFFFFF] font-Syne font-extrabold">coinBee</h1>
                </div>
                <div className="flex justify-between items-center w-[200px] mr-4">
                    <Button title='SignUp' type='submit' />
                    <a href="#" className="text-[#8E8E93]">SignIn</a>
                </div>

            </header>

        </>

    );
}
export default Header;