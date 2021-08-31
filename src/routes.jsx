import Loadable from 'react-loadable'
import Loading from 'components/LoadingIndicator'

export const Home = Loadable({
  loader: () => import('routes/Home'),
  loading: Loading,
  delay: 500,
})

export const About = Loadable({
  loader: () => import('routes/About'),
  loading: Loading,
  delay: 500,
})

export const Affiliates = Loadable({
  loader: () => import('routes/Affiliates'),
  loading: Loading,
  delay: 500,
})

export const Blog = Loadable({
  loader: () => import('routes/Blog'),
  loading: Loading,
  delay: 500,
})

export const Browse = Loadable({
  loader: () => import('routes/Browse'),
  loading: Loading,
  delay: 500,
})

export const Builder = Loadable({
  loader: () => import('routes/Builder'),
  loading: Loading,
  delay: 500,
})

export const Cookies = Loadable({
  loader: () => import('routes/Cookies'),
  loading: Loading,
  delay: 500,
})

export const Contact = Loadable({
  loader: () => import('routes/Contact'),
  loading: Loading,
  delay: 500,
})

export const Disclosures = Loadable({
  loader: () => import('routes/Disclosures'),
  loading: Loading,
  delay: 500,
})

export const EmailVerify = Loadable({
  loader: () => import('routes/EmailVerify'),
  loading: Loading,
  delay: 500,
})

export const Error404Page = Loadable({
  loader: () => import('routes/Error404Page'),
  loading: Loading,
  delay: 500,
})

export const Guide = Loadable({
  loader: () => import('routes/Guide'),
  loading: Loading,
  delay: 500,
})

export const HowItWorks = Loadable({
  loader: () => import('routes/HowItWorks'),
  loading: Loading,
  delay: 500,
})

export const Iframe = Loadable({
  loader: () => import('routes/Iframe'),
  loading: Loading,
  delay: 500,
})

export const Login = Loadable({
  loader: () => import('routes/Login'),
  loading: Loading,
  delay: 500,
})

export const Privacy = Loadable({
  loader: () => import('routes/Privacy'),
  loading: Loading,
  delay: 500,
})

export const Profile = Loadable({
  loader: () => import('routes/Profile'),
  loading: Loading,
  delay: 500,
})

export const ResetPassword = Loadable({
  loader: () => import('routes/ResetPassword'),
  loading: Loading,
  delay: 500,
})

export const Search = Loadable({
  loader: () => import('routes/Search'),
  loading: Loading,
  delay: 500,
})

export const SignUp = Loadable({
  loader: () => import('routes/SignUp'),
  loading: Loading,
  delay: 500,
})

export const Support = Loadable({
  loader: () => import('routes/Support'),
  loading: Loading,
  delay: 500,
})

export const Slots = Loadable({
  loader: () => import('routes/Slots'),
  loading: Loading,
  delay: 500,
})

export const Terms = Loadable({
  loader: () => import('routes/Terms'),
  loading: Loading,
  delay: 500,
})

export const UpdatePassword = Loadable({
  loader: () => import('routes/UpdatePassword'),
  loading: Loading,
  delay: 500,
})

export const Viewer = Loadable({
  loader: () => import('routes/Viewer'),
  loading: Loading,
  delay: 500,
})

export const footerLayoutRoutes = {
  Home,
  About,
  Affiliates,
  Blog,
  Browse,
  Cookies,
  Contact,
  Disclosures,
  EmailVerify,
  Error404Page,
  Guide,
  HowItWorks,
  Iframe,
  Login,
  Privacy,
  Profile,
  ResetPassword,
  Search,
  SignUp,
  Support,
  Slots,
  Terms,
  UpdatePassword,
  Viewer,
}
