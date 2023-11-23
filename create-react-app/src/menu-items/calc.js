// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const calc = {
  id: 'calc',
  type: 'group',
  children: [
    {
      id: 'calc-page',
      title: 'Carbon Calc',
      type: 'item',
      url: '/dashboard/Default/calc-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }
  ]
};

export default calc;
