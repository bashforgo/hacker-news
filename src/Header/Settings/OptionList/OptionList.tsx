import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Radio,
} from '@material-ui/core'
import React, { ReactElement, ReactNode } from 'react'

export function OptionList<Key extends string | number = string>(
  title: string,
  optionTranslations: { [k in Key]: string },
  onSelected: (option: Key) => () => void,
  isSelected: (option: Key) => boolean,
): ReactElement<{}> {
  const options: Key[] = Object.keys(optionTranslations) as Key[]

  return (
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      {options.map(
        (option: Key): ReactNode => (
          <ListItem key={option} button onClick={onSelected(option)}>
            <Radio checked={isSelected(option)} tabIndex={-1} disableRipple />
            <ListItemText>{optionTranslations[option]}</ListItemText>
          </ListItem>
        ),
      )}
    </List>
  )
}
