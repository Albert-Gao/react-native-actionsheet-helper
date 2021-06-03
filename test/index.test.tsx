import { createActionSheetOptions } from '../src';

const title = 'test';
const description = 'test description';

describe('createActionSheetOptions', () => {
  it('should return proper value', () => {
    const edit = () => {};
    const remove = () => {};

    const options = createActionSheetOptions({
      title,
      description,
      buttons: {
        edit,
        remove,
      },
      cancelButton: true,
    });

    expect(Array.isArray(options)).toBe(true);
    expect(options[0]).toEqual({
      title,
      message: description,
      cancelButtonIndex: 2,
      options: ['edit', 'remove', 'Cancel'],
    });
    expect(typeof options[1]).toBe('function');
  });

  it('should attach proper callback', () => {
    const edit = jest.fn();
    const remove = jest.fn();

    const options = createActionSheetOptions({
      title,
      description,
      buttons: {
        edit,
        remove,
      },
      cancelButton: true,
    });

    // options: ['edit', 'remove', 'Cancel']
    expect(edit).toBeCalledTimes(0);
    options[1](0);
    expect(edit).toBeCalledTimes(1);

    expect(remove).toBeCalledTimes(0);
    options[1](1);
    expect(remove).toBeCalledTimes(1);

    // can invoke default cancel without error thrown
    options[1](2);
  });

  it('should not render cancel button if cancelButton === false', () => {
    const edit = () => {};
    const remove = () => {};

    const buttons = { edit, remove };

    const options = createActionSheetOptions({
      title,
      description,
      buttons,
      cancelButton: false,
    });

    expect(options[0].options).toHaveLength(2);
    expect(options[0].options).toEqual(Object.keys(buttons));
  });

  it('should handle the case where cancelButton is an object', () => {
    const edit = () => {};
    const cancel = jest.fn();

    const buttons = { edit };

    const options = createActionSheetOptions({
      title,
      description,
      buttons,
      cancelButton: {
        text: 'Stop',
        callback: cancel,
      },
    });

    expect(options[0].options).toHaveLength(2);
    expect(options[0].options).toEqual(['edit', 'Stop']);

    expect(cancel).toBeCalledTimes(0);
    options[1](1);
    expect(cancel).toBeCalledTimes(1);
  });
});
