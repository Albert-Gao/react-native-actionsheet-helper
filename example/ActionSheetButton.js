// check https://github.com/expo/react-native-action-sheet for universal ActionSheet for Android/iOS/Web
import { Button, ActionSheetIOS } from 'react-native';
import { createActionSheetOptions } from 'react-native-actionsheet-helper';

export function ActionSheetButton() {
  const params = createActionSheetOptions({
    title: 'Action Sheet',
    description: 'easy to use',
    buttons: {
      Button1: () => {
        console.log('button 1 clicked');
      },
      Button2: () => {
        console.log('button 2 clicked');
      },
    },
    cancelButton: true,
    destructiveButtonLabel: 'Button2',
  });

  return (
    <Button
      title="Open ActionSheet"
      onPress={() => {
        ActionSheetIOS.showActionSheetWithOptions(...params);
      }}
    />
  );
}
