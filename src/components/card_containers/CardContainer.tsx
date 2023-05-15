import { useEffect, useRef, useState } from "react";
import style from "./CardContainer.module.scss";
const Card = ({ onClick, mousedown, mouseup, children }: any) => (
  <div
    onTouchStart={mousedown ? mousedown : null}
    onTouchEnd={mouseup ? mouseup : null}
    onClick={onClick}
    className={style.card}
    onMouseDown={mousedown ? mousedown : null}
    onMouseUp={mouseup ? mouseup : null}
  >
    {children}
  </div>
);
const pos: any = {
  right: `	translate3d( 100vw, 0px,0px)`,
  left: `	translate3d( -100vw, 0px,0px)`,
};
function CardContainer({ children, limit }: any) {
  if (!Array.isArray(children)) {
    return children;
  }
  const childLength = children.length;

  const reflist = useRef(
    "a"
      .repeat(childLength)
      .split("")
      .map((_, idx) => idx)
  );

  let px = 0;
  let py = 0;
  const [state, setState] = useState(0);
  const ref = useRef<any>();
  const styleGen = (idx: number) => `
			translate3d(${idx * 30 * 1.25}px, ${idx * 25 * 1.25}px, ${
    idx * -50
  }px)  rotateZ(${idx * 5}deg)`;

  const mutateList = (idx: number, pos?: string) => {
    const point = reflist.current.indexOf(idx);
    setState(reflist.current[0]);
    reflist.current = [
      ...reflist.current.slice(point + 1),
      ...reflist.current.slice(0, point + 1),
    ];

    setChild(pos);
  };
  const setChild = (direct?: string) => {
    reflist.current.forEach((a, idx) => {
      ref.current.children[a].classList.add(style.notfirst);
      ref.current.children[a].classList.remove(style.firstChild);
      if (idx == 0) {
        ref.current.children[a].classList.remove(style.notfirst);
        ref.current.children[a].classList.add(style.firstChild);
      }
      if (idx < limit) {
        ref.current;
        ref.current.children[a].classList.remove(style.toLast);
        ref.current.children[a].style.zIndex = childLength - idx;
        ref.current.children[a].style.transform = styleGen(idx);
      } else if (idx === reflist.current.length - 1 && direct) {
        ref.current.children[a].style.transform = pos[direct];
      } else {
        if (idx == childLength - 2 && direct) {
          ref.current.children[a].classList.add(style.toLast);
        } else {
          ref.current.children[a].classList.remove(style.toLast);
        }
        ref.current.children[a].style.zIndex = childLength - limit;
        ref.current.children[a].style.transform = `translate3d(${100}vw, ${
          limit * 40 * 1.25
        }px, ${0}px)`;
        // }px, ${limit * -50}px)`;
      }
    });
  };
  const moveDiv = useRef((e: any) => {
    const element = ref.current.children[reflist.current[0]];
    const posX = e.clientX - px;
    const posY = e.clientY - py;
    const first = element;
    first.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotateZ(${15}deg)`;
    e.stopPropagation();
  });
  const onDragStartHandler = (clickedPos: any) => {
    px = clickedPos.clientX;
    py = clickedPos.clientY;
    window.addEventListener("mousemove", moveDiv.current);
    window.addEventListener("touchmove", moveDiv.current);
    clickedPos.stopPropagation();
  };

  const onDragEndHandler = (e: any) => {
    window.removeEventListener("mousemove", moveDiv.current);
    window.removeEventListener("touchmove", moveDiv.current);
    const first = ref.current.children[reflist.current[0]];
    e.stopPropagation();
    if (e.clientX >= (window.innerWidth / 3) * 2) {
      mutateList(reflist.current[0], "right");
    } else if (e.clientX <= window.innerWidth / 3) {
      mutateList(reflist.current[0], "left");
    } else {
      first.style.transform = `translate3d(${0}px, ${0}px, 0)`;
    }
  };
  const onClickHandler = (idx: any, state: number) => {
    console.log("mouse click");
    console.log(state, "top idx");
    if (state != idx) {
      console.log("ooasasa", idx);
      mutateList(idx - 1);
    }
    setState(reflist.current[0]);
  };
  const handlers = {
    mousedown: onDragStartHandler,
    mouseup: onDragEndHandler,
  };
  useEffect(() => {
    setChild();
  }, []);
  return (
    <div ref={ref} className={style.container}>
      {children.map((a, idx) => (
        <Card onClick={() => onClickHandler(idx, state)} {...handlers}>
          {a}
        </Card>
      ))}
    </div>
  );
}

export default CardContainer;
