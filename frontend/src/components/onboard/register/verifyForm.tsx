const VerifyForm = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="lg:text-black text-white text-4xl font-bold font-sfpro mb-6 lg:text-4xl">Verify email</h2>
            <p className="font-sfpro text-white text-center lg:text-gray-600">We sent a 4-digit passcode to <span className="font-bold lg:text-black">jonathanwhite@gmail.com</span></p>
            <form>
                <div className="flex flex-row items-center gap-x-2 mt-8">
                    <input type="password" className="w-14 h-14 text-red-800 text-6xl flex flex-row items-center text-center justify-center bg-white-100 border-2 border-red-800 rounded"/>
                    <input type="password" className="w-14 h-14 text-red-800 text-6xl flex flex-row items-center text-center justify-center bg-white-100 border-2 border-red-800 rounded"/>
                    <input type="password" className="w-14 h-14 text-red-800 text-6xl flex flex-row items-center text-center justify-center bg-white-100 border-2 border-red-800 rounded"/>
                    <input type="password" className="w-14 h-14 text-red-800 text-6xl flex flex-row items-center text-center justify-center bg-white-100 border-2 border-red-800 rounded"/>
                </div>
                <input
                    type="submit"
                    value="Create account"
                    className="input_submit mt-6"
                />
            </form>
            <p className="mt-8 font-sfpro z text-white lg:text-black">Didn’t get the passcode? <span className="text-red-800 font-bold">Resend in 50s</span></p>
        </div>
    )
}
export default VerifyForm