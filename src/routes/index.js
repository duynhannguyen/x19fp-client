import Home from '~/pages/Home';
import Authen from '~/pages/Authen';
import Login from '~/pages/Authen/Login';
import Signup from '~/pages/Authen/Signup';
import Create from '~/pages/Create';
import LogInOut from '~/pages/Authen/LogInOut/LogInOut';

export const PATH = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  CREATE_QUESTION: '/create/question',
  CREATE_TEST: '/create/test',
  CREATE_QUIZ_GAME: '/create/quiz-game'
};

const publicRoutes = [
  { path: '/', component: Home },
  {
    path: '/auth',
    component: LogInOut,
    authRoute: [
      { path: PATH.LOGIN, component: Login },
      { path: PATH.SIGNUP, component: Signup }
    ]
  }
];

const privateRoutes = [
  { path: PATH.CREATE_QUESTION, component: Create },
  { path: PATH.CREATE_TEST, component: Create },
  { path: PATH.CREATE_QUIZ_GAME, component: Create }
];

const privateRoutesMapping = privateRoutes.map(route => ({ ...route, isPrivated: true }));

const routes = [...publicRoutes, ...privateRoutesMapping];
export default routes;
