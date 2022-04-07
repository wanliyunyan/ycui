// setup props
export interface IPropsData {
  [key: string]: unknown;
}

// setup context
export interface ISetupContext {
  attrs: Data;
  slots: Slots;
  emit: (event: string, ...args: unknown[]) => void;
}

export interface IMenuClick {
  item: {
    danger: boolean;
    disabled: boolean;
    icon: undefined | string; // todo 不知道是什么
    id: undefined | string; // todo 不知道是什么
    role: undefined | string; // todo 不知道是什么
    title: undefined | string; // todo 不知道是什么
  };
  key: string;
  keyPath: string;
}
