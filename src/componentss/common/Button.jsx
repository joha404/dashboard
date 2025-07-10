import { RotatingLines } from "react-loader-spinner";

const Button = ({ children, onClick, type = "button", loading = false, disabled = false }) => {
    const baseClasses = "inline-flex text-white w-full items-center bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary justify-center font-[600] text-base rounded-md focus:outline-none transition-all ease-out duration-300 group";
    const sizeClasses = "px-8 py-2 text-lg";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const loadingClasses = loading ? "cursor-not-allowed" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${sizeClasses} ${loadingClasses} ${disabledClasses}`}
            disabled={disabled || loading}
        >
            {loading ? (
                <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    color="white"
                    strokeWidth="5"
                    strokeColor="#fff"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            ) : (
                <p className={"group-hover:scale-105 transform transition-transform duration-300"}>{children}</p>
            )}
        </button>
    );
};

export default Button;
