import { Loading } from "../loading";

export default function ImageUpload({
  name,
  className = "",
  progress = 0,
  image = "",
  handleDeleteImage = () => {},
  ...rest
}) {
  return (
    <div className="w-full">
      <label
        className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
      >
        <input
          type="file"
          className="hidden "
          onChange={() => {}}
          name={name}
          {...rest}
        />
        <div className=" relative h-[200px] w-full bg-[#E7ECF3] rounded-[10px]">
          <>
            {progress !== 0 &&
              !image(
                <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                  <Loading size="30px"></Loading>
                </div>
              )}
            {!image && progress === 0 ? (
              <img
                srcSet="https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
                alt="monkey"
                className="absolute top-[50%] left-[50%] w-[200px] translate-y-[-50%] translate-x-[-50%]"
              />
            ) : (
              <>
                <img
                  srcSet={image}
                  alt="monkey"
                  className="absolute top-0 left-0 object-cover w-full h-full"
                />
                <button
                  type="button"
                  className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all translate-y-full bg-white rounded-full opacity-0 cursor-pointer left-2/4 t-2/4 -translate-x-2/4 group-hover:opacity-100 group-hover:visible"
                  onClick={handleDeleteImage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </>
            )}
          </>
          {!image && (
            <div
              className="absolute bottom-0 left-0 w-0 h-1 transition-all bg-green-400 image-upload-progress"
              style={{ width: `${Math.ceil(progress)}%` }}
            ></div>
          )}
        </div>
      </label>
    </div>
  );
}
