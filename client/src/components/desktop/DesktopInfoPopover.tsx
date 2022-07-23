import { IconButton } from "@chakra-ui/button";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";

export function DesktopInfoPopover() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton aria-label="button">
          <InfoOutlineIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody fontSize="11px">
          double click or single click followed by pressing enter/return in
          keyboard to open desktop apps
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
