import { useSelector } from "react-redux";
import MypageComponent from "../../components/mypage/MypageComponent";

const MypageContainer = () => {
  const { manager } = useSelector(({ auth }) => ({
    manager: auth.auth.manager,
  }));

  return <MypageComponent />;
};

export default MypageContainer;
