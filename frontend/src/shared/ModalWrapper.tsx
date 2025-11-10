import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface PhotoModalScheme {
  height?: string;
  width?: string;
  children: React.ReactNode;
}

export type modalRefScheme = {
  openModal: () => void;
  closeModal: () => void;
};

export const Modal = forwardRef<modalRefScheme, PhotoModalScheme>(
  ({ height, width, children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => {
        dialogRef.current?.showModal();
        setIsOpen(true);
      },
      closeModal: () => {
        dialogRef.current?.close();
        setIsOpen(false);
      },
    }));

    const style = {
      width: width,
      height: height,
    };

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    return createPortal(
      <dialog
        style={style}
        className="[&::backdrop]:bg-black/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [&:not([open])]:hidden rounded-[10px] p-0 inset-0 no-scrollbar bg-black/60 border-0"
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
      >
        <main
          className={`min-h-full w-full flex flex-col gap-[30px] transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "-translate-x-50"
          }`}
        >
          {children}
        </main>
      </dialog>,
      document.getElementById("modal")!
    );
  }
);
