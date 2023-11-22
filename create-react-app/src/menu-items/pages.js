// assets
import { IconKey } from '@tabler/icons';
 
// constant
const icons = {
  IconKey
};
 
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
 
const pages = {
  id: 'pages',
  title: 'Pages',
  //caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentications',
      type: 'collapse',
      icon: icons.IconKey,
 
      children: [
        {
          id: 'login3',
          title: 'Logout',
          type: 'item',
          url: '/',
          // set target to false or remove it
          target: false
        },
       
      ]
    }
  ]
};
 
export default pages;
 