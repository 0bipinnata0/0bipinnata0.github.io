import { useRef, Suspense } from "react";
function preFetchImg(src: string) {
  return new Promise<string>((resolve) => {
    const img = new Image();
    img.onload = function () {
      resolve(src);
    };
    img.src = src;
  });
}
type IProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const LazyImage: React.FC<
  IProps & {
    fallback?: React.ReactNode;
  }
> = ({ fallback, ...props }) => {
  const load = useRef(false);

  const Image: React.FC<IProps> = ({ src = "", alt, ...ext }) => {
    const wrapPromise = (promise: Promise<string>) => {
      let status = "pending";
      let result = "";
      const suspender = promise.then(
        (r) => {
          status = "success";
          result = r;
          load.current = true; // 这个再更上层。
        },
        (e) => {
          status = "error";
          result = e;
        }
      );
      return {
        read() {
          if (status === "pending") {
            throw suspender;
          } else if (status === "error") {
            throw result;
          } else if (status === "success") {
            return result;
          }
        },
      };
    };
    if (!load.current) {
      wrapPromise(preFetchImg(src)).read();
    }
    return <img src={src} alt={alt} {...ext} />;
  };

  return (
    <div>
      <Suspense fallback={fallback ?? <div className="loading">loading</div>}>
        <Image {...props} />
      </Suspense>
    </div>
  );
};

export default LazyImage;
