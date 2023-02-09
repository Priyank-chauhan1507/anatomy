import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import useTranslations from "../../hooks/useTranslations";
import { translateTags } from "../../utils/translationHelpers";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TagSelector({ tags, onChangeTags, showOnlyEmoji }) {
  const { tags: t, tagsArray, uiData, language } = useTranslations();

  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel>
        {uiData?.label_FNB_Tags?.emoji_code} {uiData?.label_FNB_Tags?.tr_text} (
        {tags.length})
      </InputLabel>
      <Select
        multiple
        value={tags}
        onChange={(e, i) => {
          onChangeTags(e.target.value);
        }}
        input={<Input />}
        renderValue={(v) => {
          return v
            .map((tagId) =>
              translateTags(tagId, { tags: t, language }, showOnlyEmoji)
            )
            .join(", ");
        }}
        MenuProps={MenuProps}>
        {tagsArray.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            <Checkbox color='primary' checked={tags.indexOf(tag.id) > -1} />
            <ListItemText
              primary={translateTags(tag.id, { tags: t, language })}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
