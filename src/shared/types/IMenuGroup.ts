// TODO Надо решить вопрос с слайсами
import { Roles } from 'entities/User';

export interface IMenuItem {
  label: string;
  link: string;
  roles?: Roles[];
}

export interface IMenuGroup {
  label: string;
  childrens: IMenuItem[];
  roles?: Roles[];
}
