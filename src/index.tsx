import { ActionSheetIOSOptions } from 'react-native';

export function createActionSheetOptions<
  Buttons extends Record<string, () => void>
>({
  title,
  description,
  buttons,
  cancelButton,
  destructiveButtonLabel,
}: {
  title: string;
  description?: string;
  buttons: Buttons;
  destructiveButtonLabel?: keyof Buttons;
  cancelButton: boolean | string | { text: string; callback: () => void };
}): [ActionSheetIOSOptions, (buttonIndex: number) => void] {
  let options = [];
  let buttonCallbackMappingToIndex: Array<() => void> = [];

  Object.entries(buttons).forEach(([key, value]) => {
    options.push(key);
    buttonCallbackMappingToIndex.push(value);
  });

  if (cancelButton === true) {
    options.push('Cancel');
  } else if (typeof cancelButton === 'string') {
    options.push(cancelButton);
  } else if (typeof cancelButton === 'object') {
    options.push(cancelButton.text);
  }

  const cancelButtonIndex = options.length - 1;

  const actionSheetOptions: ActionSheetIOSOptions = {
    title,
    message: description,
    options,
    cancelButtonIndex,
  };

  if (destructiveButtonLabel) {
    actionSheetOptions.destructiveButtonIndex = options.findIndex(
      text => text === destructiveButtonLabel
    );
  }

  return [
    actionSheetOptions,
    buttonIndex => {
      if (buttonIndex === cancelButtonIndex) {
        if (typeof cancelButton === 'object') {
          cancelButton.callback();
        }
      } else {
        buttonCallbackMappingToIndex[buttonIndex]();
      }
    },
  ];
}
