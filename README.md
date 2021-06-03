# React Native ActionSheet Helper

Calling the official React Native ActionSheetIOS or universal ActionSheet [@expo/@expo/react-native-action-sheet](https://github.com/expo/react-native-action-sheet) with simple signature.

**Typescript Enabled!**

## Install

`npm i react-native-actionsheet-helper --save`

or

`yarn add react-native-actionsheet-helper`

## Usage

Create your options like:

```javascript
import { createActionSheetOptions } from 'react-native-actionsheet-helper';

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
```

Use it like:

```javascript
ActionSheetIOS.showActionSheetWithOptions(...params);
```

`Button1` and `Button2` will be rendered as label for that button on ActionSheet.

## For handling CancelButton

- Default cancelButton: `cancelButton: true,` text with `Cancel` and close the action sheet
- Do not want cancelButton: `cancelButton: false,`
- Want default cancelButton with different label: `cancelButton: 'Close'`
- Want to customize cancelButton: `cancelButton: {text: 'Close', callback: ()=>{}}`
