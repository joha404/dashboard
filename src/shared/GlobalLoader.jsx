import {RotatingLines} from "react-loader-spinner";


const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
            <RotatingLines
                visible={true}
                height="50"
                width="50"
                color="#13A89F"
                strokeWidth="5"
                strokeColor="#13A89F"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default GlobalLoader;