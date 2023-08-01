import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Content, Overlay, Portal, Root } from "@radix-ui/react-alert-dialog";
import { container, content, noOutline, overlay } from "./styles.css";
import { Box } from "../box";
import { Text } from "../typography";
import { SearchIcon, XIcon } from "../icons";
import { Divider } from "../divider";
import { useSavedRef } from "../../../hooks";
import { useRootElement } from "../../../hooks/use-root-element";
import { ListItem } from "../list/list-item";

export type SelectModalProps = PropsWithChildren<{
  title?: string;
  inputPlaceholder?: string;
  onSearch?: (value: string) => void;
  trigger: ReactNode;
  onClose?: () => void;
}>;

export const SelectModalContext = createContext<
  { closeModal: () => void } | undefined
>(undefined);

const useSelectModalContext = () => {
  const value = useContext(SelectModalContext);

  if (!value) {
    throw new Error("SelectModalContext is not provided");
  }

  return value;
};

export const SelectModal = ({
  children,
  trigger,
  title,
  onSearch,
  inputPlaceholder,
  onClose,
}: SelectModalProps) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ closeModal: () => setOpen(false) }),
    [setOpen]
  );

  const onCloseRef = useSavedRef(onClose);

  useEffect(() => {
    if (!open) {
      onCloseRef.current?.();
    }
  }, [onCloseRef, open]);

  const rootElement = useRootElement();

  return (
    <SelectModalContext.Provider value={value}>
      <Root open={open} onOpenChange={setOpen}>
        {trigger}

        <Portal container={rootElement}>
          <Box className={container}>
            <Overlay onClick={() => setOpen(false)} className={overlay} />

            <Content data-testid="select-modal__container" className={content}>
              <Box display="flex" flexDirection="column" height="full">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px="4"
                >
                  <Box flex={1}>
                    {title && (
                      <Text
                        data-testid="select-modal__title"
                        variant={{ weight: "bold" }}
                      >
                        {title}
                      </Text>
                    )}
                  </Box>
                  <Box as="button" onClick={() => setOpen(false)}>
                    <XIcon />
                  </Box>
                </Box>

                {onSearch && (
                  <Box
                    display="flex"
                    mx="4"
                    my="2"
                    background="backgroundMuted"
                    borderRadius="xl"
                    alignItems="center"
                    as="label"
                  >
                    <Box mx="3" display="flex" alignItems="center">
                      <SearchIcon />
                    </Box>
                    <Box
                      data-testid="select-modal__search-input"
                      className={noOutline}
                      as="input"
                      border="none"
                      flex={1}
                      py="3"
                      borderRadius="xl"
                      color="text"
                      background="backgroundMuted"
                      placeholder={inputPlaceholder ?? ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onSearch(e.target.value)
                      }
                    />
                  </Box>
                )}

                <Box marginTop="2">
                  <Divider />
                </Box>

                {children}
              </Box>
            </Content>
          </Box>
        </Portal>
      </Root>
    </SelectModalContext.Provider>
  );
};

export const SelectModalItemContainer = ({ children }: PropsWithChildren) => (
  <Box mx="4">{children}</Box>
);

export const SelectModalItem = ({
  children,
  onItemClick,
  testId,
}: PropsWithChildren<{ onItemClick: () => void; testId?: string }>) => {
  const { closeModal } = useSelectModalContext();

  const onClick = () => {
    closeModal();
    onItemClick();
  };

  return <ListItem onClick={onClick}>{children}</ListItem>;
};
