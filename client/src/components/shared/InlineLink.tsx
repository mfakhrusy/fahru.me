import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { InteractivityProps } from "@chakra-ui/styled-system";
import { HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

type Props = {
  href: string;
  target?: HTMLAttributeAnchorTarget;
  outline?: InteractivityProps["outline"];
  isExternal?: boolean;
};

export function InlineLink({
  href,
  children,
  target = "_blank",
  outline,
  isExternal = true,
}: PropsWithChildren<Props>) {
  return (
    <Link
      href={href}
      color="#0000EE"
      _visited={{ color: "#551A8B" }}
      target={target}
      outline={outline}
    >
      {children} {isExternal ? <ExternalLinkIcon /> : null}{" "}
    </Link>
  );
}
