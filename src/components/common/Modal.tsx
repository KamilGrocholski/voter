import { Dialog } from '@headlessui/react';
import React, { ReactNode } from 'react';

export const Modal = ({
  children,
  isOpen,
  title,
  description,
  handleCancel,
}: {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  description: string;
  handleCancel: () => void;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md bg-dark-shade-8 p-8 rounded-xl flex flex-col gap-4">
          <Dialog.Title className="font-bold text-2xl text-center">{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          <div className="flex flex-col gap-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const ModalActions = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className="flex gap-4 justify-end">{children}</div>;
};

type ModalFormProps = {
  children: JSX.Element | JSX.Element[]
  [x: string]: unknown
}
export const ModalForm: React.FC<ModalFormProps> = ({ children, ...rest }) => {
  return (
    <form
      {...rest}
      className="flex flex-col gap-4"
    >
      {children}
    </form>
  );
};