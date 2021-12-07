import Header from './Header';

const Page = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
  </>
);

export default Page;
