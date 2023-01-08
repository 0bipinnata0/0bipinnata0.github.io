import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import BScroll, { Options } from "better-scroll";
import styled from "styled-components";
import LoadingV2 from "../loading-v2";
import Loading from "../loading";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div<{
  show?: boolean;
}>`
  display: ${(props) => (props.show ? undefined : "none")};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

const PullDownLoading = styled.div<{
  show?: boolean;
}>`
  display: ${(props) => (props.show ? "initial" : "none")};
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

export type ScrollElement = {
  refresh(): void;
  getBScroll(): BScroll<Options> | undefined;
};

const Scroll = forwardRef<
  ScrollElement,
  Partial<{
    className: string;
    direction: "vertical" | "horizontal";
    click: boolean;
    refresh: boolean;
    onScroll: (pos: { y: number }) => void;
    pullUp: () => void;
    pullDown: () => void;
    pullUpLoading: boolean;
    pullDownLoading: boolean;
    bounceTop: boolean; // 是否支持向上吸顶
    bounceBottom: boolean; // 是否支持向上吸顶
    children: React.ReactNode;
  }>
>((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    className,
    direction = "vertical",
    click = true,
    refresh = true,
    bounceTop = true,
    bounceBottom = true,
  } = props;

  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current!, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (position: { y: number }) => {
      onScroll(position);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", ({ y }: { y: number }) => {
      // 判断用户的下拉动作
      if (y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));
  const { pullUpLoading, pullDownLoading } = props;
  return (
    <ScrollContainer className={className} ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading show={pullUpLoading}>
        <Loading />
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading show={pullDownLoading}>
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  );
});

export default Scroll;
